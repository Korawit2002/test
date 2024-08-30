
import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import UserRoutes from './UserRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Veterinarian = Loadable(lazy(() => import('views/request/Veterinarian')));
const Tef = Loadable(lazy(() => import('views/request/Tef')));
const Fei = Loadable(lazy(() => import('views/request/Fei')));
const Performance = Loadable(lazy(() => import('views/performance/index')));
const Notification = Loadable(lazy(() => import('views/notification/index')));
const Account = Loadable(lazy(() => import('views/account/index')));
const Users = Loadable(lazy(() => import('views/users/index')));
const Approve = Loadable(lazy(() => import('views/request/approve_vet')));
const View = Loadable(lazy(() => import('views/request/view_vet')))
const ApproveRenew = Loadable(lazy(() => import('views/request/approve_renew_vet')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'performance',
      children: [
        {
          path: 'index',
          element: <Performance />
        }
      ]
    },
    {
      path: 'notification',
      children: [
        {
          path: 'index',
          element: <Notification />
        }
      ]
    },
    {
      path: 'request',
      children: [
        {
          path: 'tef',
          element: (<Tef />)
        },
        {
          path: 'fei',
          element: (<Fei />)
        },
        {
          path: 'veterinarian',
          element: (<Veterinarian />)
        },
        {
          path: 'veterinarian/approve/:id',
          element: <Approve />
        },
        {
          path: 'veterinarian/approve_renew/:id',
          element: <ApproveRenew />
        },
        {
          path: 'veterinarian/view/:id',
          element: <View/>
        },
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: 'index',
          element: <Users />
        }
      ]
    },
    {
      path: 'account',
      children: [
        {
          path: 'index',
          element: <Account />
        }
      ]
    }
    
   
  ]
};

export default MainRoutes;

