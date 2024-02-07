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

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  await PlantRepo.findOne({ where: { id: Number(id) } })
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

  await PlantRepo.update(
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
