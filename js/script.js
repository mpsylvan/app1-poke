let pokemonRepo = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $(`<h1> ${item.name} </h1>`);
    // creating front image in modal content.
    let imageElementFront = $(`<img class="modal-img">`);
    imageElementFront.attr("src", item.frontImageUrl);
    //creating reverse image in modal content.
    let imageElementBack = $(`<img class="modal-img">`);
    imageElementBack.attr("src", item.backImageUrl);
    // creating a height/weight/moves datapoint for modal content.
    let heightElement = $(`<p> height: ${item.height}</p>`);
    let weightELement = $(`<p> weight: ${item.weight}</p>`);
    let abilitiesElement = $(`<p>abilities:  </p>`);
    item.abilities.forEach((e) => {
      abilitiesElement.append(`/${e.ability.name}/ `);
    });

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightELement);
    modalBody.append(abilitiesElement);
  }

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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function addListItem(pokemon) {
    // let ul = document.querySelector(".poke-list");
    let query_ul = $(".poke-list");
    let j_li_item = $(`<li class="list-group-item"</li>`);
    let j_button = $(
      `<button type ="button" class="btn-sm btn-primary" data-toggle="modal" data-target="#pokeModal">${pokemon.name}</button>`
    );
    j_button.addClass("poke-btn");
    j_li_item.append(j_button);
    query_ul.append(j_li_item);
    j_button.on("click", () => {
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
