import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserRepo } from '../typeorm.config';

const router = express.Router();
router.post('/', async (req, res) => {
  await UserRepo.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (user) {
        return bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            const token = jwt.sign({ username: user.username }, config.BACKEND_SECRET_KEY, {
              expiresIn: '24h',
            });
            return res.send({
              message: 'Login successful',
              username: user.username,
              token,
            });
          }
          return res.status(401).send('Invalid password');
        });
      }
      return res.status(401).send('Invalid username');
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send('An error occurred');
    });
});

export default router;
