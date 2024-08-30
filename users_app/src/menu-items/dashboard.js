
import { IconDashboard,IconKey,IconChartLine } from '@tabler/icons-react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
// constant
const icons = { IconDashboard,IconKey,BarChartIcon ,NotificationsActiveIcon,NotificationsActiveOutlinedIcon,AccountCircleOutlinedIcon,IconChartLine};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      url: '/performance',
      icon: icons.IconChartLine,
      breadcrumbs: false
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/notification',
      icon: icons.NotificationsActiveOutlinedIcon,
      breadcrumbs: false
    },
        {
      id: 'maintenancerequests',
      title: 'maintenancerequests',
      type: 'item',
      url: '/maintenancerequests',
      icon: icons.NotificationsActiveOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: icons.AccountCircleOutlinedIcon,
      breadcrumbs: false
    },

  ]
};

export default dashboard;
