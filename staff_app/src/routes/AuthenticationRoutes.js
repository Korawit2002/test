import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const Register = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register')));
const RegisterTef = Loadable(lazy(() => import('views/pages/authentication/authentication3/Tef')));
const RegisterVet = Loadable(lazy(() => import('views/pages/authentication/authentication3/Vet')));
const RegisterClub = Loadable(lazy(() => import('views/pages/authentication/authentication3/Club')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/register/tef',
      element: <RegisterTef />
    },
    {
      path: '/register/vet',
      element: <RegisterVet />
    },
    {
      path: '/register/club',
      element: <RegisterClub />
    },
  ]
};

export default AuthenticationRoutes;
