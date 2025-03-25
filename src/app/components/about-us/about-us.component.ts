import { animate, group, query, sequence, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  animations: [
    trigger('about', [
      transition('* <=> *', [
        group([
          query('.title', [
            style({ opacity: 0.3, transform: 'translateY(50%)'}),
            animate('500ms', style({ opacity: 1, transform: 'translateY(0px)' })),
          ]),
          query('#slideInImage', [
            style({ opacity: 0.3, transform: 'translateY(50%)'}),
            animate('500ms', style({ opacity: 1, transform: 'translateY(0px)' })),
          ]),
          query('#fadeInText', [
            style({ opacity: 0, transform: 'translateY(50%)'}),
            animate('1000ms', style({ opacity: 1, transform: 'translateY(0px)' })),
          ]),
        ]),
      ])    
    ])
  ]  
})
export class AboutUsComponent {
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
