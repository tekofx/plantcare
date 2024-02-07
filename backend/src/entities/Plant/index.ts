import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Growing } from './Growing';
import { Specifications } from './Specifications';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commonName: string;

  @Column()
  cientificName: string;

  @Column(() => Growing)
  growing: Growing;

  @Column(() => Specifications)
  specifications: Specifications;
}
