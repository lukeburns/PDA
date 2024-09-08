const fs = require('fs');
const path = require('path');
const bibtexParse = require('bibtex-parse-js');

function convertTxtToJson() {
  const txtPath = path.join(__dirname, '../collect-bibtex/history.bib');
  const jsonPath = path.join(__dirname, 'metadata.json');

  const txtContent = fs.readFileSync(txtPath, 'utf-8');
  const parsed = bibtexParse.parse(txtContent);

  const jsonContent = JSON.stringify(parsed, null, 2);
  fs.writeFileSync(jsonPath, jsonContent);
}

convertTxtToJson();
