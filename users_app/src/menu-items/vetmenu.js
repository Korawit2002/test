// // assets
// import { IconDashboard } from '@tabler/icons-react';

// // constant
// const icons = { IconDashboard };

// // ==============================|| DASHBOARD MENU ITEMS ||============================== //
// //Performance
// const dashboard = {
//   id: 'dashboard',
//   title: 'Dashboard',
//   type: 'group',
//   children: [
//     {
//       id: 'default',
//       title: 'Dashboard',
//       type: 'item',
//       url: '/dashboard/default',
//       icon: icons.IconDashboard,
//       breadcrumbs: false
//     }
//   ]
// };

// export default dashboard;
// assets
import { IconDashboard,IconKey } from '@tabler/icons-react';

// constant
const icons = { IconDashboard,IconKey };

// ==============================|| DASHBOARD MENU ITEMS ||====z========================== //

const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      url: '/performance/index',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/notification/index',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'request',
      title: 'Request',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'tef',
          title: 'TEF Athlete',
          type: 'item',
          url: '/request/tef',
        },
        {
          id: 'fei',
          title: 'FEI Athlete',
          type: 'item',
          url: '/request/fei',
        },
        {
            id: 'veterinarian',
            title: 'Veterinarian',
            type: 'item',
            url: '/request/veterinarian',
          }
      ]
    
    },
    {
      id: 'user',
      title: 'Users',
      type: 'item',
      url: '/users/index',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account/index',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
