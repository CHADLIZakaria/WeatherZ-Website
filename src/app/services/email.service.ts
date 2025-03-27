import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceID = 'service_nbugpe5';
  private templateID = 'template_dj1qk3z';
  private publicKey = 'LZ6i28GiJG0C4_ro-';
  
  constructor() { }

  sendEmail(mail: {
    name: string, 
    email: string, 
    subject: string, 
    message: string
  }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, mail, this.publicKey)
  }
}
