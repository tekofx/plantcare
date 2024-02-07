import { Column } from 'typeorm';
import { FlowerColors, Visibility } from '../../../enum';

export default class Flower {
  @Column({
    type: 'enum',
    enum: Visibility,
    default: Visibility.unknown,
  })
  visibility: Visibility;

  @Column({
    type: 'enum',
    enum: FlowerColors,
    default: FlowerColors.white,
  })
  color: FlowerColors;
}
