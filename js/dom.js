const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";

function addBook(){
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completeBookshelfList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const id = +new Date();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.querySelector(".msg").checked;
    const book = makeBook(id, title, author, year);

    if(isComplete){
        completeBookshelfList.append(book)
    }else{
        uncompletedBookList.append(book);
    }
}

function makeBook(id, title, author, year){
    const textJudul = document.createElement("h2");
    textJudul.innerHTML = title;

    const textId = document.createElement("p");
    textId.innerHTML = "id: " + id;

    const textAuthor = document.createElement("p");
    textAuthor.innerHTML = "author: " + author;

    const textYear = document.createElement("p");
    textYear.innerHTML = "year: " + year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textJudul,textId,textAuthor,textYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);

    return container;
}