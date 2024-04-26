import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NoResultsCard = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous route
  };

  return (
    <Card sx={{ mx: '3rem', width: '50vw' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Results are not declared yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please check back later for updates.
        </Typography>
        <Button onClick={handleBack} sx={{ mt: 2 }}>
          Back
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoResultsCard;
