import { AppRouter } from '@/router/app-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/app.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppRouter />
    </StrictMode>,
);
