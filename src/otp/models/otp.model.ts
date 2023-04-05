import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Admin } from '../../admin/models/admin.model';

interface OtpAttrs {
  id: string;
  otp: string;
  expiration_time: Date;
  verified: boolean;
}

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, OtpAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  otp: string;

  @Column({
    type: DataType.DATE,
  })
  expiration_time: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified: boolean;

  @HasMany(() => Admin)
  admin: Admin;
}
