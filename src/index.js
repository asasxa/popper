import Popover from './js/popover.js';
import './css/Popover.css';
import './css/button.css';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-title]').forEach((el) => {
    const title = el.dataset.title;
    const content = el.dataset.content || '';
    new Popover(el, { title, content });
  });
});
