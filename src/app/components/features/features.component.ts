import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
  animations: [
    trigger('features', [
      transition('* <=> *', [
        group([
          query('.title', [
            style({ opacity: 0.3, transform: 'translateY(50%)'}),
            animate('500ms', style({ opacity: 1, transform: 'translateY(0px)' })),
          ]),
          query('.feature', [
            style({ opacity: 0, transform: 'translateY(50%)' }),
            stagger('200ms', [
              animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ])
        ]),
      ])    
    ])
  ]
})
export class FeaturesComponent {
  isVisible = false;

  constructor(private el: ElementRef) {
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const element = this.el.nativeElement
    if (element instanceof HTMLElement) {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      this.isVisible = elementPosition < windowHeight * .8
    }
  }

}
