/* exchange with websevice */
//Function to create resultblock
const resultBlockFunction = (response, iconToUse) => {
  const resultBlock = document.createElement("div");
  resultBlock.setAttribute("class", "result-block");
  const titleResult = resultBlock.appendChild(document.createElement("h3"));
  titleResult.setAttribute("class", "title-result");
  titleResult.textContent = "Titre: " + response.volumeInfo.title;
  const authorResult = resultBlock.appendChild(document.createElement("h3"));
  authorResult.setAttribute("class", "author-result");
  authorResult.textContent = "Auteur: " + response.volumeInfo.authors[0];//author[0] to use the first author of response
  const id = resultBlock.appendChild(document.createElement("h4"));
  id.setAttribute("id", response.volumeInfo.industryIdentifiers[0].identifier);
  id.textContent = "Identifiant: " + response.volumeInfo.industryIdentifiers[0].identifier;
  const description = resultBlock.appendChild(document.createElement("p"));
  description.setAttribute("class", "description-result");
  description.setAttribute("maxlength", "200");
  if(response.volumeInfo.description == undefined) {
    description.textContent = "Description: Information manquante";
  } else {
    description.textContent = "Description: " + response.volumeInfo.description;
  }
  const picture = resultBlock.appendChild(document.createElement("img"));
  picture.setAttribute("class", "picture-result");
  if(response.volumeInfo.imageLinks == undefined) {
    picture.setAttribute("src", "./image/unavailable.png");
  } else {
    picture.setAttribute("src", response.volumeInfo.imageLinks.thumbnail);
  }
  const icon = resultBlock.appendChild(document.createElement("img"));
  icon.setAttribute("class", "icon-result");
  icon.setAttribute("src", iconToUse);
  if(iconToUse == iconBookmark) {
    //Add to my poch'list
    icon.addEventListener("click", (event) => {
      let checkBook = false;
      for(let i=0; i<sessionStorage.length; i++){
        if(response.volumeInfo.industryIdentifiers[0].identifier == sessionStorage.key(i)){
          checkBook = true;
        }
      };
      if(checkBook) {
        alert("Vous ne pourvez pass ajouter 2 fois le même livre à votre liste");
      } else {
        const resultBlockToSave = resultBlockFunction(response, iconTrash);
        const resultBlockToSave_JSON = JSON.stringify(response);
        sessionStorage.setItem(response.volumeInfo.industryIdentifiers[0].identifier, resultBlockToSave_JSON);
        myPochLib.appendChild(resultBlockToSave);
      }
      checkBook = null;
    });
  } else if(iconToUse == iconTrash) {
    //Remove from my poch'list
    icon.addEventListener("click", (event) => {
      const iconParentToRemove = icon.parentElement;
      iconParentToRemove.remove();
      sessionStorage.removeItem(response.volumeInfo.industryIdentifiers[0].identifier);
    })
  }
  return resultBlock;
}

//Function to insert after a node
Object.prototype.insertAfter = function (newNode) { this.parentNode.insertBefore(newNode, this.nextSibling); }

//Declaration of variables
const myBooks = document.getElementById("myBooks");
const myPochLib = document.getElementById("content");
const hrList = document.getElementsByTagName("hr");
const myAPIKey = "AIzaSyC5yCc8Aehtb-laJgLByQmzVdLKa9imdBs";
const nbrResultToShow = 4;
const nbrResultToSave = 0;
const iconBookmark = "./image/bookmark.svg";
const iconTrash = "./image/trash.svg";
let hr = hrList[0];
let request = new XMLHttpRequest();
let titleCheck = false;
let authorCheck = false;
let titleSearchByUser;
let authorSearchByUser;
let identifierResult;
let descriptionResult;

//Restor session storage
if(sessionStorage.length != 1){
  for(let i=0; i<sessionStorage.length; i++){
    let resultBlockToRestor_JSON = sessionStorage.getItem(sessionStorage.key(i));
    let resultBlockToRestor = JSON.parse(resultBlockToRestor_JSON);
    myPochLib.appendChild(resultBlockFunction(resultBlockToRestor, iconTrash));
  };
}

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
titleSearch.setAttribute("value", "Twiligh");
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
authorSearch.setAttribute("value", "Stepheni");
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
header.textContent = "Resultat de la recherche";

//Action to put form in #myBooks/remove from #myBooks
addNewBook.addEventListener("click", (event) => {
  const formInsert = document.getElementById("form");
  if (formInsert == null) {
    addNewBook.insertAfter(form);
  } else {
    myBooks.removeChild(formInsert);
  }
});

//Action to grab the entry of user
titleSearch.addEventListener("change", (event) => {
  titleSearchByUser = event.target.value;
  titleCheck = true;
});
authorSearch.addEventListener("input", (event) => {
  authorSearchByUser = event.target.value;
  authorCheck = true;
});

//Action to send/create/remove result
search.addEventListener("click", (event) => {
  //Request GET to Google Book
  request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      // Loop to check existing result
      let resultToRemove = document.querySelector("#result .result-block");
      while(resultToRemove != null) {
        resultToRemove.remove();
        resultToRemove = document.querySelector("#result .result-block");
      }
      
      // Create th result block
      let response = JSON.parse(this.responseText);
      for(let i=0; i<response.items.length; i++) {
        result.appendChild(resultBlockFunction(response.items[i], iconBookmark));
      }
    }
  };
  request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + titleSearchByUser + "&+inautor:" + authorSearchByUser + "&startIndex=0&maxResults=5&key=" + myAPIKey);
  request.send();

  //Check if the user write something and insert the result
  if(titleCheck && authorCheck) {
    myBooks.insertBefore(result, hr);
    titleCheck = false;
    authorCheck = false;
  }
  event.preventDefault();
});

// Remove the result
cancel.addEventListener("click", (event) => {
  let resutBlockExist = document.querySelector("#result .result-block");
  let resultExist = document.getElementById("result");
  let formInsert = document.getElementById("form");
  if(resutBlockExist != null && resultExist != null) {
    while (resutBlockExist[0] != null) {
      resutBlockExist[0].remove();
    };
    resultExist.remove();
  }
  if (formInsert != null && resultExist == null) {
    formInsert.remove();
  }
  resutBlockExist = null;
  resultExist = null;
  formInsert = null;
});