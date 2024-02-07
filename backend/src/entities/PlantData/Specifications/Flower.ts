import { Column } from 'typeorm';
import { FlowerColors, Visibility } from '../../../enum';

export default class Flower {
  @Column({
    type: 'enum',
    enum: Visibility,
    nullable: true,
  })
  visibility: Visibility;

  @Column({
    type: 'enum',
    enum: FlowerColors,
    nullable: true,
  })
  color: FlowerColors;
}
