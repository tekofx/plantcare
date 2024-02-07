import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Plant } from '@/src/entities/Plant';
import { Growing } from './Growing';
import { Specifications } from './Specifications';

@Entity()
export class PlantData {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Plant, (plant) => plant.plantData)
  plants: Plant[];

  @Column()
  commonName: string;

  @Column()
  cientificName: string;

  @Column(() => Growing)
  growing: Growing;

  @Column(() => Specifications)
  specifications: Specifications;
}
