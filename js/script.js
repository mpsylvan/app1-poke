let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container"); // global variable for modal holder.

  //Modal Functions
  function showModal(pokemon) {
    modalContainer.classList.add("is-visible");
    modalContainer.innerText = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // create modal elements for the header, paragraph, img url and close modal button.
    let pokemonTitle = document.createElement("h3");
    pokemonTitle.innerText = pokemon.name.toUpperCase();
    pokemonTitle.classList.add("pokemon-title");

    let pElement = document.createElement("p");
    pElement.innerText = `Height: ${pokemon.height} meter`;
    pElement.classList.add("pokemon-data1");

    let pElement2 = document.createElement("p");
    pElement2.innerText = `Type: ${pokemon.types[0].type.name} `;
    pElement2.classList.add("pokemon-data2");

    let pokeImg = document.createElement("img");
    pokeImg.setAttribute("src", pokemon.imageUrl);
    pokeImg.setAttribute("alt", `cartoon image of pokemon ${pokemon.name}`);
    pokeImg.classList.add("poke-img");

    let closeButton = document.createElement("button");
    closeButton.innerText = `x ${pokemon.name}`;
    closeButton.classList.add("close-modal-btn");
    closeButton.addEventListener("click", closeModal);

    // attach the modal elements to the modal div
    modal.appendChild(pElement);
    modal.appendChild(pElement2);
    modal.appendChild(pokemonTitle);
    modal.append(pokeImg);
    modal.appendChild(closeButton);
    // attach the modal div to the modalContainer
    modalContainer.appendChild(modal);
  }

  function closeModal() {
    modalContainer.classList.remove("is-visible");
  }

  function showLoadMessage() {
    let logocontainer = document.querySelector(".logo-container");
    let loadMessage = document.createElement("h4");
    loadMessage.classList.add("load-message");
    loadMessage.innerText = "Loading Data ....";
    logocontainer.appendChild(loadMessage);
  }

  function removeLoadMessage() {
    let logocontainer = document.querySelector(".logo-container");
    let loadMessage = document.querySelector(".load-message");
    logocontainer.removeChild(loadMessage);
  }

  function loadList() {
    showLoadMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setTimeout(() => {
          removeLoadMessage(); // adds each pokemon to the initialized empty pokemonList.
        }, 1000);
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (err) {
        removeLoadMessage();
        console.log(err);
      });
  }

  function loadDetails(item) {
    showLoadMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        setTimeout(() => {
          removeLoadMessage();
        }, 1000);

        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.moves = details.moves;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    if (pokemonList.length < 1) {
      return `List is empty`;
    } else {
      return pokemonList;
    }
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      console.log(pokemon.name);
      showModal(pokemon);
    });
  }

  function addClickEvent(button, pokemon) {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let ul = document.querySelector(".poke-list");
    let li_item = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("poke-btn");
    li_item.appendChild(button);
    ul.appendChild(li_item);
    addClickEvent(button, pokemon);
  }

  // two event listeners that close modal via keydown or clicking outside modal.
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      closeModal();
    }
  });
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});
