document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  console.log('Mouseup event detected. Selected text:', selectedText);
  if (selectedText) {
    console.log('Sending highlight message:', selectedText);
    chrome.runtime.sendMessage({ type: 'highlight', text: selectedText }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else {
        console.log('Message sent successfully:', response);
      }
    });
  }
});
