const fs = require('fs');
const path = require('path');

function convertTxtToJson() {
  const txtPath = path.join(__dirname, '../collect-bibtex/history_pdf.txt');
  const jsonPath = path.join(__dirname, 'metadata.json');

  const txtContent = fs.readFileSync(txtPath, 'utf-8');
  const lines = txtContent.split('\n');

  const jsonContent = JSON.stringify(lines, null, 2);
  fs.writeFileSync(jsonPath, jsonContent);
}

convertTxtToJson();
