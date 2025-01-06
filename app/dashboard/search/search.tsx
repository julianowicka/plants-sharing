'use client';


import { IconButton, InputAdornment, styled } from "@mui/material";
import FilterIcon from "./filter-icon";
import SearchIcon from "./search-icon"
import TextField from '@mui/material/TextField';
const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      height: '64px',
      backgroundColor: '#f0f4f8',
      borderRadius: '16px',
      boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.9)',
      transition: 'all 0.3s ease',
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
      '&.Mui-focused': {
        boxShadow: 'inset 5px 5px 10px rgba(0, 0, 0, 0.15), inset -5px -5px 10px rgba(255, 255, 255, 1)',
      }
    },
    '& .MuiInputLabel-root': {
      color: '#a5e7df',
    },
    '& .MuiOutlinedInput-input': {
      color: '#a5e7df',
      '&::placeholder': {
        color: '#a5e7df',
        opacity: 1,
      }
    },
  });
export default  function Search() {
   
  return (
<>

<CustomTextField 
      id="outlined-basic" 
      label="Szukaj" 
      variant="outlined"
      sx={{
        width: '311px',
        height: '48px',
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
            <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" sx={{ width: "50px" }}>
            <IconButton>
              <FilterIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
</>

  );
}