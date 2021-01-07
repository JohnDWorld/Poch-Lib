/* exchange with websevice */

//Declaration of variables
const myBooks = document.getElementById("myBooks");
const submit = document.getElementById("submit");
const hrArray = document.getElementsByTagName("hr");
const hr = hrArray[0];

//Creation of button "Nouveau Livre"
const addNewBook = document.createElement("input");
addNewBook.setAttribute("id", "addNewBook");
addNewBook.setAttribute("type", "button");
addNewBook.setAttribute("value", "Ajouter un Livre");
myBooks.insertBefore(addNewBook, hr);

//Creation of Form
const form = document.createElement("form");
form.setAttribute("method", "post");
form.setAttribute("id", "form");
const title = form.appendChild(document.createElement("div"));
const titleLabel = title.appendChild(document.createElement("label"));
titleLabel.setAttribute("for", "title-search");
titleLabel.textContent = "Titre du Livre";
const titleSearch = title.appendChild(document.createElement("input"));
titleSearch.setAttribute("type", "search");
titleSearch.setAttribute("name", "title-search");
titleSearch.setAttribute("id", "title-search");
titleSearch.setAttribute("placeholder", "Rechercher un titre sur le site ...");
titleSearch.setAttribute("required", "required");
const author = form.appendChild(document.createElement("div"));
const authorLabel = author.appendChild(document.createElement("label"));
authorLabel.setAttribute("for", "author-search");
authorLabel.textContent = "Auteur du Livre";
const authorSearch = author.appendChild(document.createElement("input"));
authorSearch.setAttribute("type", "search");
authorSearch.setAttribute("name", "author-search");
authorSearch.setAttribute("id", "author-search");
authorSearch.setAttribute("placeholder", "Rechercher un auteur sur le site ...");
authorSearch.setAttribute("required", "required");
const search = form.appendChild(document.createElement("input"));
search.setAttribute("type", "submit");
search.setAttribute("id", "submit");
search.setAttribute("value", "Rechercher");
const cancel = form.appendChild(document.createElement("input"));
cancel.setAttribute("type", "reset");
cancel.setAttribute("id", "reset");
cancel.setAttribute("value", "Annuler");
const myAPIKey = "AIzaSyC5yCc8Aehtb-laJgLByQmzVdLKa9imdBs";
let titleSearchByUser;
let authorSearchByUser;

//Action to put form in #myBooks/remove from #myBooks
addNewBook.addEventListener("click", (event) => {
  const formInsert = document.getElementById("form");
  if (formInsert == null) {
    myBooks.insertBefore(form, hr);
  } else {
    myBooks.removeChild(formInsert);
  }
  formInsert = null;
});