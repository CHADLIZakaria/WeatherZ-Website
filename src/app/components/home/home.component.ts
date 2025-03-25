import { animate, style, transition, trigger } from '@angular/animations';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('home', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0%)' })),
      ]),
    ]),
    trigger('translateFromLeftAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideAnimation', [
      transition(':increment', [
        style({ opacity: 0, transform: 'scale(0.5) translateX(-50%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1) translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'scale(0.5) translateX(-50%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1) translateX(0)' })),
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  images = [
    'screen1',
    'screen2',   
  ]
  currentIndex = 0;
  private intervalId: any;


  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          this.nextSlide();
        });
      }, 5000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    if(this.currentIndex >= this.images.length-1) {
      this.currentIndex = 0
    }
    else {
      this.currentIndex++;
    }
  }
}
