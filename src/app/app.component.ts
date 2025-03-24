import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FeaturesComponent } from "./components/features/features.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ScrollTopComponent } from "./components/scroll-top/scroll-top.component";

@Component({
  selector: 'app-root',
  imports: [ScrollTopComponent, NavbarComponent, AboutUsComponent, ContactComponent, FeaturesComponent, HomeComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
   
    trigger('fadeInSection', [
      state('hidden', style({ opacity: 0, transform: 'translateY(150px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('1s ease-out')),
    ]),
    trigger('fadeInImage', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('1.2s ease-out')),
    ]),
    trigger('fadeInText', [
      state('hidden', style({ opacity: 0, transform: 'translateX(50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('1.5s ease-out')),
    ]),
    
  ]
})
export class AppComponent {
  title = 'WeatherZ'; 

  
}

