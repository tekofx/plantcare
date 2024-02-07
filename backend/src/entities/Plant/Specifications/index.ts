import { Column } from 'typeorm';
import { PlantDuration } from '../../../enum';
import Flower from './Flower';

export class Specifications {
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
}
