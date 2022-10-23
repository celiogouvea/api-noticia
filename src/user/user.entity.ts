import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  cpf: string;

  @Column({ length: 20 })
  tel: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  status: boolean;

  @Column({ type: "timestamp", default: () => "NOW()" })
  created_at: Timestamp;
}
