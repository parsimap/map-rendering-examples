import React from 'react';
import { createRoot } from 'react-dom/client';
import StatefulMap from './StatefulMap.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><StatefulMap /></React.StrictMode>,
);
