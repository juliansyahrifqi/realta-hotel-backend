import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        secure: false,
        auth: {
          user: 'felton.towne@ethereal.email',
          pass: 'vfjjZtR9JGjJzWGfYz',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
