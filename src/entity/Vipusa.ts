import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail } from "class-validator";
import * as bcrypt from "bcryptjs"

@Entity()
//@Unique(['email'])

export class Vipusa {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
    nombreApellido: string;

  @Column()
    n_licencia: string;

  @Column()
  @IsNotEmpty()
    empresa: string;

  @Column()
    cargo: string;

  @Column()
    observacion: string;

  @Column()
  @CreateDateColumn()
    createAt: Date;

  @Column()
  @UpdateDateColumn()
    updateAt: Date;

  @Column()
    isActive: boolean;

}