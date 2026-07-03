import { setupIonicReact } from '@ionic/react';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import { CoreApp, CoreProvider } from '@your-org/core';
import './theme/brand.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { resolveCoreConfig } from './config/resolve-core-config';

setupIonicReact();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoreProvider config={resolveCoreConfig()}>
      <CoreApp />
    </CoreProvider>
  </StrictMode>,
);
