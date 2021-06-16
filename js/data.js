const STORAGE_KEY = "BOOKSHELF_APPS";

let books = []

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser tidak mendukung local storage");
        return false;
    } else{
        return true;
    }
}

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data !== null){
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function updatedDataToStorage(){
    if(isStorageExist()){
        saveData();
    }
}

function composeBookObject(id, title, author, year, isComplete){
    return {
        id: id,
        title,
        author,
        year,
        isComplete
    };
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId){
            return book;
        }
    }

    return null;
}

function findBookIndex(bookId){
    let index = 0;

    for(book of books){
        if(book.id === bookId){
            return index;
        }
        index++;
    }

    return -1;
}

function refreshDataFromBooks(){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for(book of books){
        const newBook = makeBook(book.id, book.title, book.author, book.year, book.isComplete);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isComplete){
            listCompleted.append(newBook);
        } else{
            listUncompleted.append(newBook);
        }
    }
}