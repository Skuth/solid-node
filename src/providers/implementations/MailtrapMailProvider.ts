import { MailProviderInterface, MessageInterface } from "../MailProviderInterface";

import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements MailProviderInterface {
  private transporter: Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "71b2dd4de4bed7",
        pass: "31ba0d03ecd902"
      }
    })
  }

  async sendMail(message: MessageInterface): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }
}