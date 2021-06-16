const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook(){
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completeBookshelfList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const id = +new Date();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.querySelector(".msg").checked;
    const book = makeBook("id : " + id, title, "author : " + author, "year : " + year, isComplete);

    const bookObject = composeBookObject(id, title, author, year, isComplete);

    books.push(bookObject);
    if(isComplete){
        completeBookshelfList.append(book)
    }else{
        uncompletedBookList.append(book);
    }

    updatedDataToStorage();
}

function makeBook(id, title, author, year, isComplete){
    const textJudul = document.createElement("h2");
    textJudul.innerHTML = title;
    textJudul.className = "title";

    const textId = document.createElement("p");
    textId.innerHTML = id;
    textId.className = "id";

    const textAuthor = document.createElement("p");
    textAuthor.innerHTML = author;
    textAuthor.className = "author";

    const textYear = document.createElement("p");
    textYear.innerHTML = year;
    textYear.className = "year";

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textJudul,textId,textAuthor,textYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);

    if(isComplete){
        container.append(
            createTrashButton(),
            createUndoButton()
        );
    } else{
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createCheckButton() {
    return createButton("check-button", function(event){
         addBookToCompleted(event.target.parentElement);
    });
}

function addBookToCompleted(bookElement) {
    const textTitle = bookElement.querySelector(".title").innerText;
    const textId = bookElement.querySelector(".id").innerText;
    const textAuthor = bookElement.querySelector(".author").innerText;
    const textYear = bookElement.querySelector(".year").innerText;

    const newBook = makeBook(textId, textTitle, textAuthor, textYear, true);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    listCompleted.append(newBook);
    bookElement.remove();

    updatedDataToStorage();
}

function removeBookFromCompleted(bookElement){

    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);

    books.splice(bookPosition, 1);

    bookElement.remove();

    updatedDataToStorage();
}

function createTrashButton(){
    return createButton("trash-button", function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}

function undoBookFromCompleted(bookElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    
    const textTitle = bookElement.querySelector(".title").innerText;
    const textId = bookElement.querySelector(".id").innerText;
    const textAuthor = bookElement.querySelector(".author").innerText;
    const textYear = bookElement.querySelector(".year").innerText;
    
    const newBook = makeBook(textId, textTitle, textAuthor, textYear, false);

    listUncompleted.append(newBook);
    bookElement.remove()

    updatedDataToStorage();
}

function createUndoButton(){
    return createButton("undo-button", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}