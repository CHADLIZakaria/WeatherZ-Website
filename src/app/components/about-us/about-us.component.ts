import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  animations: [
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-100%)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('0.6s ease-out')),
      transition('visible => hidden', animate('0.3s ease-in')),
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
