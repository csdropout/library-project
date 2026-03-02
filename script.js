function Book(title, author) {
    this.title = title;
    this.author = author;
    this.id = crypto.randomUUID()
}

const myLibrary = []

myLibrary.push(new Book("The Hobbit", "J.R.R Tolkien"));
// myLibrary.push(new Book("Killing Commendatore", "Murakami"));

function displayBooks() {
    // create/find container or table
    const booksContainer = document.querySelector("div#books-container");

    // loop through library
    for (const book of myLibrary) {
        // create card
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "card")

        // create p element for title
        const title = document.createElement("p");
        title.textContent = book.title;

        // create p element for author
        const author = document.createElement("p");
        author.textContent = book.author;

        // create p element for book id
        const bookId = document.createElement("p");
        bookId.textContent = book.id;

        // add p elements to card
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(bookId);

        // append card to container
        booksContainer.appendChild(bookCard);
    }
}

const displayButton = document.querySelector("button#display-books-button");
displayButton.addEventListener('click', displayBooks)