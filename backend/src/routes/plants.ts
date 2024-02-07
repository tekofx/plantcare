import express from 'express';
import auth from '../middleware/auth';
import { PlantDataRepo, PlantRepo } from '../typeorm.config';

const router = express.Router();
router.get('/', auth, async (req, res) => {
  const queryBuilder = PlantRepo.createQueryBuilder('plant').leftJoinAndSelect(
    'plant.plantData',
    'plantData'
  );
  await queryBuilder
    .getMany()
    .then((plants) => res.send(plants))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
});

router.post('/', auth, async (req, res) => {
  const { name, description, plantData } = req.body;

  let aux = plantData;

  if (aux) {
    aux = await PlantDataRepo.findOne({
      where: { id: plantData.id },
    });
  }

  const newPlant = PlantRepo.create({
    name,
    description,
    plantData: aux || undefined,
  });

  await PlantRepo.save(newPlant)
    .then(() => res.send('Plant created'))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });

  return null;
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const queryBuilder = PlantRepo.createQueryBuilder('plant')
    .where('plant.id = :id', { id: Number(id) })
    .leftJoinAndSelect('plant.plantData', 'plantData');

  queryBuilder
    .getOne()
    .then((plant) => {
      if (plant) {
        return res.send(plant);
      }
      return res.status(404).send('Plant not found');
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name, description, plantData } = req.body;

  let aux = plantData;

  if (aux) {
    aux = await PlantDataRepo.findOne({
      where: { id: plantData.id },
    });
  }

  await PlantRepo.update(
    { id: Number(id) },
    {
      name,
      description,
      plantData: aux || undefined,
    }
  )
    .then((result) => {
      if (result.affected) {
        return res.send('Plant updated');
      }
      return res.status(404).send('Plant not found');
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
});

export default router;
