import Popover from '../js/Popover';

describe('Popover', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="trigger" data-title="Hello" data-content="World">Click me</button>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('появляется при клике', () => {
    const trigger = document.getElementById('trigger');
    const popover = new Popover(trigger, {
      title: 'Hello',
      content: 'World'
    });

    trigger.click();
    expect(document.querySelector('.popover')).toBeTruthy();
  });

  test('содержит правильный заголовок и текст', () => {
    const trigger = document.getElementById('trigger');
    const popover = new Popover(trigger, { title: 'Test', content: 'Content' });
    trigger.click();

    const header = document.querySelector('.popover-header');
    const body = document.querySelector('.popover-body');
    expect(header.textContent).toBe('Test');
    expect(body.textContent).toBe('Content');
  });

  test('скрывается при повторном клике', () => {
    const trigger = document.getElementById('trigger');
    const popover = new Popover(trigger, { title: 'T', content: 'C' });
    trigger.click(); // показать
    trigger.click(); // скрыть
    expect(document.querySelector('.popover')).toBeNull();
  });

  test('скрывается при клике вне', () => {
    const trigger = document.getElementById('trigger');
    const popover = new Popover(trigger, { title: 'T', content: 'C' });
    trigger.click();
    document.body.click();
    expect(document.querySelector('.popover')).toBeNull();
  });
});