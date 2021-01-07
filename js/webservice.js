/* exchange with websevice */
const form = (elementParent, element) => {
  const form = elementParent.insertBefore(document.createElement("form"), element);
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
  search.addEventListener("click", (event) => {
  	event.preventDefault();
  });
  
  const cancel = form.appendChild(document.createElement("input"));
  cancel.setAttribute("type", "reset");
  cancel.setAttribute("id", "reset");
  cancel.setAttribute("value", "Annuler");  
  cancel.addEventListener("click", (event) => {
    elementParent.removeChild(document.getElementsByTagName("form")[0]);
  });
}

const myBooks = document.getElementById("myBooks");
let loop = true;
const hrArray = document.getElementsByTagName("hr");
const hr = hrArray[0];
const addNewBook = document.createElement("input");
addNewBook.setAttribute("id", "addNewBook");
addNewBook.setAttribute("type", "button");
addNewBook.setAttribute("value", "Ajouter un Livre");
myBooks.insertBefore(addNewBook, hr);

addNewBook.addEventListener("click", (event) => {
  const formExisting = document.getElementById("form");
  if (formExisting == null) {
    form(myBooks, hr);
  } else {
    event.preventDefault();
  }
});