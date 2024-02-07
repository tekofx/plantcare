import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlantData } from './PlantData';

// This entity represents a plant to be cared for.

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => PlantData, (plantData) => plantData.plants)
  plantData: PlantData;
}
