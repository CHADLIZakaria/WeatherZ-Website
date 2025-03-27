import { Component, OnInit } from '@angular/core';
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
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'WeatherZ';

  scrollTo(section: string) {
    const element = document.getElementById(section)
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if(element) {
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.scrollY;
      const offsetPosition = elementTop - navbar.offsetHeight;    
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  
}

