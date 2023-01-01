import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: UserIcon,
        path: '/users',
        title: 'Users',
    },
    {
        id: 3,
        icon: ProductIcon,
        path: '/files',
        title: 'Files',
    }
]

export default sidebar_menu;