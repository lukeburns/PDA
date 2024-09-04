# README

WARNING: Proof of concept only, not meant to actually do anything useful at this stage.

Idea: Log internet usage locally to allow for data analysis and "attention mining".
## Installation

1. Open Chrome and navigate to chrome://extensions.
2. Enable Developer mode by ticking the checkbox in the upper-right corner.
3. Click on the "Load unpacked extension..." button.
4. Select your extension's directory `my_extension`

You should now see your extension in the list, and a new icon in your menu bar. You can view the console by clicking "background page" under your extension in chrome://extensions.

Loading a tab in the browser should output on the console.

![alt text](image-1.png)

The URLs should be automatically downloaded to `visitedUrls.txt` in the Downloads folder.