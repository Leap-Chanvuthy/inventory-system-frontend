// import { Toast } from "flowbite-react";
// import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

// export const SuccessToast = ({message}) => {
//   return (
//     <Toast>
//       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
//         <HiCheck className="h-5 w-5 bg-tailgreen text-white p-2 rounded-md" />
//       </div>
//       <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
//       <Toast.Toggle />
//     </Toast>
//   );
// };

// export const SangerToast = ({message}) => {
//   return (
//     <Toast>
//       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
//         <HiX className="h-5 w-5" />
//       </div>
//       <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
//       <Toast.Toggle />
//     </Toast>
//   );
// };

// export const WarningToast = ({message}) => {
//   return (
//     <Toast>
//       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
//         <HiExclamation className="h-5 w-5" />
//       </div>
//       <div className="ml-3 text-sm font-normal">
//         Improve password difficulty.
//       </div>
//       <Toast.Toggle />
//     </Toast>
//   );
// };



import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

export const SuccessToast = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000} 
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
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        icon={<HiX className="text-red-500" />}
        sx={{
          backgroundColor: 'bg-red-100 dark:bg-red-800',
          color: 'red-500',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AlertTitle>Error</AlertTitle>
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
