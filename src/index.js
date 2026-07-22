import '@lwc/synthetic-shadow';
import './build/slds-styles.js';
import { createElement } from 'lwc';
import App from './modules/c/app/app.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = createElement('c-app', { is: App });
    document.body.appendChild(app);
});
