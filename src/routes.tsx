import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import App from './App';
import Checkout from './routes/checkout/Checkout';
import Error from './routes/error/Error';
import Store from './routes/store/Store';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: (
      <App>
        <Error />
      </App>
    ),
    children: [
      {
        index: true,
        element: <Store />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
