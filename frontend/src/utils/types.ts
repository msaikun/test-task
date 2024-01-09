export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlace {
  id: string;
  name: string;
  formattedAddress: string;
  description: string;
  price: number;
  rating: number;
  photos: string[];
  location: ILocation;
}

export interface IViewport {
  northeast: ILocation;
  southwest: ILocation;
}

export interface IInfoWindow {
  place: IPlace;
}
