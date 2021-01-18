/* exchange with websevice */
//Function to create resultblock
const resultBlockFunction = (response, iconToUse) => {
  const resultBlock = document.createElement("div");
  resultBlock.setAttribute("class", "result-block");
  const titleAndIcon = resultBlock.appendChild(document.createElement("div"));
  titleAndIcon.setAttribute("class", "entete-block");
  const titleResult = titleAndIcon.appendChild(document.createElement("h3"));
  titleResult.setAttribute("class", "title-result");
  titleResult.textContent = "Titre: " + response.volumeInfo.title;
  const icon = titleAndIcon.appendChild(document.createElement("img"));
  icon.setAttribute("class", "icon-result");
  icon.setAttribute("src", iconToUse);
  if(iconToUse == iconBookmark) {
    //Add to my poch'list
    icon.addEventListener("click", (event) => {
      let checkBook = false;
      //Check if a book exist in my poch list
      for(let i=0; i<sessionStorage.length; i++){
        if(response.volumeInfo.industryIdentifiers[0].identifier == sessionStorage.key(i)){
          checkBook = true;
        }
      };
      //Add the book to my poch list or alert user that he already has the book
      if(checkBook) {
        alert("Vous ne pouvez ajouter deux fois le même livre");
      } else {
        const resultBlockToSave = resultBlockFunction(response, iconTrash);
        const resultBlockToSave_JSON = JSON.stringify(response);
        sessionStorage.setItem(response.volumeInfo.industryIdentifiers[0].identifier, resultBlockToSave_JSON);
        containerSave.appendChild(resultBlockToSave);
      }
    });
  } else if(iconToUse == iconTrash) {
    //Remove from my poch'list
    icon.addEventListener("click", (event) => {
      const iconParent = icon.parentElement;
      const iconParentToRemove = iconParent.parentElement;
      iconParentToRemove.remove();
      sessionStorage.removeItem(response.volumeInfo.industryIdentifiers[0].identifier);
    })
  }
  const authorResult = resultBlock.appendChild(document.createElement("h3"));
  authorResult.setAttribute("class", "author-result");
  authorResult.textContent = "Auteur: " + response.volumeInfo.authors[0];//author[0] to use the first author of response
  const id = resultBlock.appendChild(document.createElement("h4"));
  id.setAttribute("id", response.volumeInfo.industryIdentifiers[0].identifier);
  id.textContent = "Identifiant: " + response.volumeInfo.industryIdentifiers[0].identifier;
  const description = resultBlock.appendChild(document.createElement("p"));
  description.setAttribute("class", "description-result");
  description.setAttribute("maxlength", "200");
  //Check if they are a description
  if(response.volumeInfo.description == undefined) {
    description.textContent = "Description: Information manquante";
  } else {
    description.textContent = "Description: " + response.volumeInfo.description.substr(0, 200) + "...";
  }
  const picture = resultBlock.appendChild(document.createElement("img"));
  picture.setAttribute("class", "picture-result");
  //Check if they are a picture's link
  if(response.volumeInfo.imageLinks == undefined) {
    picture.setAttribute("src", "./image/unavailable.png");
  } else {
    picture.setAttribute("src", response.volumeInfo.imageLinks.thumbnail);
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
const iconBookmark = "./image/bookmark.svg";
const iconTrash = "./image/trash.svg";
const containerSave = myPochLib.appendChild(document.createElement("div"));
containerSave.setAttribute("id", "containerSave");
let hr = hrList[0];
let request = new XMLHttpRequest();
let titleSearchByUser = "";
let authorSearchByUser = "";

//Restor session storage
if(sessionStorage.length != 0){
  for(let i=0; i<sessionStorage.length; i++){
    let resultBlockToRestor_JSON = sessionStorage.getItem(sessionStorage.key(i));
    let resultBlockToRestor = JSON.parse(resultBlockToRestor_JSON);
    containerSave.appendChild(resultBlockFunction(resultBlockToRestor, iconTrash));
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
const titleLabel = form.appendChild(document.createElement("label"));
titleLabel.setAttribute("for", "title-search");
titleLabel.textContent = "Titre du Livre";
const titleSearch = form.appendChild(document.createElement("input"));
titleSearch.setAttribute("type", "search");
titleSearch.setAttribute("name", "title-search");
titleSearch.setAttribute("id", "title-search");
titleSearch.setAttribute("placeholder", "Rechercher un titre ...");
titleSearch.setAttribute("required", "required");
const authorLabel = form.appendChild(document.createElement("label"));
authorLabel.setAttribute("for", "author-search");
authorLabel.textContent = "Auteur";
const authorSearch = form.appendChild(document.createElement("input"));
authorSearch.setAttribute("type", "search");
authorSearch.setAttribute("name", "author-search");
authorSearch.setAttribute("id", "author-search");
authorSearch.setAttribute("placeholder", "Rechercher un auteur ...");
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
const containerResearch = result.appendChild(document.createElement("div"));
containerResearch.setAttribute("id", "containerResearch");


//Action to put form in #myBooks/remove from #myBooks
addNewBook.addEventListener("click", (event) => {
  const formInsert = document.getElementById("form");
  addNewBook.insertAfter(form);
  myBooks.removeChild(addNewBook);
});

//Action to grab the entry of user
titleSearch.addEventListener("change", (event) => {
  titleSearchByUser = event.target.value;
});
authorSearch.addEventListener("change", (event) => {
  authorSearchByUser = event.target.value;
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
      if(response.items == undefined){
        header.textContent = "Aucun livre n’a été trouvé";
      } else {
        header.textContent = "Resultat de la recherche";
        for(let i=0; i<response.items.length; i++) {
          containerResearch.appendChild(resultBlockFunction(response.items[i], iconBookmark));
        }
      }
    }
  };
  request.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + titleSearchByUser + "&+inautor:" + 
    authorSearchByUser + "&startIndex=0&maxResults=24&key=" + myAPIKey);
  request.send();

  //Check if the user write something and insert the result
  if(titleSearchByUser != "" && authorSearchByUser != "") {
    myBooks.insertBefore(result, hr);
  } else {
    alert("Vous devez entrer un titre et un auteur pour la recherche");
  }
event.preventDefault();
});

// Remove the result
cancel.addEventListener("click", (event) => {
  const h2 = document.getElementsByClassName("h2");
  h2[0].insertAfter(addNewBook);
  let resutBlockExist = document.querySelector("#result .result-block");
  let resultExist = document.getElementById("result");
  let formInsert = document.getElementById("form");
  if(resutBlockExist == null || resutBlockExist != null && resultExist != null && formInsert != null) {
    formInsert.remove();
    resultExist.remove();
  }
  
});