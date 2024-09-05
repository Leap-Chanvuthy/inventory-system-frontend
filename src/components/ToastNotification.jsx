import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { HiCheck, HiExclamation } from 'react-icons/hi';
import { IoWarningOutline } from "react-icons/io5";

export const SuccessToast = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Positioning
    >
      <Alert
        onClose={onClose}
        severity="success"
        icon={<HiCheck className="text-green-500" />}
        sx={{
          backgroundColor: 'bg-green-100 dark:bg-green-800',
          color: 'green-500',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {message || 'Operation completed successfully!'}
      </Alert>
    </Snackbar>
  );
};

export const DangerToast = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        icon={<IoWarningOutline className="text-red-500" />}
        sx={{
          backgroundColor: 'bg-red-100 dark:bg-red-800',
          color: 'red-500',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <AlertTitle>Error</AlertTitle> */}
        {message || 'An error occurred.'}
      </Alert>
    </Snackbar>
  );
};

export const WarningToast = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="warning"
        icon={<HiExclamation className="text-orange-500" />}
        sx={{
          backgroundColor: 'bg-orange-100 dark:bg-orange-700',
          color: 'orange-500',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AlertTitle>Warning</AlertTitle>
        {message || 'Please check your inputs.'}
      </Alert>
    </Snackbar>
  );
};
