import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NormalLink = ({
    text,
    to,
    prependComponent,
    appendComponent,
    onClick,
}) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                backgroundImage: 'white',
                color: '#2B527A',
                padding: '8px 2px',
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                fontFamily: 'inherit',

                // Disable hover effect
                '&:hover': {
                    backgroundColor: 'white',
                    color: '#2B527A',
                }
            }}
        >
            <Link to={to} className='w-full flex items-center justify-between'>
                {prependComponent}
                <span className={`${prependComponent || appendComponent ? 'w-3/4' : 'w-full'}  text-center`}>{text}</span>
                {appendComponent}
            </Link>
        </Button>
    );
};

export default NormalLink;
