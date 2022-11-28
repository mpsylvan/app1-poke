let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // function used to populate bootstrap modal component
  // created in html document. Get's called when a pokemon button
  // is clicked with that particular pokemon passed in as the data object.
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $(`<h1> ${item.name} </h1>`);
    // creating front image for modal content.
    let imageElementFront = $(`<img class="modal-img">`);
    imageElementFront.attr("src", item.frontImageUrl);
    imageElementFront.attr("alt", `cartoon image of ${item.name} pokemon`);
    //creating reverse image element for modal content.
    let imageElementBack = $(`<img class="modal-img">`);
    imageElementBack.attr("src", item.backImageUrl);
    imageElementBack.attr("alt", `cartoon image of ${item.name} pokemon`);
    // creating height/weight/moves datapoint for modal content.
    let heightElement = $(`<p> height: ${item.height}</p>`);
    let weightELement = $(`<p> weight: ${item.weight}</p>`);
    let abilitiesElement = $(`<p>abilities:  </p>`);
    // loops over the abilities array and appends n entries to the element.
    item.abilities.forEach((e) => {
      abilitiesElement.append(`/${e.ability.name}/ `);
    });
    // appends all of the populated elements to their parent containers (modal-header and modal-body);
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightELement);
    modalBody.append(abilitiesElement);
  }

  // fetches json array of pokemon objects form pokeAPI, chains promises for accessing API, receiving the json and parsing it.
  // for each object in the array it constructs a pokemon object built with a name property and a url to an individual pokemon details page.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // function that gets added to every pokemon in .poke-list,
  // it takes the pokemon objected loaded in and acesses it's specific details url
  // making variables from specific data points and sprite.pngs.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.frontImageUrl = details.sprites.front_default;
        item.backImageUrl = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types;
        item.moves = details.moves;
        item.weight = details.weight;
        item.abilities = details.abilities;
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
  // function that calls asynchronous loadDetails to access the specfic pokemon page, and then resolves  by logging the pokemon
  // and displaying the modal with the pokemon data needed to fill the modal accessible.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  // creates an html list item for each pokemon that is in the pokemon array using jquery and bootstrap syntax,
  //adds each element to the parent bootstrap ul, and attaches a click event that calls showDetails which includes
  // a display of clicked pokemon to console, and populates an info modal.
  function addListItem(pokemon) {
    // let ul = document.querySelector(".poke-list");
    let ul = $(".poke-list");
    let li_item = $(`<li class="list-group-item"</li>`);
    let button = $(
      `<button type ="button" role=button class="btn-sm btn-primary" data-toggle="modal" data-target="#pokeModal">${pokemon.name}</button>`
    );
    button.addClass("poke-btn");
    li_item.append(button);
    ul.append(li_item);
    button.on("click", () => {
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});
