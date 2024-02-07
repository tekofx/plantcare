import { Column } from 'typeorm';

export class Growing {
  @Column()
  light: string;

  @Column()
  atmosphericHumidity: string;

  @Column()
  minTemperature: number;

  @Column()
  maxTemperature: number;
}
