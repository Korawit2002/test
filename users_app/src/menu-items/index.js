import dashboard from './dashboard';
import user from './vetmenu';

const role = localStorage.getItem('role');

let menuItems = {};

if (role === 'admin') {
    menuItems = {
        items: [dashboard]
    };
} else if (role === 'user') {
    menuItems = {
        items: [user]
    };
}

export default menuItems;
