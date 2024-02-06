import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Growing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  light: string;

  @Column()
  atmosphericHumidity: string;

  @Column()
  minPh: number;

  @Column()
  maxPh: number;

  @Column()
  minTemperature: number;

  @Column()
  maxTemperature: number;
}
