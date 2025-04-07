import { AppRouter } from '@/Router/AppRouter';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/app.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppRouter />
    </StrictMode>,
);
