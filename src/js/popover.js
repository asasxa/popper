export default class Popover {
  constructor(trigger, config) {
    this.trigger = trigger;
    this.title = config.title || '';
    this.content = config.content || '';
    this.popover = null;
    this.isVisible = false;

    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
  }

  createPopover() {
    const el = document.createElement('div');
    el.className = 'popover bs-popover-top';
    el.setAttribute('role', 'tooltip');
    el.innerHTML = `
      <div class="arrow"></div>
      <h3 class="popover-header">${this.escapeHtml(this.title)}</h3>
      <div class="popover-body">${this.escapeHtml(this.content)}</div>
    `;
    return el;
  }

  show() {
    if (this.isVisible) return;

    this.popover = this.createPopover();
    document.body.appendChild(this.popover);

    // Позиционируем после добавления в DOM!
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();

    const left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
    const top = triggerRect.top - popoverRect.height - 8; // 8px ≈ высота стрелки

    this.popover.style.position = 'absolute';
    this.popover.style.left = `${left}px`;
    this.popover.style.top = `${top}px`;
    this.popover.style.display = 'block';

    this.isVisible = true;

    // Закрытие по клику вне
    document.addEventListener('click', this.handleOutsideClick);
  }

  hide() {
    if (!this.isVisible) return;

    if (this.popover && this.popover.parentNode) {
      this.popover.parentNode.removeChild(this.popover);
    }
    this.popover = null;
    this.isVisible = false;
    document.removeEventListener('click', this.handleOutsideClick);
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  handleOutsideClick = (e) => {
    if (
      !this.trigger.contains(e.target) &&
      (!this.popover || !this.popover.contains(e.target))
    ) {
      this.hide();
    }
  };

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}