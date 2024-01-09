import { enqueueSnackbar } from 'notistack';

import { IPlace } from './types';

type TDebouncedFunction = (...args: any[]) => void;

export function debounce<F extends TDebouncedFunction>(func: F, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const getInfoWindowString = (place: IPlace) => `
  <div style="font-size: 14px; color: grey;">
    <div style="font-size: 16px; color: black;">${place.name}</div>
    <div>
      <span>${place.rating}</span>
      <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
    </div>
    <div>${place.description}</div>
    <div>${place.formattedAddress}</div>
    <div>$${place.price}</div>
  </div>
`;

export const splitCamelCase = (word: string) => {
  const wordsArray = word.split(/(?=[A-Z])/);

  const formattedWords = wordsArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return formattedWords.join(' ');
}

export const errorMessage = (error: any): string => {
  const { name, message } = error ?? {};

  if (!name && !message) return 'Something went wrong...';

  return `${name ? `${name}.` : ''} ${message ? `${message}.` : ''}`
};

export const commonErrorHandler = (error: any) => {
  enqueueSnackbar(errorMessage(error), { variant: 'error' });
}

export const getBoundaries = (map: google.maps.Map, zoom: number) => {
  const center = map.getCenter();
  const latLngDelta = 0.5;
  const lngLatDelta = latLngDelta * (map.getZoom() / zoom);

  const northeast = { lat: center.lat() + latLngDelta, lng: center.lng() + lngLatDelta };
  const southwest = { lat: center.lat() - latLngDelta, lng: center.lng() - lngLatDelta };

  return { northeast, southwest };
}
