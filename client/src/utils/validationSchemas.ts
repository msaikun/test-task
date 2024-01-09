import * as Yup from 'yup';

export const addPlaceValidationSchema = Yup.object().shape({
  name             : Yup.string().required(),
  formattedAddress : Yup.string().required('Formatted Address is required field'),
  description      : Yup.string(),
  price            : Yup.number().required(),
  rating           : Yup.number().min(0),
  location         : Yup.object().shape({
    lat: Yup.number().required(),
    lng: Yup.number().required(),
  }),
});