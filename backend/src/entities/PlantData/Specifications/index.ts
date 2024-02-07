import { Column } from 'typeorm';
import { PlantDuration } from '../../../enum';
import Flower from './Flower';

export class Specifications {
  @Column({ nullable: true })
  height: number; // cm

  @Column({
    type: 'enum',
    enum: PlantDuration,
    nullable: true,
  })
  duration: PlantDuration;

  @Column(() => Flower)
  flower: Flower;
}
