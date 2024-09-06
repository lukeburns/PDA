# README

WARNING: Proof of concept only, not meant to actually do anything useful at this stage.

Idea: Log internet usage locally to allow for data analysis and "attention mining".

## Running the server

```
cd server
npm install
npm start
```

## Installation of the extension

1. Open Chrome and navigate to chrome://extensions.
2. Enable Developer mode by ticking the checkbox in the upper-right corner.
3. Click on the "Load unpacked extension..." button.
4. Select your extension's directory `my_extension`

You should now see your extension in the list, and a new icon in your menu bar. You can view the console by clicking on the link "Inspect views" under your extension in chrome://extensions.

## Usage

The URLs visited in the browser should now be automatically sent to the server which puts them in the file `server/visitedUrls.txt`.