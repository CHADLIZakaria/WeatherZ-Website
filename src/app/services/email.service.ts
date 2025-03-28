import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceID;
  private templateID;
  private publicKey;
  
  constructor() { 
    this.serviceID = process.env['SERVICE_ID']!;
    this.templateID = process.env['TEMPLATE_ID']!;
    this.publicKey = process.env['PUBLIC_KEY']!;
  }

  sendEmail(mail: {
    name: string, 
    email: string, 
    subject: string, 
    message: string
  }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, mail, this.publicKey)
  }
}
