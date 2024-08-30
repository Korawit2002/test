// import { useSelector } from 'react-redux';

// import { ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, StyledEngineProvider } from '@mui/material';
// import { useDispatch } from "react-redux";

// // routing
// import Routes from 'routes';

// // defaultTheme
// import themes from 'themes';

// // project imports
// import NavigationScroll from 'layout/NavigationScroll';
// // import UserRoutes from './routes/UserRoutes';

// // ==============================|| APP ||============================== //

// const App = () => {
//   const customization = useSelector((state) => state.customization);

//   return (
//     <StyledEngineProvider injectFirst>
//       <ThemeProvider theme={themes(customization)}>
//         <CssBaseline />
//         <NavigationScroll>
//           <Routes />
//         </NavigationScroll>
//       </ThemeProvider>
//     </StyledEngineProvider>
//   );
// };

// export default App;
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';  // เพิ่มการ import นี้

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
//import { AuthProvider } from './contexts/AuthContext';  // เพิ่มการ import นี้

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
          {/* <AuthProvider>  */}
            <NavigationScroll>
              <Routes />
            </NavigationScroll>
          {/* </AuthProvider> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;