document.getElementById('testButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
