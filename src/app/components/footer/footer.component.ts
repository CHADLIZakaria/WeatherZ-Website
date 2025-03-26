import { Component, output } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  scrollToSection = output<string>();
  
  scrollTo(section: string) {
    this.scrollToSection.emit(section);
  }
}
