import { animate, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { EmailService } from '../../services/email.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ ReactiveFormsModule, NgClass ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  animations: [
    trigger('contact', [
      transition('* <=> *', [
        group([
          query('.title', [
            style({ opacity: 0.3, transform: 'translateY(50%)'}),
            animate('500ms', style({ opacity: 1, transform: 'translateY(0px)' })),
          ]),
          query('.form', [
            style({ opacity: 0.3, transform: 'translateY(50%)'}),
            animate('500ms', style({ opacity: 1, transform: 'translateY(0px)' })),
          ]),
        ]),
      ]),
    ]),
    trigger('message-animation', [
      state('hidden', style({
        opacity: 0,
        filter: 'blur(3px)',
        transform: 'translateY(-50%)'
      })),
      state('visible', style({
        opacity: 1,  
        filter: 'blur(0px)',      
        transform: 'translateY(0%)'
      })),      
      transition('hidden <=> visible', [
        animate('200ms'),
      ] 
      )
    ])
  ] 
})
export class ContactComponent {
  isVisible = false;
  contactForm: FormGroup<{
    name: FormControl<string | null>,
    email: FormControl<string | null>,
    subject: FormControl<string | null>,
    message: FormControl<string | null>,    
  }>
  isSend: true | false | null = null;
  messageSend: string = '';

  constructor(
    private el: ElementRef, 
    private formBuilder: FormBuilder,
    private emailService: EmailService) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    })
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const element = this.el.nativeElement
    if (element instanceof HTMLElement) {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      this.isVisible = elementPosition < windowHeight * 0.8;
    }
  }

  checkInputError(field: string, typeError: string): boolean {
    return !!(this.contactForm.get(field)?.touched && this.contactForm.get(field)?.hasError(typeError))
  }

  onSubmit() {
    if(this.contactForm.valid) {
      const formData = {
        name: this.contactForm.get('name')?.value || '',
        email: this.contactForm.get('email')?.value || '',
        subject: this.contactForm.get('subject')?.value || '',
        message: this.contactForm.get('message')?.value || ''
      };
      
      this.emailService.sendEmail(formData).then(
        (data) => {
        if(data.status==200) {
          this.isSend = true
          this.messageSend = 'You mail has been send by success'
        } 
        else {
          this.isSend = false
          this.messageSend = 'You mail not send there is error'
        }
        setTimeout(() => {
          this.isSend = null;
          this.messageSend = '';
        }, 5000);
      },
      (error) => {        
        this.messageSend = 'You mail not send there is error'
        this.isSend = false
        setTimeout(() => {
          this.isSend = null;
          this.messageSend = '';
        }, 5000);
      }
    )
      
    }
  }
}
