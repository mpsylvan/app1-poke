// wraps pokemonList in an IIFE to constrict it's global access.
// the list is only accessible through the two methods returned in the object.
let pokemonRepo = (function () {
  let pokemonList = [
    {
      name: "Noctowl",
      height: 1.4,
      attackType: ["Normal", "Flying"],
      doubleDamage: ["Ice", "Electric", "Rock"],
    },
    {
      name: "Typhlosion",
      height: 1.7,
      attackType: ["Fire"],
      doubleDamage: ["Water", "Rock", "Ground"],
    },
    {
      name: "Houndoom",
      height: 1.4,
      attackType: ["Dark", "Fire"],
      doubleDamage: ["Bug", "Fighting", "Water", "Rock", "Ground"],
    },
    {
      name: "Meowth",
      height: 0.4,
      attackType: ["Normal"],
      doubleDamage: ["Fighting"],
    },
    {
      name: "Vileplume",
      height: 1.2,
      attackType: ["Grass", "Poison"],
      doubleDamage: ["Ice", "Fire", "Flying", "Psychic", "Ground"],
    },
  ];
  let sampleString = Object.keys({
    name: "",
    height: "",
    attackType: "",
    doubleDamage: "",
  }).join();

  //function to add new pokemon to the list, it first checks if the argument is of type object.
  // if it fails it displays message to console. Then it check if the argumemt properties are
  // in the correct format by the keys against a sampleString.
  // if it fails, it displays message to the console with the required format.
  function add(pokemon) {
    if (typeof pokemon !== "object") {
      console.log(`New Pokemon must be an 'object'`);
    } else {
      if (Object.keys(pokemon).join() === sampleString) {
        pokemonList.push(pokemon);
      } else {
        console.log(
          `New Pokemon must have this key structure: ${sampleString}`
        );
      }
    }
  }

  //function to return the state of the list, if list is empty it console logs it's empty.
  function getAllPokemon() {
    if (pokemonList.length < 1) {
      return `List is empty`;
    } else {
      return pokemonList;
    }
  }
  // display pokemon object to the console.
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // BONUS task,  create a function that handles event listener outside of addListItem()
  function addClickEvent(button, pokemon) {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  // function to:
  //    1) create a new li > button for the pokemon object passed in
  //    2) attach the li > button to the ul list.
  //    3) add a click event to button that displays pokemon to console using showDetails()
  function addListItem(pokemon) {
    let ul = document.querySelector(".poke-list");
    let li_item = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("poke-btn");
    li_item.appendChild(button);
    ul.appendChild(li_item);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
    addClickEvent(button, pokemon); // Bonus Task adds the event listener via separate function.
  }

  return {
    add: add,
    getAllPokemon: getAllPokemon,
    // exposing the sample string just to get a feel for local vs global.
    addListItem: addListItem,
    sampleString: sampleString,
  };
})();

//testing the validation for specific object property format.
pokemonRepo.add(1); // fails because it's number.
pokemonRepo.add({ name: "charzard" }); //fails because it doesn't match the samplestring
pokemonRepo.add("charzard"); // fails because it's string.

//Validated added objects testing.
pokemonRepo.add({
  name: "Mewtoo",
  height: 0.8,
  attackType: ["Fire", "Psychic"],
  doubleDamage: ["Water", "Electric"],
});

pokemonRepo.add({
  name: "mewtoo",
  height: 0.4,
  attackType: ["Electric"],
  doubleDamage: ["Water", "Psychic"],
});

pokemonRepo.add({
  name: "Pikachu",
  height: 0.4,
  attackType: ["Electric"],
  doubleDamage: ["Water", "Psychic"],
});

pokemonRepo.add({
  name: "Dog",
  height: 1.0,
  attackType: ["Normal"],
  doubleDamage: ["Fire", "Psychic"],
});

// For each pokemon

pokemonRepo.getAllPokemon().forEach((pokemon) => {
  pokemonRepo.addListItem(pokemon);
});

// Bonus Task: function that takes in a search name parameter, then it filters the pokemonlist checking if any pokemon
//have the name in lower case matching the searchName in lower case.
//if search was successful it stores the search as result, if not it passes a string result saying no match.

function getAPokemon(searchName) {
  let search = pokemonRepo
    .getAllPokemon()
    .filter(
      (pokemon) => pokemon.name.toLowerCase() === searchName.toLowerCase()
    );
  let result = search.length > 0 ? search : `no Pokemon named ${searchName}`;
  console.log(result);
}

getAPokemon("noctowl"); // success
getAPokemon("Michael"); // fail
getAPokemon("mewtoo"); // success with 2 results.
