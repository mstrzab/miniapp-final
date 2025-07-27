import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SDKProvider } from '@telegram-apps/sdk-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SDKProvider acceptCustomStyles>
      <App />
    </SDKProvider>
);
