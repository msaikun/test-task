import mongoose, { Schema } from "mongoose";

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlace {
  id               : string;
  name             : string;
  formattedAddress : string;
  description      : string;
  price            : number;
  rating           : number;
  photos           : string[];
  location         : ILocation;
}

export interface IViewport {
  northeast : ILocation;
  southwest : ILocation;
}

export const placeSchema: Schema = new mongoose.Schema({
  name             : String,
  description      : String,
  id               : String,
  formattedAddress : String,
  rating           : Number,
  price            : Number,
  photos           : [String],
  location         : {
    lat : Number,
    lng : Number,
  },
});
