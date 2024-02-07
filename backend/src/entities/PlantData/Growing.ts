import { Column } from 'typeorm';

export class Growing {
  @Column()
  light: string;

  @Column()
  humidity: number;

  @Column()
  minTemperature: number;

  @Column()
  maxTemperature: number;
}
