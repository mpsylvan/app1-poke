let pokemonRepo = (function () {
  let t = [],
    e = $("#search-pokemon"),
    n = $(".search-button"),
    o = $(".reset-button");
  function a() {
    let n = e.val().toLowerCase();
    if (n.length < 1) {
      alert("no text entered");
      return;
    }
    let o = t.filter((t) => t.name.includes(n));
    $(".poke-list").empty().addClass("search"),
      o.forEach((t) => {
        r(t);
      }),
      $("label").empty().append(`${o.length} results.`);
  }
  function i(t) {
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
      r = $("<p>abilities:  </p>");
    t.abilities.forEach((t) => {
      r.append(`${t.ability.name} `);
    }),
      n.append(o),
      e.append(a),
      e.append(i),
      e.append(l),
      e.append(p),
      e.append(r);
  }
  function l(t) {
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
  function p(e) {
    t.push(e);
  }
  function r(t) {
    let e = $(".poke-list"),
      n = $('<li class="list-group-item"</li>'),
      o = $(
        `<button type ="button" role=button class="btn-sm btn-primary" data-toggle="modal" data-target="#pokeModal">${t.name}</button>`
      );
    o.addClass("poke-btn"),
      n.append(o),
      e.append(n),
      o.on("click", () => {
        !(function t(e) {
          l(e).then(function () {
            console.log(e), i(e);
          });
        })(t);
      });
  }
  return (
    n.on("click", a),
    window.addEventListener("keydown", (t) => {
      "Enter" === t.key && e.val().length > 0 && a();
    }),
    o.on("click", () => {
      t.forEach((t) => {
        r(t), $("label").empty().append("Search For Pokemon");
      });
    }),
    {
      add: p,
      getAll: function e() {
        return t.length < 1 ? "List is empty" : t;
      },
      addListItem: r,
      loadList: function t() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              p({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function (t) {
            console.log(t);
          });
      },
      loadDetails: l,
      showModal: i,
    }
  );
})();
pokemonRepo.loadList().then(function () {
  pokemonRepo.getAll().forEach(function (t) {
    pokemonRepo.addListItem(t);
  });
});
