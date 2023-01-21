// import "./index.html"
// console.log("test");
import './style.sass';
import './fireworks.css';
import './snackbar.css';
// import './index.html';
// import './index_en.html';
// import './a.ejs';

import ClipboardJS from 'clipboard';

const clipboard = new ClipboardJS('.btn-copy');

const elementNotFound = (id: string) => new Error(`${id}: element not found`);

const modal = (openId: string) => {
  const openElement = document.getElementById(openId);
  if (!openElement) throw elementNotFound(openId);

  const targetId = openElement.dataset.modalTarget;
  if (!targetId) throw elementNotFound('modalTarget');

  const selector = document.getElementById(targetId);
  if (selector === null) throw elementNotFound(targetId);

  const closeElement = selector.querySelector('[data-close]');
  if (closeElement) {
    closeElement.addEventListener('click', () => hide());
  }

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.key === 'Escape') hide();
  };

  selector.addEventListener('click', (e) => {
    if (e.target === selector) {
      hide();
    }
  });

  const show = () => {
    selector.style.display = 'block';
    document.addEventListener('keyup', handleKeyboard);
  };
  const hide = () => {
    selector.style.display = 'none';
    document.removeEventListener('keyup', handleKeyboard);
  };

  openElement.addEventListener('click', () => show());

  return {
    show,
    hide,
  };
};

document.addEventListener('DOMContentLoaded', () => {
  const bankModal = modal('openBankModal');
  if (document.location.hash == '#accounts') {
    bankModal.show();
  }

  clipboard.on('success', () => {
    const snackbar = document.getElementById('snackbar');
    if (snackbar === null) throw new Error('Where is snackbar?');
    snackbar.classList.add('show');
    setTimeout(() => {
      snackbar.classList.remove('show');
    }, 2500);
  });
});
