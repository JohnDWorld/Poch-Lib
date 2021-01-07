/* exchange with websevice */

//Declaration of variables
const myBooks = document.getElementById("myBooks");
const hrArray = document.getElementsByTagName("hr");
const hr = hrArray[0];
const myAPIKey = "AIzaSyC5yCc8Aehtb-laJgLByQmzVdLKa9imdBs";
let titleCheck = false;
let authorCheck = false;
let titleSearchByUser;
let authorSearchByUser;
let identifierResult;
let descriptionResult;

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

//Creation of result block
const result = document.createElement("div");
result.setAttribute("id", "result");
const seperation = result.appendChild(document.createElement("hr"));
const header = result.appendChild(document.createElement("h2"));
header.setAttribute("id", "header-result");
header.textContent = "Resultat de la recherche"
const resultBlock = result.appendChild(document.createElement("div"));
resultBlock.setAttribute("class", "result-block")
const titleResult = resultBlock.appendChild(document.createElement("h3"));
titleResult.setAttribute("class", "title-result");
titleResult.textContent = "Titre: " + titleSearchByUser;
const authorResult = resultBlock.appendChild(document.createElement("h3"));
authorResult.setAttribute("class", "author-result");
authorResult.textContent = "Auteur: " + authorSearchByUser;
const id = resultBlock.appendChild(document.createElement("h4"));
id.setAttribute("class", "identifier-result");
id.textContent = "Identifiant: " + identifierResult;
const description = resultBlock.appendChild(document.createElement("p"));
description.setAttribute("class", "description-result");
description.setAttribute("maxlength", "200");
description.textContent = "Description: " + descriptionResult;
const icon = resultBlock.appendChild(document.createElement("img"));
icon.setAttribute("class", "icon-result");
icon.setAttribute("src", "./image/bookmark.svg");
const picture = resultBlock.appendChild(document.createElement("img"));
picture.setAttribute("class", "picture-result");
picture.setAttribute("src", "");

//Action to put form in #myBooks/remove from #myBooks
addNewBook.addEventListener("click", (event) => {
  let formInsert = document.getElementById("form");
  if (formInsert == null) {
    myBooks.insertBefore(form, hr);
  } else {
    myBooks.removeChild(formInsert);
  }
  formInsert = null;
});

//Action to put result in #myBooks/remove from #myBooks
titleSearch.addEventListener("change", (event) => {
  titleSearchByUser = event.target.value;
  titleCheck = true;
});
authorSearch.addEventListener("change", (event) => {
  authorSearchByUser = event.target.value;
  authorCheck = true;
});
search.addEventListener("click", (event) => {
  if(titleCheck && authorCheck) {
    myBooks.insertBefore(result, hr);
    titleCheck = false;
    authorCheck = false;
  }
  event.preventDefault();
});
cancel.addEventListener("click", (event) => {
  myBooks.removeChild(result);
  titleCheck = false;
  authorCheck = false;
});