import { useSnackbar, VariantType } from 'notistack';
import { useEffect } from 'react';

type TNotistack = any;

export const Notification: TNotistack = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect((): void => {
    Notification.enqueueSnackbar = (message: string, variant: VariantType): void => {
      enqueueSnackbar(message, { variant });
    };
  }, [enqueueSnackbar]);

  useEffect((): void => {
    Notification.closeSnackbar = (): void => {
      closeSnackbar();
    };
  }, [closeSnackbar]);

  return null;
};
