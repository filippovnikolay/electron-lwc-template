import { createElement } from 'lwc';
import App from './modules/c/app/app.js';

// Add SLDS stylesheet
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './assets/styles/salesforce-lightning-design-system.min.css';
document.head.appendChild(link);

// Create root component
document.addEventListener('DOMContentLoaded', () => {
    const app = createElement('c-app', { is: App });
    document.body.appendChild(app);
});
