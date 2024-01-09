import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { getPlaceById } from '../../src/utils/requests';
import { InfoCard } from '../../src/components/InfoCard';
import { useEffect, useState } from 'react';
import { IPlace } from '../../src/utils/types';

export const AdditionalPlaceInfoPage = () => {
  const params   = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState<IPlace | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeData = await getPlaceById(params?.id || '') as IPlace;
        setPlace(placeData);
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <IconButton aria-label="goBack" onClick={handleGoBack}>
        <ArrowBackIcon />
      </IconButton>

      <InfoCard
        title={place?.name || ''}
        id={place?.id || ''}
        key={place?.id || ''}
        mainInfo={place?.formattedAddress || ''}
        additionalInfo={place?.description || ''}
        img={place?.photos[0] || ''}
      />
    </>
  )
}