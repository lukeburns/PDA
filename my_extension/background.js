chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Tab update event triggered. changeInfo: ', changeInfo);
  if (changeInfo.status === 'complete' && tab.url !== undefined) {
    console.log('Tab URL: ', tab.url);
  }
  if (changeInfo.url !== undefined) {
    console.log('URL changed. New URL: ', changeInfo.url);
    chrome.storage.sync.get(['visitedUrls'], function(result) {
      var visitedUrls = result.visitedUrls ? result.visitedUrls : [];
      visitedUrls.push(changeInfo.url);
      chrome.storage.sync.set({visitedUrls: visitedUrls}, function() {
        console.log('URL ' + changeInfo.url + ' added to visitedUrls.');
        console.log('Current visitedUrls: ', visitedUrls);
      });
    });
  }
});
console.log('Background script for My Extension');
