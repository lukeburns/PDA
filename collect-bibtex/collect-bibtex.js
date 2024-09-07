const fs = require('fs');
const path = require('path');

// Define the path of the input and output files
const historyPath = path.join(__dirname, '../server/history.txt');
const outputPath = path.join(__dirname, 'history_pdf.txt');

// Read the history file
const history = fs.readFileSync(historyPath, 'utf-8');

// Use a regular expression to match URLs
const urlRegex = /(http|https):\/\/[^\s$.?#].[^\s]*(\.pdf|\/pdf\/)/g;

// Extract the URLs
const urls = history.match(urlRegex);

// Check if urls is null
if (urls === null) {
    // Write an empty string to the output file
    fs.writeFileSync(outputPath, '');
} else {
    // Filter the URLs to only include those that start with "http"
    const filteredUrls = urls.filter(url => url.startsWith('http'));

    // Write the filtered URLs to the output file
    fs.writeFileSync(outputPath, filteredUrls.join('\n'));
}
