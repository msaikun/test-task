import { useNavigate  } from 'react-router-dom';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Typography, IconButton, IconButtonProps, Button } from '@mui/material';
import { useCallback } from 'react';

interface IInfoCardProps {
  title           : string;
  id: string;
  img             : string;
  mainInfo        : string;
  additionalInfo? : string;
}

export const InfoCard = ({ title, id, img, mainInfo, additionalInfo }: IInfoCardProps) => {
  const navigate = useNavigate();

  const handleLearnMoreClick = useCallback(() => {
    navigate(`/test-task/${id}`);
  }, [id]);

  return (
    <Card sx={{ overflow: 'initial', borderRadius: '10px', border: '1px solid, black', background: '#cfd4ca', margin: '10px', boxShadow: '5px 5px 5px #9da595' }} >
      <CardHeader title={title} />
      <CardMedia
        component="img"
        height="50"
        image={img}
        alt="Place marker info"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">{mainInfo}</Typography>
      </CardContent>

      {!additionalInfo && title ? (
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button size="small" sx={{ color: 'white' }} onClick={handleLearnMoreClick}>Learn More</Button>
        </CardActions>
      ) : (
        <div>{additionalInfo}</div>
      )}
    </Card>
  );
}
