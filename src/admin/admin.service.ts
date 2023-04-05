import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4, v4 } from 'uuid';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { OtpService } from '../otp/otp.service';
import { PhoneAdminDto } from './dto/phone-admin.dto';
import { VerifyOtpDto } from '../otp/dto/verify-otp.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const email = await this.getAdminByEmail(createAdminDto.email);
    const phoneNumber = await this.getAdminByPhoneNumber(
      createAdminDto.phone_number,
    );
    if (email) {
      throw new BadRequestException('Email already registered!');
    }
    if (phoneNumber) {
      throw new BadRequestException('Phone Number already registered!');
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepository.create({
      id: uuidv4(),
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedAdmin = await this.adminRepository.update(
      {
        hashed_refresh_token,
        activation_link: uniqueKey,
      },
      {
        where: { id: newAdmin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await this.mailService.sendUserConfirmation(updatedAdmin[1][0]);
    const response = {
      message: 'Admin registered',
      admin: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.getAdminByEmail(email);
    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registered(pass)');
    }
    if (!admin.is_active) {
      throw new UnauthorizedException('Admin not activated');
    }
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminRepository.update(
      {
        hashed_refresh_token,
      },
      {
        where: { id: admin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin logged in',
      admin: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('Admin not found');
    }
    const updateAdmin = await this.adminRepository.update(
      { hashed_refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin: updateAdmin[1][0],
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is expired');
    }
    const updatedAdmin = await this.adminRepository.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updatedAdmin[1][0]) {
      throw new BadRequestException('Admin already activated');
    }
    const response = {
      message: 'Admin activated successfully',
      admin: updatedAdmin[1][0],
    };
    return response;
  }

  async newOtp(phoneAdminDto: PhoneAdminDto) {
    const admin = await this.getAdminByPhoneNumber(phoneAdminDto.phone_number);
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    if (!admin.is_active) {
      throw new BadRequestException('Admin not activated');
    }
    const { id, phone_number, otp_id } = admin;
    const otpResponse = await this.otpService.newOtp(id, phone_number, otp_id);
    return otpResponse;
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const otpResponse = await this.otpService.verifyOtp(verifyOtpDto);
    return otpResponse;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getAdminByEmail(email: string) {
    const admin = await this.adminRepository.findOne({
      where: { email },
    });
    return admin;
  }

  async getAdminByPhoneNumber(phone_number: string) {
    const admin = await this.adminRepository.findOne({
      where: { phone_number },
    });
    return admin;
  }

  async findAll() {
    return this.adminRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const admin = await this.adminRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    const phoneNumber = await this.getAdminByPhoneNumber(
      updateAdminDto.phone_number,
    );
    if (phoneNumber) {
      if (phoneNumber.id != admin.id) {
        throw new BadRequestException(
          'Phone Number already registered by someone!',
        );
      }
    }
    const updatedAdmin = await this.adminRepository.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const admin = await this.findOne(id);
    const deletedAdmin = await this.adminRepository.destroy({
      where: { id },
    });
    return { message: 'Admin deleted' };
  }
}
