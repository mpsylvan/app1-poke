let pokemonRepo = (function () {
  let t = [];
  function e(t) {
    let e = $(".modal-body"),
      n = $(".modal-title");
    n.empty(), e.empty();
    let o = $(`<h1> ${t.name} </h1>`),
      a = $('<img class="modal-img">');
    a.attr("src", t.frontImageUrl),
      a.attr("alt", `cartoon image of ${t.name} pokemon`);
    let i = $('<img class="modal-img">');
    i.attr("src", t.backImageUrl),
      i.attr("alt", `cartoon image of ${t.name} pokemon`);
    let l = $(`<p> height: ${t.height}</p>`),
      p = $(`<p> weight: ${t.weight}</p>`),
      s = $("<p>abilities:  </p>");
    t.abilities.forEach((t) => {
      s.append(`/${t.ability.name}/ `);
    }),
      n.append(o),
      e.append(a),
      e.append(i),
      e.append(l),
      e.append(p),
      e.append(s);
  }
  function n(t) {
    return fetch(t.detailsUrl)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.frontImageUrl = e.sprites.front_default),
          (t.backImageUrl = e.sprites.back_default),
          (t.height = e.height),
          (t.types = e.types),
          (t.moves = e.moves),
          (t.weight = e.weight),
          (t.abilities = e.abilities);
      })
      .catch(function (t) {
        console.log(t);
      });
  }
  function o(e) {
    t.push(e);
  }
  return {
    add: o,
    getAll: function e() {
      return t.length < 1 ? "List is empty" : t;
    },
    addListItem: function t(o) {
      let a = $(".poke-list"),
        i = $('<li class="list-group-item"</li>'),
        l = $(
          `<button type ="button" role=button class="btn-sm btn-primary" data-toggle="modal" data-target="#pokeModal">${o.name}</button>`
        );
      l.addClass("poke-btn"),
        i.append(l),
        a.append(i),
        l.on("click", () => {
          !(function t(o) {
            n(o).then(function () {
              console.log(o), e(o);
            });
          })(o);
        });
    },
    loadList: function t() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            o({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.log(t);
        });
    },
    loadDetails: n,
    showModal: e,
  };
})();
pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (t) {
    pokemonRepo.addListItem(t);
  });
});
