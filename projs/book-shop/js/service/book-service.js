"use strict";
const BOOKSDB = "BooksDB";
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gBooks;

_createBooks();

function getBooks() {
  var fromIdx = gPageIdx * PAGE_SIZE;
  return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE);
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return bookId === book.id;
  });
  return book;
}

function addBook(name, price) {
  gBooks.unshift(_createBook(name, price, 'imgs/defult.jpg'));
  _saveBooksToStorage();
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  if (bookIdx < 0) return;
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });
  gBooks[bookIdx].price = newPrice;
  _saveBooksToStorage();
}

function updateRate(book, diff) {
  if (diff === -1) {
    book.property--;
  } else if (diff === 1) {
    book.property++;
  }
  _saveBooksToStorage();
}
function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}
function prevPage() {
  if (gPageIdx <= 0) return;
  gPageIdx--;
}


function sortByName() {
    return gBooks.sort(function(a, b) {
        var nameA = a.bookName.toUpperCase(); 
        var nameB = b.bookName.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
}

function sortByPrice() {
    return gBooks.sort(function(a, b) {
        return a.price - b.price;
    });
}

function _createBooks() {
  var books = loadFromStorage(BOOKSDB);
  if (!books || !books.length) {
    books = [];
    books.push(_createBook("battle royal", 18.9, "imgs/battle.jpg"));
    books.push(_createBook("leave us", 15.5, "imgs/leave.jpg"));
    books.push(_createBook("harry poter", 10, "imgs/race.jpg"));
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _createBook(name, price, img) {
  return {
    id: +makeId(),
    bookName: name,
    price: price,
    imgUrl: img,
    property: 0,
  };
}
function _saveBooksToStorage() {
  saveToStorage(BOOKSDB, gBooks);
}
