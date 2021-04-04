const fs = require('fs');
const path = require('path');
const util = require('util');

const bookDB = path.join(__dirname, 'books.json');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.fetchBooks = () => {
  return readFile(bookDB, 'utf8').then(data => {
    return JSON.parse(data);
  });
}

exports.saveBooks = books => {
  return writeFile(bookDB, JSON.stringify(books), 'utf8');
}
