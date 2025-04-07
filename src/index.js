import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createHashRouter, RouterProvider } from 'react-router-dom';

export const menuItems = [
  { path: '/', index: true, caption: 'Main', component: <div>Main</div>, isMenuItem: true },
  { path: '/about', caption: 'About', component: <div>About</div>, isMenuItem: true},
  { path: '/hotels', caption: 'Hotels', component: <div>Hotels</div>},
];

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...menuItems.map(({ path, index, component }) => ({ path, index, element: component }))
    ],
  },
]);

const rootNodeElement = document.querySelector('#main');
const root = ReactDOM.createRoot(rootNodeElement);
root.render(<Provider store={store}>
  <RouterProvider router={router}/>
</Provider>);