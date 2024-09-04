chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Tab update event triggered. changeInfo: ', changeInfo);
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0]; // there will be only one in this array
      console.log('Tab URL: ', tab.url);
      chrome.storage.sync.get(['visitedUrls'], function(result) {
        var visitedUrls = result.visitedUrls ? result.visitedUrls : [];
        console.log('Current visitedUrls: ', visitedUrls);

        // Create a Blob from the visitedUrls array
        var blob = new Blob([visitedUrls.join('\n')], {type: 'text/plain'});
        // Create a URL from the Blob
        var url = URL.createObjectURL(blob);
        // Download the URL as a .txt file
        chrome.downloads.download({url: url, filename: 'visitedUrls.txt'});
      });
    });
  }
  if (changeInfo.url !== undefined) {
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

