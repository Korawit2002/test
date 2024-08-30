import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { useDispatch } from 'react-redux';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { AuthProvider } from './contexts/AuthContext';
///Users/tlo07/Desktop/TEF/staff_app/contexts/AuthContext.js
///Users/tlo07/Desktop/TEF/staff_app/src/App.js

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <AuthProvider>
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
