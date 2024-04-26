import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import BackdropOverlay from '../atoms/Backdrop';

const ConfirmationPopup = ({ heading, message, acceptButton, onAccept, onCancel }) => {
    return (
        <BackdropOverlay open={true}>
            <Dialog open={true} fullWidth>
                <DialogTitle>{heading}</DialogTitle>
                <DialogContent dividers>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <i className="bx bx-error text-3xl">&#9888;</i>
                        </div>
                        <div style={{ marginLeft: '1rem', textAlign: 'center' }}>
                            <p className="font-bold">{heading}</p>
                            <p className="text-sm text-gray-700 mt-1">{message}</p>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        id="confirm-delete-btn"
                        onClick={onAccept}
                        variant="contained"
                        color="error"
                    >
                        {acceptButton}
                    </Button>
                    <Button
                        id="confirm-cancel-btn"
                        onClick={onCancel}
                        variant="outlined"
                        color="inherit"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </BackdropOverlay>
    );
}

export default ConfirmationPopup;
