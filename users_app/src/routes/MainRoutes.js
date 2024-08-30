import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import UserRoutes from './UserRoute';
import ProtectedRoute from '../component/function/ProtectedRoute';
// dashboard routing Renew
const DashboardDefault = Loadable(lazy(() => import('views/performance/index')));
const Account = Loadable(lazy(() => import('views/account/account')));
const Renew = Loadable(lazy(() => import('views/account/renew')));
const Notification = Loadable(lazy(() => import('views/notification/index')));
const Maintenancerequests = Loadable(lazy(() => import('views/maintenancerequests/index')));
// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
//  element: <ProtectedRoute />, 
  children: [
    {
      path: '/',
      element: <MainLayout />, 
      children: [
        {
          path: 'performance',
          element: <DashboardDefault />,
        },
        {
          path: 'account',
          element: <Account />,
        },
        {
          path: 'account/renew',
          element: <Renew />,
        },
        {
          path: 'notification',
          element: <Notification />,
        },
        {
          path: 'maintenancerequests',
          element: <Maintenancerequests />,
        },

        
      ]
    }
  ]
};

export default MainRoutes;

