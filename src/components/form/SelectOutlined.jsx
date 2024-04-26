import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectOutlined = ({
  label,
  value,
  onChange,
  options
}) => {

  return (
    <FormControl sx={{width:'100%' }} size="small">
      <InputLabel id="demo-select-small-label" sx={{fontWeight:'bold'}}>{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={onChange}
        defaultValue={options[0]}
        sx={{
          borderRadius:'8px',
          outline: 'none',
          padding: '4px',
          fontWeight:'bold',
          color:'#4B4B4DB2'
        }}
      >
        {options && options?.map((option) => (
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

export default SelectOutlined;