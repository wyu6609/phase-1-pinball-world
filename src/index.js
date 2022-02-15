let gameObjStorage;
const uri = "http://localhost:3000/games";
//list container Nodes
const gameListContainer = document.querySelector("#game-list");
//render display Nodes
const gameImageDisplay = document.querySelector("#detail-image");
const gameTitleDisplay = document.querySelector("#detail-title");
const gameHighScoreDisplay = document.querySelector("#detail-high-score");
const highScoreForm = document.querySelector("#high-score-form");
const scoreInputBox = document.querySelector("#score-input");
//submit form eventListener
highScoreForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   console.log(gameObjStorage);
  submitHighScore(gameObjStorage);
  patchRequest(gameObjStorage);
});

//submit btn function
function submitHighScore(gameObjStorage) {
  gameObjStorage.high_score = scoreInputBox.value;
  gameHighScoreDisplay.textContent = gameObjStorage.high_score;
}

//get api
fetch(uri)
  .then((resp) => resp.json())
  .then((data) => {
    iterateThruArray(data);
    renderDisplayInfo(data[0]);
  });
function iterateThruArray(gamesArr) {
  gamesArr.forEach((gameObj) => {
    renderGamesList(gameObj);
  });
}

function renderGamesList(gameObj) {
  let gameTitles = document.createElement("p");
  gameTitles.textContent = `${gameObj.name} (${gameObj.manufacturer_name})`;
  gameListContainer.appendChild(gameTitles);
  gameTitles.addEventListener("click", () => {
    gameObjStorage = gameObj;

    renderDisplayInfo(gameObjStorage);
  });
}

function renderDisplayInfo(gameObj) {
  gameObjStorage = gameObj;
  gameImageDisplay.src = gameObj.image;
  gameTitleDisplay.textContent = gameObj.name;
  gameHighScoreDisplay.textContent = gameObj.high_score;
  //   console.log(gameObjStorage);
}

function patchRequest(gameObjStorage) {
  fetch(`${uri}/${gameObjStorage.id}`, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameObjStorage),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(
        data.name,
        "high_score UPDATED in db.json to ",
        data.high_score
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
