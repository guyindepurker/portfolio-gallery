"use strict";
var gNumRate = 0;
function onInit() {
  renderBooks();
}

function renderBooks() {
  var books = getBooks();
  var htmlStrs = books.map(function (book) {
    return `
        <tr>
        <td>${book.id}</td>
        <td>${book.bookName}</td>
        <td>${book.price}$</td>
        <td><button class="btn read-btn" onClick="onReadBook(${book.id})">Read</button></td>
        <td><button class="btn update-btn" onClick="onUpdateBook(${book.id})">Update</button></td>
        <td><button class="btn delete-btn" onClick="onRemoveBook(${book.id})">Delete</button></td>
    </tr>
        `;
  });
  document.querySelector(".book-preview").innerHTML = htmlStrs.join("");
}

function renderModel(bookId) {
  var book = getBookById(bookId);
  var htmlStr = ` 
    <h5>${book.bookName}</h5>
    <h6>${book.price}$</h6>
    <img class="book-image" src="${book.imgUrl}">
    <div class="rate-user">
        <h4>Rate:</h4>
        <div class="box-rate"><button class="add-rate-btn" onclick="onChangeRate(1,${
          book.id
        })">+</button>
            <span class="number-rate-user">${book.property}</span>
        <button class="less-rate-btn" onclick="onChangeRate(-1,${
          book.id
        })">-</button>
    </div>
    </div>
    <h4>About the Book:</h4>
    <p>${makeLorem(40)}</p>
    <button class="btn delete-btn" onclick="onCloseModal()" >Close window </button>
    `;
  document.querySelector(".modal").innerHTML = htmlStr;
}

function onAddBook() {
  var elBookName = document.querySelector(".add-book .name-book");
  var elBookPrice = document.querySelector(".add-book .price-book");
  var bookName = elBookName.value;
  var bookPrice = elBookPrice.value;
  if (!bookName || !bookPrice || isNaN(bookPrice)) return;
  addBook(bookName, bookPrice);
  renderBooks();
  elBookName.value = "";
  elBookPrice.value = "";
}
function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
}
function onUpdateBook(bookId) {
  var newPrice = +prompt("enter new price");
  if (isNaN(newPrice)) return alert("Enter a price in number");
  updateBook(bookId, newPrice);
  renderBooks();
}

function onReadBook(bookId) {
  renderModel(bookId);
  var elModal = document.querySelector(".modal");
  elModal.hidden = false;
}

function onChangeRate(diff, bookId) {
  var book = getBookById(bookId);
  if (diff === -1 && book.property <= 0) return;
  if (diff === 1 && book.property >= 10) return;
  updateRate(book, diff);
  renderRate(book);
}

function renderRate(book) {
  var elRate = document.querySelector(".number-rate-user");
  elRate.innerText = book.property;
}

function onCloseModal() {
  document.querySelector(".modal").hidden = true;
}
function onSortByName() {
  sortByName();
  renderBooks();
}
function onSortByPrice() {
  sortByPrice();
  renderBooks();
}
function onNextPage() {
  nextPage();
  renderBooks();
  renderPageNum();
}
function onPrevPage() {
  prevPage();
  renderBooks();
  renderPageNum();
}

function renderPageNum() {
  var elPageNum = document.querySelector(".page-num");
  elPageNum.innerText = gPageIdx + 1;
}
