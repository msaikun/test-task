import { ReactNode } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
}                    from '@mui/material';

interface IModalProps {
  open         : boolean;
  content      : ReactNode;
  submitText?  : string;
  cancelText?  : string;
  title?       : string;
  handleClose  : () => void;
  handleSubmit : () => void;
}

export const Modal = ({
  submitText = 'Submit',
  cancelText = 'Cancel',
  content,
  title,
  open,
  handleClose,
  handleSubmit
}: IModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>{content}</DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>{cancelText}</Button>
        <Button onClick={handleSubmit}>{submitText}</Button>
      </DialogActions>
    </Dialog>
  );
};
