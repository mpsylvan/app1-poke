// sample data object.
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

pokemonList.forEach((pokemon) => {
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

// Same Output achieved below  by declaring displayPokemon externally and then
// passing it as the parameter for pokemonList.forEach();

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

// pokemonList.forEach(displayPokemon);
