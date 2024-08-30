import { IconDashboard,IconKey,IconChartLine } from '@tabler/icons-react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { IconBellRinging } from '@tabler/icons-react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';

//คำขอ
import SendIcon from '@mui/icons-material/Send';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
// constant
const icons = { SendIcon,DonutSmallOutlinedIcon,IconDashboard,IconKey,BarChartIcon ,NotificationsActiveIcon,NotificationsActiveOutlinedIcon,AccountCircleOutlinedIcon,IconChartLine};
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DonutSmallOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      url: '/performance/index',
      icon: icons.BarChartIcon,
      breadcrumbs: false
    },
    {
      id: 'notification',
      title: 'Notification',
      type: 'item',
      url: '/notification/index',
      icon: icons.NotificationsActiveOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'request',
      title: 'Request',
      type: 'collapse',
      icon: AssignmentIcon,
      children: [
        {
          id: 'tef',
          title: 'TEF Athlete',
          type: 'item',
          url: '/request/tef',
          icon: ListAltIcon,
        },
        {
          id: 'fei',
          title: 'FEI Athlete',
          type: 'item',
          url: '/request/fei',
          icon: ListAltIcon,
        },
        {
            id: 'veterinarian',
            title: 'Veterinarian',
            type: 'item',
            url: '/request/veterinarian',
            icon: ListAltIcon,
          }
      ]
    
    },
    {
      id: 'user',
      title: 'User Management',
      type: 'item',
      url: '/users/index',
      icon: GroupIcon,
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account/index',
      icon: icons.AccountCircleOutlinedIcon,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
