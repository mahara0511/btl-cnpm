import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Document from '~/pages/Profile';
import Print from '~/pages/Upload';
import Buy from '~/pages/Search';
import History from '~/pages/Live';

// Layout
import { LoginLayout } from '~/layouts';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: LoginLayout },
    { path: config.routes.document, component: Document },
    { path: config.routes.print, component: Print },
    { path: config.routes.buy, component: Buy },
    { path: config.routes.history, component: History },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
