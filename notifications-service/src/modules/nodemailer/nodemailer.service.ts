import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailPayload } from 'src/common/email/interfaces/email-payload.interface';

@Injectable()
export class NodeMailerService {
  private logger: Logger = new Logger('NodeMailerService');
  constructor() {}

  public async sendEmail(email: EmailPayload) {
    const transporter = this.createTransporter();
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email.to,
        subject: email.subject,
        text: email.content,
      });
      this.logger.log(`Email sent to ${email.to} by email sender`);
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw error;
    }
  }

  private createTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
}
