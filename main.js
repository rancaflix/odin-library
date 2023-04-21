const newBookBtn = document.getElementById("new-book-btn");
const overlay = document.getElementById("overlay");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const readStatus = document.getElementById("read-status");
const formSubmitButton = document.getElementById("form-button");
const formPopup = document.getElementById("form-popup");
const titleEditInput = document.getElementById('edit-title');
const authorEditInput = document.getElementById('edit-author');
const pagesEditInput = document.getElementById('edit-pages');
const editModule = document.getElementById("edit-module-wrapper");
const editBookForm = document.getElementById("edit-book-form");
const editSubmitButton = document.getElementById("submit-edit-btn")
const myLibrary = [];

// Book prototype
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  Book.prototype.info = function () {
    console.log(`${title}, ${author}, ${pages}, ${read}`);
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  // hide form and overlay
  overlay.style.display = "none";
  formPopup.style.display = "none";
}

function displayLibrary() {
  const cardArea = document.getElementById('card-area');
  const lastBookIndex = myLibrary.length - 1; // get the index of the last added book
  // only display the last added book
  displayCard(myLibrary[lastBookIndex], lastBookIndex, cardArea);
}

// create a card for each book
function displayCard(book, index, cardArea) {
  // create a card only for the specified book
  const card = document.createElement('div');
  card.classList.add('card');
  
  const title = document.createElement('h2');
  title.textContent = book.title;
  title.setAttribute('id', 'titleDisplay');
  card.appendChild(title);
  
  const author = document.createElement('p');
  author.textContent = `Author: ${book.author}`;
  author.setAttribute('id', 'authorDisplay');
  card.appendChild(author);
  
  const pages = document.createElement('p');
  pages.textContent = `${book.pages}p`;
  pages.setAttribute('id', 'pagesDisplay');
  card.appendChild(pages);
  
  // card components
  const readContainer = document.createElement('div');
  readContainer.classList.add('read-container');
  card.appendChild(readContainer);

  const readSlider = document.createElement('input');
  readSlider.type = 'range';
  readSlider.min = 0;
  readSlider.max = 1;
  readSlider.step = 1;
  readSlider.value = book.read ? 1 : 0;
  readSlider.classList.add('slider');
  readContainer.appendChild(readSlider);

  const readStatus = document.createElement('span');
  readStatus.classList.add('read-status');
  readStatus.textContent = book.read ? 'Read' : 'Not Read';
  readContainer.appendChild(readStatus);
  
  // card buttons 
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('id', 'cardBtnContainer');
  card.appendChild(buttonContainer);
  
  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    populateEditForm(book);
    editBookForm.setAttribute('data-book-index', myLibrary.indexOf(book));
    editModule.style.display = 'block';
    editBookForm.style.display = 'block';
    overlay.style.display = 'block';
  });
  buttonContainer.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    cardArea.removeChild(card);
  });
  buttonContainer.appendChild(deleteButton);

  // set background color based on read status
  if (book.read) {
    card.classList.add('card-read');
  } else {
    card.classList.remove('card-read');
  }
  
  cardArea.appendChild(card);

  // add event listener to update read status when slider is changed
  readSlider.addEventListener('input', () => {
    book.read = readSlider.value == 1;
    readStatus.textContent = book.read ? 'Read' : 'Not Read';
    if (book.read) {
      card.classList.add('card-read');
    } else {
      card.classList.remove('card-read');
    }
  });
}

function createBook() {
  // check if required fields are empty
  if (titleInput.value === "" || authorInput.value === "" || pagesInput.value === "") {
    alert("Please fill in all required fields.");
    return;
  }
  
  const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatus.checked);
  addBookToLibrary(newBook);
  displayLibrary();

  // clear input fields
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readStatus.checked = false;  
}

function populateEditForm(book) {
  titleEditInput.value = book.title;
  authorEditInput.value = book.author;
  pagesEditInput.value = book.pages;
  // readEditStatus.value = book.read ? 1 : 0;
  // set data-book-index attribute on form to the index of the book in the library
  editBookForm.setAttribute('data-book-index', myLibrary.indexOf(book));
}

function closeEditForm() {
  editBookForm.style.display = 'none';
  overlay.style.display = 'none';
}

 function updateBook() {
  const index = parseInt(editBookForm.getAttribute('data-book-index'));
  const book = myLibrary[index];

  // update book properties with form values
  book.title = titleEditInput.value;
  book.author = authorEditInput.value;
  book.pages = pagesEditInput.value;
  // book.read = readEditStatus.checked;

  // update card display with new values
  const cardArea = document.getElementById('card-area');
  const card = cardArea.children[index];
  card.children[0].textContent = book.title;
  card.children[1].textContent = `Author: ${book.author}`;
  card.children[2].textContent = `${book.pages}p`;
  // card.children[3].textContent = `Read: ${book.read ? 'Yes' : 'No'}`; THIS IS MESSING WITH SLIDER
  closeEditForm();
}

newBookBtn.addEventListener('click', () => {
  formPopup.style.display = 'block';
  overlay.style.display = 'block';

});

overlay.addEventListener('click', () => {
  formPopup.style.display = 'none';
  overlay.style.display = 'none';
  editBookForm.style.display = 'none';
});

formSubmitButton.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    createBook(titleInput.value, authorInput.value, pagesInput.value, readStatus.checked);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readStatus.checked = false;
  },
  false
);

editSubmitButton.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    updateBook();
  });
