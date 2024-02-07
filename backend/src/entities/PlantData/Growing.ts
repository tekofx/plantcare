import { Column } from 'typeorm';

export class Growing {
  @Column({ nullable: true })
  light: string;

  @Column({ nullable: true })
  humidity: number;

  @Column({ nullable: true })
  minTemperature: number;

  @Column({ nullable: true })
  maxTemperature: number;
}
