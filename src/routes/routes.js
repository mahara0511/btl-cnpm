import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Document from '~/pages/Document';
import Print from '~/pages/Print';
import Buy from '~/pages/Buy';
import History from '~/pages/History';

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
