import { Typography, Rating as MUIRating } from '@mui/material';

interface IRatingProps {
  value      : number;
  name?      : string;
  precision? : number;
  onChange   : (rate: number) => void;
}

export const Rating = ({
  value,
  name      = 'Rating',
  precision = 0.5,
  onChange,
}: IRatingProps) => {

  return (
    <div style={{ display: 'flex', marginTop: '5px' }}>
      <Typography component="legend">{name}</Typography>
      <MUIRating
        name      = "half-rating"
        precision = {precision}
        value     = {value}
        onChange  = {(_, newValue) => onChange(newValue || 0)}
      />
    </div>
  );
}