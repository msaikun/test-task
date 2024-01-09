import { enqueueSnackbar } from "notistack";
import { apiCaller } from "./apiCaller";
import { commonErrorHandler } from "./commonFunctions";
import { IPlace, IViewport } from "./types";

export const getAllPlaces = async (data: IViewport) => {
  try {
    const response = await apiCaller('places', { data });

    return response.data;
  } catch (error) {
    console.log('error', error);
    commonErrorHandler(error);
  }
};

export const getPlaceById = async (id: string) => {
  try {
    const response = await apiCaller<Promise<IPlace>>(`places/${id}`);

    return response.data;
  } catch (error) {
    console.log('error', error);
    commonErrorHandler(error);
  }
}

export const addNewPlace = async (data: Omit<IPlace, 'id'>) => {
  try {
    await apiCaller('places', { method: 'POST', data })
    enqueueSnackbar('Place was successfully added', { variant: 'success' });
  } catch (error) {
    commonErrorHandler(error);
  }
};

export const deletePlace = async (id: string) => {
  try {
    enqueueSnackbar('Place was successfully deleted', { variant: 'success' });
  } catch (error) {
    commonErrorHandler(error);
  }
};


