import { useRoutes } from 'react-router-dom';

import EditContact from './pages/EditContact';
import Home from './pages/Home';
import NewContact from './pages/NewContact';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/new',
      element: <NewContact />
    },
    {
      path: '/edit/:id',
      element: <EditContact />
    }
  ])

  return routes
}
