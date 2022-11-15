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
/*
  for loop that goes over every pokemon object in the pokemonList, checks it's height property against a 1.5 threshold using an if statement, and displays special info 
  if the height threshold is met, or generic info if threshold is not met. It makes an h3
  element of the poke name and p element of the height info. 
*/
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.5) {
    document.write(`<hr>`);
    document.write(
      `<h3>${pokemonList[i].name}</h3> <p>(height: <span>${pokemonList[i].height}</span>) -- wow that's tall.</p>`
    );
  } else if (pokemonList[i].height < 0.5) {
    document.write(`<hr>`);
    document.write(
      `<h3>${pokemonList[i].name}</h3> <p>(height: <span>${pokemonList[i].height}</span>) -- wow that's short.<p>`
    );
  } else {
    document.write(`<hr>`);
    document.write(
      `<h3>${pokemonList[i].name}</h3> <p>(height:<span>${pokemonList[i].height}</span>)</p>`
    );
  }
}
