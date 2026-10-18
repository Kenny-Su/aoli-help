// Progressive enhancement: guides and screenshots also work without JavaScript.
document.querySelectorAll('[data-copy-target]').forEach((button) => {
  const target = document.getElementById(button.dataset.copyTarget);
  const feedback = document.getElementById(`${button.dataset.copyTarget}-feedback`);
  if (!target || !feedback) return;

  const label = button.querySelector('span');
  const originalLabel = button.getAttribute('aria-label');
  let resetTimer;
  button.hidden = false;

  button.addEventListener('click', async () => {
    clearTimeout(resetTimer);
    button.disabled = true;
    feedback.textContent = '';

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      label.textContent = '已复制';
      button.setAttribute('aria-label', '已复制');
      feedback.textContent = '已复制到剪贴板。';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
      feedback.textContent = '请复制已选中的文字，或长按文字进行复制。';
    } finally {
      button.disabled = false;
      resetTimer = setTimeout(() => {
        label.textContent = '复制';
        button.setAttribute('aria-label', originalLabel);
        feedback.textContent = '';
      }, 4000);
    }
  });
});
