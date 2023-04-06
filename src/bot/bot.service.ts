import { Injectable } from '@nestjs/common';
import { Bot } from './models/bot.model';
import { BOT_NAME } from './../app.constant';
import { Context, Telegraf, Markup } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepository: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async start(ctx: Context) {
    const { id: user_id, username, first_name, last_name } = ctx.from;
    const user = await this.botRepository.findOne({ where: { user_id } });
    if (!user) {
      await this.botRepository.create({
        id: uuidv4(),
        user_id,
        username,
        first_name,
        last_name,
      });
      await ctx.reply(
        `Iltimos, <b>"Telefon raqamni yuborish"</b> tugmasini bosing!`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else if (!user.status) {
      await ctx.reply(
        `Iltimos, <b>"Telefon raqamni yuborish"</b> tugmasini bosing!`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else {
      await this.bot.telegram.sendChatAction(user_id, 'typing');
      await ctx.reply(
        `Bu bot orqali YouTube platformasi bilan muloqot o'rnatiladi`,
        {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        },
      );
    }
  }

  async onContact(ctx: Context) {
    if ('contact' in ctx.message) {
      const user_id = ctx.from.id;
      const user = await this.botRepository.findOne({ where: { user_id } });
      if (!user) {
        await ctx.reply(`Iltimos, <b>"Start"</b> tugmasini bosing!`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        });
      } else if (ctx.message.contact.user_id != user_id) {
        await ctx.reply(`Iltimos, o'z raqamingizni kiriting!`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        });
      } else {
        let phone: string;
        ctx.message.contact.phone_number[0] == '+'
          ? (phone = ctx.message.contact.phone_number)
          : (phone = '+' + ctx.message.contact.phone_number);
        await this.botRepository.update(
          {
            phone_number: phone,
            status: true,
          },
          { where: { user_id } },
        );
        await ctx.reply(`Tabriklayman, ro'yxatdan o'tdingiz!`, {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onStop(ctx: Context) {
    const user_id = ctx.from.id;
    const user = await this.botRepository.findOne({ where: { user_id } });
    if (user.status) {
      await this.botRepository.update(
        {
          phone_number: null,
          status: false,
        },
        { where: { user_id } },
      );
    }
    await ctx.reply(`Botdan chiqib ketdingiz!`, {
      parse_mode: 'HTML',
      ...Markup.keyboard([['/start']])
        .oneTime()
        .resize(),
    });
  }

  async sendOTP(phone_number: string, OTP: string): Promise<boolean> {
    const user = await this.botRepository.findOne({ where: { phone_number } });
    if (!user || !user.status) {
      return false;
    }
    await this.bot.telegram.sendChatAction(user.user_id, 'typing');
    await this.bot.telegram.sendMessage(user.user_id, 'Verify code: ' + OTP);
    return true;
  }
}
