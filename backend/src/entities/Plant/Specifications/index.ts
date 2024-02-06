import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Duration {
  annual = 'Anual',
  biennial = 'Biennial',
  perennial = 'Perennial',
}

@Entity()
export class Specifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  height: number; // cm

  @Column({
    type: 'enum',
    enum: Duration,
    default: Duration.perennial,
  })
  duration: Duration;

  // TODO: Add flower
  // TODO: Add foliage
  // TODO: Add fruits
}
