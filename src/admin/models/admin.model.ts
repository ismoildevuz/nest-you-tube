import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Otp } from '../../otp/models/otp.model';

interface AdminAttrs {
  id: string;
  fullname: string;
  phone_number: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string;
  is_active: boolean;
  is_creator: boolean;
  activation_link: string;
  otp_id: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  fullname: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ForeignKey(() => Otp)
  @Column({
    type: DataType.STRING,
  })
  otp_id: string;

  @BelongsTo(() => Otp)
  otp: Otp;
}
