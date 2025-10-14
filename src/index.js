import { createElement } from 'lwc';
import App from './modules/c/app/app.js';

// Create root component
document.addEventListener('DOMContentLoaded', () => {
    const app = createElement('c-app', { is: App });
    document.body.appendChild(app);
});
