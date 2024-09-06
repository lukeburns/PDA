chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // console.log('Tab update event triggered. changeInfo: ', changeInfo);
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0]; // there will be only one in this array
      console.log('Tab URL: ', tab.url);
      chrome.storage.sync.get(['visitedUrls'], function(result) {
        var visitedUrls = result.visitedUrls ? result.visitedUrls : [];
        console.log('Current visitedUrls: ', visitedUrls.filter(url => url !== null));

        // Send the visitedUrls to our server
        fetch('http://localhost:3000/visitedUrls', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({visitedUrls: visitedUrls})
        });
      });
    });
  }
  if (changeInfo.url !== undefined && !changeInfo.url.startsWith('chrome://') && !changeInfo.url.startsWith('chrome-extension://') && !changeInfo.url.startsWith('chrome://extensions/')) {
    console.log('URL changed. New URL: ', changeInfo.url);
    chrome.storage.sync.get(['visitedUrls'], function(result) {
      var visitedUrls = result.visitedUrls ? result.visitedUrls : [];
      visitedUrls.push(changeInfo.url);
      chrome.storage.sync.set({visitedUrls: visitedUrls}, function() {
        console.log('URL ' + changeInfo.url + ' added to visitedUrls.');
      });
    });
  }
});
console.log('Background script for My Extension');

