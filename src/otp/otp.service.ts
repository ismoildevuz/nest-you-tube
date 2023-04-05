import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Otp } from './models/otp.model';
import { AddMinutesToDate } from './../helpers/addMinutes';
import * as otpGenerator from 'otp-generator';
import { BotService } from '../bot/bot.service';
import { BOT_NAME } from '../app.constant';
import { dates, decode, encode } from '../helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../admin/models/admin.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp) private otpRepository: typeof Otp,
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly botService: BotService,
  ) {}

  async newOtp(id: string, phone_number: string, otp_id: string) {
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSend = await this.botService.sendOTP(phone_number, otp);
    if (!isSend) {
      throw new HttpException(
        `Before, register from the Bot below: https://t.me/${BOT_NAME}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    const oldOtp = await this.otpRepository.findOne({ where: { id: otp_id } });
    if (!oldOtp) {
      const newOtp = await this.otpRepository.create({
        id: uuidv4(),
        otp,
        expiration_time,
      });
      otp_id = newOtp.id;
      await this.adminRepository.update(
        {
          otp_id: newOtp.id,
        },
        { where: { id } },
      );
    } else {
      await this.otpRepository.update(
        { otp, expiration_time, verified: false },
        {
          where: { id: otp_id },
        },
      );
    }
    const details = {
      timestamp: now,
      success: true,
      message: 'OTP sent to admin',
      check: phone_number,
      otp_id,
    };
    const encoded = await encode(JSON.stringify(details));
    return { status: 'Success', Details: encoded };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { otp, check, verification_key } = verifyOtpDto;
    const currentDate = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.check;
    if (check_obj != check) {
      throw new BadRequestException('OTP is not sent to this phone');
    }
    const result = await this.otpRepository.findOne({
      where: { id: obj.otp_id },
    });
    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentDate)) {
          if (otp === result.otp) {
            const admin = await this.adminRepository.findOne({
              where: { phone_number: check },
            });
            if (admin) {
              if (admin.is_active) {
                await this.adminRepository.update(
                  { is_creator: true },
                  {
                    where: { id: admin.id, is_creator: false },
                    returning: true,
                  },
                );
                await this.otpRepository.update(
                  { verified: true },
                  { where: { id: obj.otp_id }, returning: true },
                );
                const response = {
                  message: 'Admin verified successfully',
                  success: true,
                };
                return response;
              } else {
                throw new BadRequestException('Admin not activated');
              }
            }
          } else {
            throw new BadRequestException('OTP does not match');
          }
        } else {
          throw new BadRequestException('OTP expired');
        }
      } else {
        throw new BadRequestException('OTP already used');
      }
    } else {
      throw new BadRequestException('Admin not found');
    }
  }

  async findAll() {
    return this.otpRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const Otp = await this.otpRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!Otp) {
      throw new HttpException('Otp not found', HttpStatus.NOT_FOUND);
    }
    return Otp;
  }

  async remove(id: string) {
    const Otp = await this.findOne(id);
    const deletedOtp = await this.otpRepository.destroy({
      where: { id },
    });
    return { message: 'Otp deleted' };
  }
}
