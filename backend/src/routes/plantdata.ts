import express from 'express';
import auth from '../middleware/auth';
import { PlantDataRepo } from '../typeorm.config';

const router = express.Router();
router.get('/', auth, async (req, res) => {
  await PlantDataRepo.find()
    .then((plants) => res.send(plants))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
});

router.post('/', auth, async (req, res) => {
  const { commonName, cientificName, growing, specifications } = req.body;

  const newPlant = PlantDataRepo.create({
    commonName,
    cientificName,
    growing,
    specifications,
  });

  await PlantDataRepo.save(newPlant)
    .then((plant) => res.send(plant))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  await PlantDataRepo.findOne({ where: { id: Number(id) } })
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
  const { commonName, cientificName, growing, specifications } = req.body;

  await PlantDataRepo.update(
    { id: Number(id) },
    {
      commonName,
      cientificName,
      growing,
      specifications,
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
