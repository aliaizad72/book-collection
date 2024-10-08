let id = 0;

function Book(title, author, pages, read) {
  this.id = id++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read
    ? "Read"
    : "Not read" 
}

const pp = new Book("Pride and Prejudice", "Jane Austen", 271, false);
const hobbit = new Book("The Hobbit", "J.R.R Tolkien", 300, true)

const myLibrary = [pp, hobbit]


document.body.onload = myLibrary.forEach((book) => createBookDivs(book));

const revealBtn = document.getElementById("reveal-form")
const form = document.getElementById("form")
revealBtn.addEventListener("click", revealForm)

const submitBtn = document.getElementById("submit")
submitBtn.addEventListener("click", e => addBook(e))

const deleteBtn = document.getElementsByClassName("delete-book");

function addBook(e) {
  e.preventDefault()
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = Number(document.getElementById("pages").value)
  const read = document.getElementById("yes").checked
  let book = new Book(title, author, pages, read);
  createBookDivs(book)
  myLibrary.push(book)
}

function revealForm() {
  form.classList.toggle("hidden")
  if (revealBtn.textContent === "Add Book") {
    revealBtn.textContent = "Close Form"
  } else {
    revealBtn.textContent = "Add Book"
  }
}

function createBookDivs(book) {
  const bookContainer = document.getElementById("book-container");
  const bookDiv = document.createElement("div");

  const title = document.createElement("h3");
  title.classList.add("font-medium");
  title.textContent = book.title;

  const deleteBtn = document.createElement("button")
  deleteBtn.textContent = "Delete Book"
  deleteBtn.classList.add("delete-book", "text-black", "hover:text-white", "border", "border-black", "hover:bg-black", "text-xs", "rounded-md", "px-3", "py-1", "text-center", "mt-2")
  deleteBtn.addEventListener("click", (e) => deleteBook(e));


  const readBtn = document.createElement("button")

  if (book.read === "Read") {
    readBtn.textContent = "Unread"
  } else {
    readBtn.textContent = "Book Read"
  }
  readBtn.classList.add("book-read", "text-black", "hover:text-white", "border", "border-black", "hover:bg-black", "text-xs", "rounded-md", "px-3", "py-1", "text-center", "mt-2", "ml-2")
  readBtn.addEventListener("click", (e) => toggleRead(e))

  const bookList = document.createElement("ul");
  for(const property in book) {
    if (property === "title" || property === "id" ) { continue; }
    const listElement = document.createElement("li")
    if (property === "pages" ) { 
      listElement.textContent = `${book[property]} pages`
    } else {
      listElement.textContent = `${book[property]}`
    }
    bookList.appendChild(listElement);
  }
  bookDiv.classList.add("block", "p-6", "bg-white", "border", "border-gray-200", "rounded-lg", "shadow", "m-3")
  bookDiv.setAttribute("data-id", book.id)
  bookDiv.appendChild(title);
  bookDiv.appendChild(bookList);
  bookDiv.appendChild(deleteBtn);
  bookDiv.appendChild(readBtn);
  bookContainer.appendChild(bookDiv);
}

function deleteBook(e) {
  const bookDiv = e.target.parentElement
  const bookIds = myLibrary.map((book) => book.id)
  const index = bookIds.indexOf(Number(bookDiv.dataset.id)) 
  myLibrary.splice(index, 1) // delete book at id
  bookDiv.remove();
}

function toggleRead(e) {
  const readElement = e.target.parentElement.childNodes[1].lastChild
  const bookDiv = e.target.parentElement
  const bookIds = myLibrary.map((book) => book.id)
  const index = bookIds.indexOf(Number(bookDiv.dataset.id))
  if (myLibrary[index].read === "Read") {
    e.target.textContent = "Book Read"
    myLibrary[index].read = "Not read"
    readElement.textContent = "Not read"
  } else {
    e.target.textContent = "Unread"
    myLibrary[index].read = "Read"
    readElement.textContent = "Read"
  }
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
