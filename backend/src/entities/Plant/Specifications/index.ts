import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PlantDuration } from '../../../enum';
import Flower from './Flower';

@Entity()
export class Specifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  height: number; // cm

  @Column({
    type: 'enum',
    enum: PlantDuration,
    default: PlantDuration.perennial,
  })
  duration: PlantDuration;

  @Column(() => Flower)
  flower: Flower;

  // TODO: Add foliage
  // TODO: Add fruits
}
