import bcrypt from 'bcrypt';
import express from 'express';
import { UserRepo } from '../typeorm.config';

const router = express.Router();

// This endpoint is used to know if exists a user in the database
router.get('/', async (req, res) => {
  console.log('Checking if user exists...');
  await UserRepo.find().then((users) => {
    if (users.length !== 0) {
      console.log('User exists');
      return res.sendStatus(200);
    }
    console.log("User doesn't exist");
    return res.sendStatus(404);
  });
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const existsUser = await UserRepo.findOne({ where: { username } });
  if (existsUser) {
    return res.status(400).send('User already exists');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store hash in your password DB.
    console.log('creating user...');
    await UserRepo.save({
      username,
      password: hashedPassword,
    });
    return res.send('User created');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Error creating user');
  }
});

export default router;
