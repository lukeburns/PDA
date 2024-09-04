chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Tab updated: ', changeInfo.url);
  if (changeInfo.url !== undefined) {
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
