
const result = document.getElementById("pokemon-result");
const searchInput = document.getElementById("pokemon-search");
const searchButton = document.getElementById("search-btn");

function fetchPokemonData() {
  const pokemonName = searchInput.value.trim().toLowerCase();

  if (pokemonName === "") {
    result.innerHTML = "<p style='color:red;'>Please enter a Pokemon name!</p>";
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        result.innerHTML = "<p style='color:red;'>Pokemon not found. Try again!</p>";
        return null; 
      }
    })
    .then((data) => {
      if (data) {
        displayPokemon(data);
      }
    })
    .catch(() => {
      result.innerHTML = "<p style='color:red;'>Error! Please try again later.</p>";
    });
}

function displayPokemon(pokemon) {
  const abilities = pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ");

  result.innerHTML = `
    <div class="pokemon-card">
      <h2>${pokemon.name.toUpperCase()}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p><strong>Abilities:</strong> ${abilities}</p>
      <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
    </div>
  `;
}

searchButton.addEventListener("click", fetchPokemonData);

        