import { Column } from 'typeorm';

export class Growing {
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
