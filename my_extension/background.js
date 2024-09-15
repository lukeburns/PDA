console.log('PDA loaded')
chrome.storage.sync.set({ history: [] }) // reset

// Track when a tab becomes active (i.e., user switches tabs)
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (tab.url) {
      updateHistory(tab, 'tabActivated')
    }
  })
})

// Track when the user changes window focus
chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, windowId: windowId }, function(tabs) {
      if (tabs.length > 0) {
        const tab = tabs[0]
        if (tab.url) {
          updateHistory(tab, 'windowFocusChanged')
        }
      }
    })
  }
})

// Track when the user navigates to a new page
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url) {
    updateHistory(tab, 'tabUpdated')
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'highlight') {
    const highlightEvent = {
      event: 'highlight',
      text: message.text,
      timestamp: Date.now()
    };
    console.log('Highlight message received:', message.text);
    chrome.storage.sync.get(['history'], function(result) {
      const history = result.history ? result.history : [];
      history.push(highlightEvent);
      chrome.storage.sync.set({ history }, function() {
        console.log('Highlighted text added to history.');
        console.log('History:', history);
      });
      fetch('http://localhost:3000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(highlightEvent)
      });
    });
  }
});

function updateHistory(tab, event) {
  chrome.storage.sync.get(['history'], function(result) {
    const history = result.history ? result.history : []
    const prev = history[history.length-1]
    let curr = {
      event,
      id: tab.id,
      url: tab.url,
      title: tab.title,
      windowId: tab.windowId,
      groupId: tab.groupId,
      openerTabId: tab.openerTabId,
      lastAccessed: tab.lastAccessed,
      timestamp: Date.now()
    }

    // append to history if new event
    if (!prev || prev.id !== curr.id || prev.url !== curr.url) {
      history.push(curr)
      chrome.storage.sync.set({ history }, function() {
        console.log('URL ' + tab.url + ' added to history.')
        console.log('History:', history)
      })
      fetch('http://localhost:3000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(curr)
      })
    }
  })
}
