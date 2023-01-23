// api calls: cards
export function updateCard(card) {
  if (!card.id) {
    alert("No card id! Card doesn't exist.");
    return;
  }

  fetch("/api/card/" + card.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  })
    .then((response) => response)
    .then(
      (response) => handleResponse(response),
      (error) => handleError(error)
    );
}

export function createCard(card) {
  // delete fields that should be empty
  delete card.id;
  delete card.createdAt;

  fetch("/api/card", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  })
    .then((response) => response)
    .then(
      (response) => handleResponse(response),
      (error) => handleError(error)
    );
}

export function deleteCard(cardId) {
  fetch("/api/card/" + cardId, { method: "DELETE" })
    .then((response) => response)
    .then(
      (response) => handleResponse(response),
      (error) => handleError(error)
    );
}

export function loadCards(setState) {
  fetch("/api/card")
    .then((response) => response.json())
    .then(
      (response) => {
        setState(response);
      },
      (error) => {
        alert(error);
        console.log("error:", error);
        return [];
      }
    );
}

export const cardsApi = {
  loadCardFull: (cardId, setState) => {
    fetch("/api/Card/full/" + cardId)
      .then((response) => response.json())
      .then(
        (response) => {
          setState(response);
        },
        (error) => {
          alert(error);
          console.log("error:", error);
          return [];
        }
      );
  },
};

// api calls: words
export const wordsApi = {
  loadWords: (setState, filter) => {
    fetch("/api/vocabulary?" + new URLSearchParams(filter))
      .then((response) => response.json())
      .then(
        (response) => {
          setState(response);
        },
        (error) => {
          alert(error);
          console.log("error:", error);
        }
      );
  },

  deleteWord: (wordId) => {
    fetch("/api/vocabulary/" + wordId, { method: "DELETE" })
      .then((response) => response)
      .then(
        (response) => handleResponse(response),
        (error) => handleError(error)
      );
  },

  translateWord: (phrase, langFrom, langTo, handle) => {
    console.log("translateWord", phrase, langFrom, langTo);
    fetch(
      `https://api.mymemory.translated.net/get?q=${phrase}&langpair=${langFrom}|${langTo}`
    )
      .then((response) => response.json())
      .then(
        (response) => {
          handle(response);
          handleResponse(response);
        },
        (error) => handleError(error)
      );
  },

  createWord: (word) => {
    // delete fields that should be empty
    delete word.id;
    delete word.createdAt;

    fetch("/api/vocabulary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(word),
    })
      .then((response) => response)
      .then(
        (response) => handleResponse(response),
        (error) => handleError(error)
      );
  },

  saveLearnStatistic: (wordsStudyResult) => {
    fetch("/api/Vocabulary/saveWordsLearningResults", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wordsStudyResult),
    })
      .then((response) => response)
      .then(
        (response) => handleResponse(response),
        (error) => handleError(error)
      );
  },

  updateWord: (word) => {
    if (!word.id) {
      alert("No word id! Word doesn't exist.");
      return;
    }

    fetch("/api/vocabulary/" + word.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(word),
    })
      .then((response) => response)
      .then(
        (response) => handleResponse(response),
        (error) => handleError(error)
      );
  },
};

// functions-helpers
function handleResponse(response) {
  logResponse(response);
}

function logResponse(response) {
  console.log("response:", response.url, response.status, response.statusText);
  console.log("response:", response.url);
  console.log("status", response.status);
  console.log("status", response.statusText);
}

function handleError(error) {
  alert(error);
  console.log("error:", error);
}
