import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Growing } from './Growing';
import { Specifications } from './Specifications';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cientificName: string;

  @OneToOne(() => Growing)
  @JoinColumn()
  growing: Growing;

  @OneToOne(() => Specifications)
  @JoinColumn()
  specifications: Specifications;
}
