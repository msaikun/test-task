import { styled } from "styled-components";
// import { AddPlaceModal } from "./AddPlaceModal";
import { useCallback, useState } from "react";
// import { InfoCard } from "../../../frontend/components/InfoCard";
import { addNewPlace, getAllPlaces } from "../../src/utils/requests";
import { debounce } from "../../src/utils/commonFunctions";
import { IPlace } from "../../src/utils/types";
// import { GoogleMap } from "../../../frontend/components/GoogleMap";
import { Button } from "@mui/material";
import { GoogleMap } from "../../src/components/GoogleMap";

export type TAddFormValues = Omit<IPlace, 'id'>

const places: IPlace[] = [
  {
    id: '1',
    name: 'Example Place 1',
    formattedAddress: '123 Main St, City, Country',
    description: 'A wonderful place to visit.',
    price: 50,
    rating: 4.5,
    photos: ['https://rentzila.com.ua/orenda-gusenichnogo-ekskavatora-doosan-dx255lca/2931/unit/', 'url2.jpg', 'url3.jpg'],
    location: { lat: 34.0522, lng: -118.2437 }, // Це широта та довгота для Лос-Анджелеса
  },
  {
    id: '2',
    name: 'Example Place 2',
    formattedAddress: '456 Elm St, Town, Country',
    description: 'An amazing destination for travelers.',
    price: 75,
    rating: 4.8,
    photos: ['https://rentzila.com.ua/orenda-gusenichnogo-ekskavatora-doosan-dx255lca/2931/unit/', 'url5.jpg', 'url6.jpg'],
    location: { lat: 40.7128, lng: -74.0060 },

  },
];

export const AllPlacesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalSubmit = useCallback(async (values: TAddFormValues) => {
    console.log('11val', values);
    await addNewPlace(values);
    handleModalClose();
  }, []);

  const debouncedMapSizeChange = debounce(async (northeast, southwest) => {
    const result = await getAllPlaces({ northeast, southwest });
    console.log('res', result);

    return result;
  }, 1000);

  return (
    <AllPlacesPage.Wrapper>
      <GoogleMap places={places} onMapSizeChange={debouncedMapSizeChange} />

      <AllPlacesPage.PlacesWrapper>
        <AllPlacesPage.Button>
          <Button sx={{ color: 'white' }} type="button" onClick={handleModalOpen}>Add New Place</Button>
        </AllPlacesPage.Button>

        <div style={{ position: 'relative', overflowY: 'auto' }}>
          {places.length ? places.map((place) => (
            <InfoCard
              title={place.name}
              img={place.photos[0]}
              id={place.id}
              key={place.id}
              mainInfo={place.formattedAddress}
            />
          )) : (
            <AllPlacesPage.NoInfo>No added markers</AllPlacesPage.NoInfo>
          )}
        </div>

        <AddPlaceModal
          open={isModalOpen}
          handleClose={handleModalClose}
          handleSubmit={handleModalSubmit}
        />
      </AllPlacesPage.PlacesWrapper>
    </AllPlacesPage.Wrapper>
  )
}

AllPlacesPage.Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
`;

AllPlacesPage.Button = styled.div`
  display: flex;
  position: relative;
  background: #9da595;
  width: 100%;
  justify-content: end;
  padding-right: 20px;
`;

AllPlacesPage.PlacesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 95vh;
  width: 40vw;
`;

AllPlacesPage.NoInfo = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  font-size: 12px;
  margin: 15px;
`;
