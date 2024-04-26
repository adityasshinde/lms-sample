import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectDropDown = (
  {
    value,
    onChange,
    label,
    options,
    id,
    width

  }
) => {

  return (
    <FormControl
      variant="standard"

      sx={{
        minWidth: 62,
        width: width,
        backgroundColor: 'inherit',
        '&:hover': {
          backgroundColor: 'inherit',
        },
        '&:focus': {
          backgroundColor: 'inherit',
        },
      }}
    >
      <Select
        disableUnderline
        value={value}
        id={id}
        onChange={onChange}
        defaultChecked={true}
        sx={{
          padding: '0 5px',
          fontSize: 'inherit !important',
          fontWeight: 'bold',
          fontFamily: 'inherit !important',
        }}
      >
        {options && options.map((option) => (
          <MenuItem
            sx={{
              fontSize: 'inherit !important',
              fontWeight: 'bold',
              fontFamily: 'inherit !important',
            }} key={option} value={option}>
            {option}
          </MenuItem>
        )
        )}
      </Select>
    </FormControl>
  );
}

export default SelectDropDown;