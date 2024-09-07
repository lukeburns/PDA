const fs = require('fs');
const path = require('path');

// Define the path of the input and output files
const historyPath = path.join(__dirname, '../server/history.json');
const outputPath = path.join(__dirname, 'history_pdf.txt');

// Read and parse the history file
const history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));

// Use a regular expression to match URLs
const urlRegex = /(http|https):\/\/[^\s$.?#].[^\s]*\.pdf(?=")/g;

// Extract the URLs from each event in the history
const urls = history.flatMap(event => (JSON.stringify(event).match(urlRegex) || []));

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
