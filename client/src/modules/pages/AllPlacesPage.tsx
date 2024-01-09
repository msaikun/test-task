import { useCallback, useState } from 'react';
import { styled }                from 'styled-components';
import { Button }                from '@mui/material';

import { GoogleMap }                 from '../../components/GoogleMap';
import { InfoCard }                  from '../../components/InfoCard';
import { IPlace }                    from '../../utils/types';
import { addNewPlace, getAllPlaces } from '../../utils/requests';
import { debounce }                  from '../../utils/commonFunctions';
import { AddPlaceModal }             from './AddPlaceModal';

export type TAddFormValues = Omit<IPlace, 'id'>

export const AllPlacesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [places, setPlaces]           = useState<IPlace[]>([]);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen  = () => setIsModalOpen(true);

  const handleModalSubmit = useCallback(async (values: TAddFormValues) => {
    await addNewPlace(values);
    handleModalClose();
  }, []);

  const debouncedMapSizeChange = debounce(async (northeast, southwest) => {
    const result = await getAllPlaces({ northeast, southwest });
    setPlaces(result as IPlace[]);

    return result;
  }, 1000);

  return (
    <AllPlacesPage.Wrapper>
      <GoogleMap places={places} onMapSizeChange={debouncedMapSizeChange} />

      <AllPlacesPage.PlacesWrapper>
        <AllPlacesPage.Button>
          <Button
            sx      = {{ color: 'white' }}
            type    = "button"
            onClick = {handleModalOpen}
          >
            Add New Place
          </Button>
        </AllPlacesPage.Button>

        <div style={{ position: 'relative', overflowY: 'auto' }}>
          {places?.length ? places.map((place) => (
            <InfoCard
              title    = {place.name}
              img      = {place.photos[0]}
              id       = {place.id}
              key      = {place.id}
              mainInfo = {place.formattedAddress}
            />
          )) : (
            <AllPlacesPage.NoInfo>No added markers</AllPlacesPage.NoInfo>
          )}
        </div>

        <AddPlaceModal
          open         = {isModalOpen}
          handleClose  = {handleModalClose}
          handleSubmit = {handleModalSubmit}
        />
      </AllPlacesPage.PlacesWrapper>
    </AllPlacesPage.Wrapper>
  );
}

AllPlacesPage.Wrapper = styled.div`
  display  : flex;
  overflow : hidden;
  position : relative;
`;

AllPlacesPage.Button = styled.div`
  display         : flex;
  position        : relative;
  background      : #9da595;
  width           : 100%;
  justify-content : end;
  padding-right   : 20px;
`;

AllPlacesPage.PlacesWrapper = styled.div`
  display        : flex;
  flex-direction : column;
  max-height     : 95vh;
  width          : 40vw;
`;

AllPlacesPage.NoInfo = styled.div`
  display         : flex;
  justify-content : center;
  color           : gray;
  font-size       : 12px;
  margin          : 15px;
`;
