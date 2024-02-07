import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { PlantData } from './PlantData';

// This entity represents a plant to be cared for.

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Custom name

  @Column()
  description: string; // Custom description

  @ManyToOne(() => PlantData, (plantData) => plantData.plants)
  plantData: PlantData;
}
