import GoogleMapReact, { Props as GoogleMapReactProps } from 'google-map-react';
import { useCallback, useRef }                          from 'react';
import styled                                           from 'styled-components';

import { ILocation, IPlace }                  from '../utils/types';
import { getBoundaries, getInfoWindowString } from '../utils/commonFunctions';

const DEFAULT_PLACEMENT = { lat: 34.0828183, lng: -118.3241586 };

interface IGoogleMapProps {
  places               : IPlace[];
  zoom?                : number;
  height?              : string;
  width?               : string;
  errorMsg?            : string;
  openManyInfoWindows? : boolean;
  availableMapClick?   : boolean;
  onMapSizeChange?     : (northeast: ILocation, southwest: ILocation) => void;
  onMapClick?          : (values: ILocation) => void;
}

const GOOGLE_API = 'AIzaSyABpBTWPdiqMACyT7s3kK4ZTPRCoHgaj5w';

export const GoogleMap = ({
  width,
  height,
  places,
  errorMsg            = '',
  openManyInfoWindows = false,
  availableMapClick   = false,
  zoom                = 10,
  onMapClick,
  onMapSizeChange,
  ...props
}: IGoogleMapProps & GoogleMapReactProps) => {
  const mapRef    = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const handleApiLoaded = useCallback((
    map    : google.maps.Map,
    maps   : typeof google.maps,
    places : IPlace[],
  ) => {
    const markers         : google.maps.Marker[] = [];
    const allInfoWindows  : google.maps.InfoWindow[] = [];
    const openInfoWindows : google.maps.InfoWindow[] = [];

    mapRef.current = map;

    places.forEach((place) => {
      const marker = new maps.Marker({
        position: {
          lat: place.location.lat,
          lng: place.location.lng,
        },
        map,
      });

      const infowindow = new maps.InfoWindow({ content: getInfoWindowString(place) });

      markers.push(marker);
      allInfoWindows.push(infowindow);

      marker.addListener('click', () => {
        if (!openManyInfoWindows) {
          openInfoWindows.forEach((infoWindow) => infoWindow.close());
          openInfoWindows.length = 0;
        }

        infowindow.open(map, marker);
        openInfoWindows.push(infowindow);
      });

      infowindow.addListener('closeclick', () => {
        const index = openInfoWindows.indexOf(infowindow);

        if (index !== -1) {
          openInfoWindows.splice(index, 1);
        }
      });
    });

    if (!onMapClick && onMapSizeChange) {
      const boundaries = getBoundaries(map, zoom);
      onMapSizeChange(boundaries.northeast, boundaries.southwest);
    }
  }, [mapRef, openManyInfoWindows, onMapClick, onMapSizeChange]);

  const handleMapClick = useCallback(({ lat, lng }: ILocation) => {
    if (places?.length) return;

    if (markerRef.current) {
      markerRef.current.setMap(null);
    };

    if (onMapClick && availableMapClick) {
      onMapClick({ lat, lng });
    };

    const marker = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapRef.current!,
    });

    markerRef.current = marker;

    return marker;
  }, [places, markerRef, mapRef, zoom, availableMapClick, onMapClick]);

  return (
    <GoogleMap.Wrapper width={width} height={height}>
      <GoogleMapReact
        {...props}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter     = {DEFAULT_PLACEMENT}
        defaultZoom       = {zoom}
        onChange          = {({ bounds: { ne, sw }}) => onMapSizeChange?.({ lat: ne.lat, lng: ne.lng }, { lat: sw.lat, lng: sw.lng })}
        onClick           = {handleMapClick}
        onGoogleApiLoaded = {({ map, maps }) => handleApiLoaded(map, maps, places)}
        bootstrapURLKeys  = {{ key: GOOGLE_API }}
      />

      <GoogleMap.Error>{errorMsg}</GoogleMap.Error>
    </GoogleMap.Wrapper>
  );
}

GoogleMap.Wrapper = styled.div<{ width?: string; height?: string }>`
  width  : ${({ width }) => width || '60%'};
  height : ${({ height }) => height || '100vh'};
`;

GoogleMap.Error = styled.div`
  color     : red;
  font-size : 10px;
`;
