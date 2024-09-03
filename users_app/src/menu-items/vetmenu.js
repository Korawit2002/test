import HandymanIcon from '@mui/icons-material/Handyman';
import { IconDashboard,IconKey } from '@tabler/icons-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// constant
const icons = { IconDashboard,IconKey };

// ==============================|| DASHBOARD MENU ITEMS ||====z========================== //

const user = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'performance',
      title: 'ค่าใช้จ่าย',
      type: 'item',
      url: '/performance/index',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }, 
    {
      id: 'user',
      title: 'ระบบแจ้งซ้อม',
      type: 'item',
      url: '/users/index',
      icon: HandymanIcon,
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'ข้อมูลของฉัน',
      type: 'item',
      url: '/account/index',
      icon: AccountCircleIcon,
      breadcrumbs: false
    },
  ]
};

export default user;
