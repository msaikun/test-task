import { ReactNode } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

interface IModalProps {
  open         : boolean;
  children     : ReactNode;
  withButtons? : boolean;
  submitText?  : string;
  cancelText?  : string;
  title?       : string;
  handleClose? : () => void;
  handleSubmit?: () => void;
}

export const Modal = ({
  withButtons = false,
  submitText = 'Submit',
  cancelText = 'Cancel',
  children,
  title,
  open,
  handleClose,
  handleSubmit
}: IModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>{children}</DialogContent>

      {withButtons && (
        <DialogActions>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button type="submit" onClick={handleSubmit}>{submitText}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
