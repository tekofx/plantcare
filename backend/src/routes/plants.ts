import express from 'express';
import auth from '../middleware/auth';
import { PlantRepo } from '../typeorm.config';

const router = express.Router();
router.get('/', auth, async (req, res) => {
  await PlantRepo.find()
    .then((plants) => res.send(plants))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
});

router.post('/', auth, async (req, res) => {
  const { commonName, cientificName, growing, specifications } = req.body;

  const newPlant = PlantRepo.create({
    commonName,
    cientificName,
    growing,
    specifications,
  });

  await PlantRepo.save(newPlant)
    .then((plant) => res.send(plant))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
});

export default router;
