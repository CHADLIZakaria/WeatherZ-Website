import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  imports: [],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.css',
  animations: [    
    trigger('fadeInSection', [
      state('hidden', style({ opacity: 0, transform: 'translateY(150px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden <=> visible', animate('250ms ease-out')),
    ]),
  ]
})
export class ScrollTopComponent {
  showButton = false

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.showButton = true;
    } 
    else if (this.showButton && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.showButton = false;
    }
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

}
