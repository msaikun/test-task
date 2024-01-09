import { Request, Response } from 'express';
import {
  getPlaceById,
  createPlace,
  deletePlace,
  getPlacesInViewport,
  getAllPlaces,
}                    from '../services/placeService';
import { ILocation } from '../services/interfaces';

export const getAllPlacesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { northeast, southwest } = req.query;
    if (northeast && southwest) {
      const northeastPoint = northeast as unknown as ILocation
      const southwestPoint = southwest as unknown as ILocation

      const places = await getPlacesInViewport(northeastPoint, southwestPoint);
      res.json(places);
    } else {
      const places = await getAllPlaces();
      res.json(places);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlaceByIdController = async (req: Request, res: Response): Promise<void> => {
  const placeId = req.params.id;

  try {
    const place = await getPlaceById(placeId);
    if (place) {
      res.json(place);
    } else {
      res.status(404).json({ message: "Place not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlaceController = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, location, photos } = req.body;

  try {
    const newPlace = await createPlace(name, description, price, { lat: location.latitude, lng: location.longitude }, photos);
    res.status(201).json(newPlace);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePlaceController = async (req: Request, res: Response): Promise<void> => {
  const placeId = req.params.id;

  try {
    await deletePlace(placeId);
    res.json({ message: 'Place deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
