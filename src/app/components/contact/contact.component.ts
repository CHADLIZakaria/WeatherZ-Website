import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
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
      ])    
    ])
  ] 
})
export class ContactComponent {
  isVisible = false;

  constructor(private el: ElementRef) {
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
}
