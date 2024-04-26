import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import NormalButton from '../form/NormalButton';
import GradientButton from '../form/GradientButton';
import { IconAlertOctagon } from '@tabler/icons';

const ConfirmationPopup = ({ heading, message, acceptButton, onAccept, onCancel }) => {
    return (
            <Dialog open={true} style={{margin:'0px !important'}}>
                <DialogTitle>{heading}</DialogTitle>
                <DialogContent dividers>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconAlertOctagon size={56} color='orange' />
                        <div style={{ marginLeft: '1rem', textAlign: 'center' }}>
                            <p className="text-sm text-gray-700 mt-1">{message}</p>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <NormalButton
                    text='Cancel'
                    onClick={onCancel}/>
                    <GradientButton
                    text={acceptButton}
                    onClick={onAccept}/>
                </DialogActions>
            </Dialog>
    );
}

export default ConfirmationPopup;
