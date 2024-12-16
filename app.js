const container = document.getElementById("pokemon-container");
const caughtList = document.getElementById("caught-list");
const searchButton = document.getElementById("search-btn");
const randomButton = document.getElementById("random-btn");
const clearButton = document.getElementById("clear-btn");
const allButton = document.getElementById("all-btn");
const playButton = document.getElementById("play-btn");
const searchInput = document.getElementById("pokemon-search");

// Clear button: Temizleme
clearButton.addEventListener("click", () => {
  container.innerHTML = ""; 
  caughtList.innerHTML = "";
});

// Search button: Kullanıcının girdiği Pokémon'u göster
searchButton.addEventListener("click", async () => {
  const pokemonName = searchInput.value.trim().toLowerCase();
  if (pokemonName === "") {
    alert("Please enter a Pokémon name!");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) throw new Error("Pokémon not found!");

    const data = await response.json();
    container.innerHTML = ""; // Önceki sonucu temizle
    createPokemonElement(data);
  } catch (error) {
    alert(error.message);
  }
});

// Random button: Rastgele bir Pokémon göster
randomButton.addEventListener("click", async () => {
  const randomId = Math.floor(Math.random() * 1010) + 1; // 1-1010 arasında rastgele ID
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    container.innerHTML = ""; // Önceki sonucu temizle
    createPokemonElement(data);
  } catch (error) {
    console.error("Error fetching random Pokémon:", error);
  }
});

// All Pokémon button: Rastgele 10 Pokémon göster
allButton.addEventListener("click", fetchAllPokemons);

async function fetchAllPokemons() {
  container.innerHTML = ""; // Öncekileri temizle
  for (let i = 0; i < 10; i++) {
    const id = Math.floor(Math.random() * 1010) + 1; // Rastgele ID
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    createPokemonElement(data);
  }
}

// Play button: Pokémonların hareket etmesini sağlar
playButton.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    createMovingPokemon(randomId);
  }
});

// Pokémon Eleman Oluşturucu (hareketsiz)
function createPokemonElement(pokemon) {
  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;
  img.classList.add("pokemon");
  img.title = pokemon.name;

  img.addEventListener("click", () => addToCaughtList(pokemon.name));
  container.appendChild(img);
}

// Rastgele hareket eden Pokémon oluşturucu
function createMovingPokemon(id) {
  const img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  img.classList.add("pokemon");

  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  const animationTime = Math.random() * 3 + 2; // 2-5 saniye
  const easing = Math.random() > 0.5 ? "ease-in" : "ease-out";

  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  img.style.transition = `all ${animationTime}s ${easing}`;

  container.appendChild(img);

  setInterval(() => {
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
  }, animationTime * 1000);

  img.addEventListener("click", () => {
    addToCaughtList(`Pokémon ID: ${id}`);
    img.remove();
  });
}

// Yakalanan Pokémonu listeye ekler
function addToCaughtList(name) {
  const listItem = document.createElement("li");
  listItem.textContent = name;
  caughtList.appendChild(listItem);
}
