// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const SearchNavbar = () => (
  <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
    <FormControl sx={{ width: { xs: '100%', md: '70%' } }}>
      <OutlinedInput
        size="small"
        id="header-search"
        sx={{
            borderRadius: '12px',
            backgroundColor: '#eff3f4',
        }}
        endAdornment={
          <InputAdornment position="start" sx={{ mr: -0.5 }}>
            <Search />
          </InputAdornment>
        }
        aria-describedby="header-search-text"
        inputProps={{
          'aria-label': 'weight'
        }}
        placeholder="Buscar..."
      />
    </FormControl>
  </Box>
);

export default SearchNavbar;
