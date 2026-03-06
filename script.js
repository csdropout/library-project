class Book {
    constructor(title, author, hasRead=false) {
        this.title = title;
        this.author = author;
        this.hasRead = hasRead;
        this.id = crypto.randomUUID();
    }

    toggleReadStatus() {
        this.hasRead = !this.hasRead;
    }

    createBookCard() {
        // create card
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "card")

        // create p element for title
        const title = document.createElement("p");
        title.textContent = `Title: ${this.title}`;

        // create p element for author
        const author = document.createElement("p");
        author.textContent = `Author: ${this.author}`;

        // create p element for book id
        const bookId = document.createElement("p");
        bookId.textContent = `ID: ${this.id}`;

        // create element for read status
        const readStatus = document.createElement("p");
        readStatus.textContent = `Status: ${this.hasRead? "Read" : "Not read"}`;

        // Add a button on each book’s display to remove the book from the library.
        // create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function(e) {
            // remove book from library array
            myLibrary = myLibrary.filter(function (libraryBook) {
                return libraryBook.id !== this.id;
            })

            // remove book from display
            this.parentElement.remove();
        })

        // Add a button on each book’s display to change its read status.
        const readButton = document.createElement("button");
        readButton.textContent = "Change read status";
        readButton.addEventListener("click", () => {
            this.toggleReadStatus();
            readStatus.textContent = `Status: ${this.hasRead? "Read" : "Not read"}`;
        })

        // group buttons
        const cardButtons = document.createElement("div");
        cardButtons.setAttribute("class", "card-buttons");
        cardButtons.appendChild(readButton);
        cardButtons.appendChild(deleteButton);

        // add elements to card
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(bookId);
        bookCard.appendChild(readStatus);
        bookCard.appendChild(cardButtons);

        return bookCard;
    }
}

let myLibrary = []

myLibrary.push(new Book("The Hobbit", "J.R.R Tolkien"));
myLibrary.push(new Book("The Hobbit", "J.R.R Tolkien"));
myLibrary.push(new Book("The Hobbit", "J.R.R Tolkien"));
myLibrary.push(new Book("The Hobbit", "J.R.R Tolkien"));
myLibrary.push(new Book("Killing Commendatore", "Murakami"));

function displayBooks() {
    // create/find container or table
    const booksContainer = document.querySelector("div#books-container");
    booksContainer.textContent = "";

    // loop through library
    for (const book of myLibrary) {
        // create book card
        const card = book.createBookCard();
        // append card to container
        booksContainer.appendChild(card);
    }

}

const displayButton = document.querySelector("button#display-books-button");
displayButton.addEventListener('click', displayBooks)

const newBookDialog = document.querySelector("dialog#new-book-dialog")

const form = document.querySelector("form");
form.addEventListener("submit", function addBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const book = Object.fromEntries(formData)

    const title = book['title'];
    const author = book['author'];
    newBook = new Book(title, author);
    myLibrary.push(newBook);

    newBookDialog.hidePopover();
    clearForm();

    const booksContainer = document.querySelector("div#books-container");
    const bookCard = createBookCard(newBook);
    booksContainer.appendChild(bookCard);
})

displayBooks()

function clearForm() {
    const formInputs = document.querySelectorAll("input[type='text']");
    for (const input of formInputs) {
        input.value = "";
    }
}

const cancelButton = document.querySelector("#cancel-button");
cancelButton.addEventListener('click', clearForm);