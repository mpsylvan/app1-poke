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
  // sample string used to check the format of an objects keys when it tries to be added.
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

  return {
    add: add,
    getAllPokemon: getAllPokemon,
    // exposing the sample string just to get a feel for local vs global.
    sampleString: sampleString,
  };
})();

console.log(pokemonRepo.sampleString);

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

//the IIFE accesses the pokemonList through getAllPokemon and then it calls forEach on the list.
// In the call back function it writes information about each object to the document,
// the information displayed is different depending on it's .height property.
pokemonRepo.getAllPokemon().forEach((pokemon) => {
  document.write(`<hr>`);
  if (pokemon.height > 1.5) {
    document.write(
      `<h3>${pokemon.name}</h3> <p>(height: <span>${pokemon.height}</span>) -- wow that's tall.</p>`
    );
  } else if (pokemon.height < 0.5) {
    document.write(
      `<h3>${pokemon.name}</h3> <p>(height: <span>${pokemon.height}</span>) -- wow that's short.<p>`
    );
  } else {
    document.write(
      `<h3>${pokemon.name}</h3> <p>(height:<span>${pokemon.height}</span>)</p>`
    );
  }
});

// function that takes in a search name parameter, then it filters the pokemonlist checking if any pokemon
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

// Same result but by declaring displayPokemon externally and then
// passing it as the parameter for pokemonRepo.forEach();

// function displayPokemon(pokemon) {
//   document.write(`<hr>`);
//   if (pokemon.height > 1.5) {
//     document.write(
//       `<h3>${pokemon.name}</h3> <p>(height: <span>${pokemon.height}</span>) -- wow that's tall.</p>`
//     );
//   } else if (pokemon.height < 0.5) {
//     document.write(
//       `<h3>${pokemon.name}</h3> <p>(height: <span>${pokemon.height}</span>) -- wow that's short.<p>`
//     );
//   } else {
//     document.write(
//       `<h3>${pokemon.name}</h3> <p>(height:<span>${pokemon.height}</span>)</p>`
//     );
//   }
// }

// pokemonRepo.getAllPokemon().forEach(displayPokemon);
