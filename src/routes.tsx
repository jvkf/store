import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import App from './App';
import Store from './routes/store/Store';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Store />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
