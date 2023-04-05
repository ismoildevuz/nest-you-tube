import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/models/user.model';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User | Admin): Promise<void> {
    let route: string;
    if (user instanceof User) {
      route = 'user';
    } else if (user instanceof Admin) {
      route = 'admin';
    }
    const url = `${process.env.API_HOST}/api/${route}/activate/${user.activation_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to YouTube! Confirm you Email!',
      template: './confirmation',
      context: {
        name: user.fullname,
        url,
      },
    });
  }
}
