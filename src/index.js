import Popover from './js/popover.js';
import './css/popover.css';
import './css/button.css';

document.querySelectorAll('[data-title][data-content]').forEach((button) => {
  new Popover(button, {
    title: button.dataset.title,
    content: button.dataset.content
  });
});
