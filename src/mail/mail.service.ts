import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/models/user.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: User): Promise<void> {
        const url = `${process.env.API_HOST}/api/user/activate/${user.activation_link}`;
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
