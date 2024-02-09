import express from 'express';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import sharp from 'sharp';
import auth from '../middleware/auth';
import { PlantDataRepo, PlantRepo } from '../typeorm.config';

const plantsDir = 'backend/data/uploads/plants';
if (!fs.existsSync(plantsDir)) {
  fs.mkdirSync(plantsDir, { recursive: true });
}

// Multer config
const plantsStorage = multer.diskStorage({
  destination(
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, plantsDir);
  },
  filename(
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    // Guardar el archivo con un nombre temporal
    //cb(null, Date.now() + path.extname(file.originalname));
    cb(null, file.originalname);
  },
});

// Función de filtro de archivos
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  // Verificar si el archivo es una imagen
  if (file.mimetype.startsWith('image/')) {
    // Aceptar el archivo
    cb(null, true);
  } else {
    // Rechazar el archivo
    cb(null, false);
  }
};

const uploadPlants = multer({
  storage: plantsStorage,
  fileFilter,
});

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

router.post('/', auth, uploadPlants.single('image'), async (req, res) => {
  const { name, description, plantData } = req.body;
  const image = req.file;
  console.log('image', image);

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

  const id = await PlantRepo.save(newPlant)
    .then(() => {
      res.send('Plant created');
      return newPlant.id;
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
  if (image) {
    console.log('image', image);
    await sharp(`${plantsDir}/${image.filename}`)
      .resize(500)
      .jpeg()
      .toFile(path.join(plantsDir, `${id}.jpg`))
      .catch((error) => {
        console.log(error);
      });

    newPlant.image = `/plants/uploads/${id}.jpg`;
    await PlantRepo.save(newPlant);
  }

  return null;
});

router.use('/uploads', express.static(plantsDir));

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

router.put('/:id', auth, uploadPlants.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, plantData } = req.body;

  let aux = plantData;
  const image = req.file;

  if (aux) {
    aux = await PlantDataRepo.findOne({
      where: { id: plantData.id },
    });
  }

  if (image) {
    await sharp(`${plantsDir}/${image.filename}`)
      .resize(500)
      .jpeg()
      .toFile(path.join(plantsDir, `${id}.jpg`))
      .catch((error) => {
        console.log(error);
      });
  }

  await PlantRepo.update(
    { id: Number(id) },
    {
      name,
      description,
      plantData: aux || undefined,
      image: image ? `/plants/uploads/${id}.jpg` : '',
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
