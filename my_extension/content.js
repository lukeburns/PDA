document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    console.log('Sending highlight message:', selectedText);
    chrome.runtime.sendMessage({ type: 'highlight', text: selectedText });
  }
});
