const newBookBtn = document.getElementById("new-book-btn");
const overlay = document.getElementById("overlay");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const readStatus = document.getElementById("read-status");
const formSubmitButton = document.getElementById("form-button");
const formPopup = document.getElementById("form-popup");
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
  
function displayCard(book, index, cardArea) {
  // create a card only for the specified book
  const card = document.createElement('div');
  card.classList.add('card');
  
  const title = document.createElement('h2');
  title.textContent = book.title;
  card.appendChild(title);
  
  const author = document.createElement('p');
  author.textContent = `Author: ${book.author}`;
  card.appendChild(author);
  
  const pages = document.createElement('p');
  pages.textContent = `Pages: ${book.pages}`;
  card.appendChild(pages);
  
  const readContainer = document.createElement('div');
  readContainer.classList.add('read-container');
  card.appendChild(readContainer);

  const readLabel = document.createElement('label');
  readLabel.textContent = 'Read:';
  readContainer.appendChild(readLabel);

  const readSlider = document.createElement('input');
  readSlider.type = 'range';
  readSlider.min = 0;
  readSlider.max = 1;
  readSlider.step = 1;
  readSlider.value = book.read ? 1 : 0;
  readContainer.appendChild(readSlider);

  const readStatus = document.createElement('span');
  readStatus.classList.add('read-status');
  readStatus.textContent = book.read ? 'Yes' : 'No';
  readContainer.appendChild(readStatus);
  
  const buttonContainer = document.createElement('div');
  card.appendChild(buttonContainer);
  
  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    // implement edit book functionality
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
    readStatus.textContent = book.read ? 'Yes' : 'No';
    if (book.read) {
      card.classList.add('card-read');
    } else {
      card.classList.remove('card-read');
    }
  });
}


function openForm() {
    const addBookForm = document.querySelector("#add-book-form");
    addBookForm.style.display = "block";
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
  }

newBookBtn.addEventListener('click', () => {
    formPopup.style.display = 'block';
    overlay.style.display = 'block';
});

overlay.addEventListener('click', () => {
    formPopup.style.display = 'none';
    overlay.style.display = 'none';
});


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
  
  // hide form
  const addBookForm = document.querySelector("#add-book-form");
  addBookForm.style.display = "none";
}
  

formSubmitButton.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    createBook(titleInput.value, authorInput.value, pagesInput.value, readStatus.checked);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readStatus.checked = false;
    openForm();
  },
  false
);


