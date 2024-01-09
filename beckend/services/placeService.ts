import mongoose from 'mongoose';
import { ILocation, IPlace, placeSchema } from './interfaces';

const Place = mongoose.model<IPlace>('Place', placeSchema);

export const getPlacesInViewport = async (northeast: ILocation, southwest: ILocation): Promise<IPlace[]> => {
  return Place.find({
    'location.lat': { $gte: southwest.lat, $lte: northeast.lat },
    'location.lng': { $gte: southwest.lng, $lte: northeast.lng },
  }).exec();
};

export const getPlaceById = async (adId: string): Promise<IPlace | null> => {
  return Place.findById(adId).exec();
};

export const createPlace = async (name: string, description: string, price: number, location: { lat: number, lng: number }, photos: string[]): Promise<IPlace> => {
  const place = new Place({ name, description, price, location, photos });
  return place.save();
};

export const deletePlace = async (placeId: string): Promise<void> => {
  await Place.findByIdAndDelete(placeId).exec();
};
