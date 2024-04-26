import { Button } from '@mui/material'
import React from 'react'

const SubjectButton = ({onClick,text,active,icon}) => {
  return (
    <Button
    onClick={onClick}
    sx={{
        fontSize:'1rem',
        padding:'0.4rem 1.5rem',
        backgroundColor: active  ? '#207EB85C' : '#4B4B4D17',
        color: active  ? '#207EB8' : '#4B4B4DCC',
        '&:hover': {
            backgroundColor: active  ? '#207EB85C' : '#4B4B4D17',
            color: active ? '#207EB8' : '#4B4B4DCC',
          },
    }}
    startIcon={icon}
>
    {text}
</Button>
  )
}

export default SubjectButton