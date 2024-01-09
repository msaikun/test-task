import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  getAllPlacesController,
  getPlaceByIdController,
  createPlaceController,
  deletePlaceController,
} from './controllers/placeController';

const app: Application = express();

mongoose.connect('mongodb://mongodb:27017/mydatabase');

const port: number = parseInt(process.env.PORT || '8002', 10);

app.use(express.json());

app.get('/places', async (req: Request, res: Response) => {
  await getAllPlacesController(req, res);
});

app.get('/places/:id', async (req: Request, res: Response) => {
  await getPlaceByIdController(req, res);
});

app.post('/places', async (req: Request, res: Response) => {
  await createPlaceController(req, res);
});

app.delete('/ads/:id', async (req: Request, res: Response) => {
  await deletePlaceController(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
