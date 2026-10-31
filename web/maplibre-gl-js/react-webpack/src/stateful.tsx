import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import StatefulMap from './StatefulMap';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StatefulMap />
  </StrictMode>,
);
