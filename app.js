// HTML Elementlerini Seçme
const container = document.getElementById("pokemon-container");
const caughtList = document.getElementById("caught-list");
const searchButton = document.getElementById("search-btn");
const randomButton = document.getElementById("random-btn");
const clearButton = document.getElementById("clear-btn");
const allButton = document.getElementById("all-btn");
const playButton = document.getElementById("play-btn");
const searchInput = document.getElementById("pokemon-search");
const caughtPokemonContainer = document.getElementById("caught-pokemon-container");

// Konfeti için kütüphane ekleme
const confettiScript = document.createElement("script");
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti";
document.body.appendChild(confettiScript);

let totalPokemons = 10; // Play veya All butonu ile oluşturulacak Pokémon sayısı
let caughtPokemons = 0; // Yakalanan Pokémon sayısını takip eder

// Clear button: Temizleme
clearButton.addEventListener("click", () => {
  container.innerHTML = "";
  caughtList.innerHTML = "";
  caughtPokemonContainer.innerHTML = "";
  caughtPokemons = 0; // Sayaç sıfırlama
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
    displayPokemonCard(data);
  } catch (error) {
    alert(error.message);
  }
});

// Random button: Rastgele bir Pokémon göster
randomButton.addEventListener("click", async () => {
  const randomId = Math.floor(Math.random() * 1010) + 1;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    container.innerHTML = "";
    displayPokemonCard(data);
  } catch (error) {
    console.error("Error fetching random Pokémon:", error);
  }
});

// All Pokémon button: Rastgele 10 Pokémon göster
allButton.addEventListener("click", fetchAllPokemons);

async function fetchAllPokemons() {
  container.innerHTML = "";
  caughtPokemons = 0; // Sayaç sıfırlama
  for (let i = 0; i < totalPokemons; i++) {
    const id = Math.floor(Math.random() * 1010) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    displayPokemonCard(data);
  }
}

// Play button: Pokémonların rastgele hareket etmesini sağlar
playButton.addEventListener("click", async () => {
  container.innerHTML = "";
  caughtPokemons = 0; // Sayaç sıfırlama
  for (let i = 0; i < totalPokemons; i++) {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    await createMovingPokemon(randomId);
  }
});

// Rastgele hareket eden Pokémon oluşturucu
async function createMovingPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json();

  const img = document.createElement("img");
  img.src = pokemon.sprites.front_default;
  img.classList.add("pokemon");
  img.title = pokemon.name;

  let x = Math.random() * window.innerWidth * 0.8;
  let y = Math.random() * window.innerHeight * 0.8;

  img.style.position = "absolute";
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;

  container.appendChild(img);

  function movePokemon() {
    x = Math.random() * window.innerWidth * 0.8;
    y = Math.random() * window.innerHeight * 0.8;

    img.style.transition = `all ${Math.random() * 2 + 1}s ease-in-out`;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
  }

  setInterval(movePokemon, 2000);

  img.addEventListener("click", () => {
    addToCaughtList(pokemon.name, pokemon.sprites.front_default);
    img.remove();
  });
}

// Pokémon Kartını Oluşturur
function displayPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");
  card.innerHTML = `
    <h3>${pokemon.name.toUpperCase()}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
  `;

  card.addEventListener("click", () => addToCaughtList(pokemon.name, pokemon.sprites.front_default));
  container.appendChild(card);
}

// Yakalanan Pokémonu listeye ekler
function addToCaughtList(name, imgSrc) {
  caughtPokemons++; // Sayaç artırma
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = name;
  img.classList.add("caught-pokemon-img");

  caughtPokemonContainer.appendChild(img);

  checkAllCaught(); // Tüm Pokémonlar yakalandı mı kontrol et
}

// Tüm Pokémonlar yakalandı mı kontrol eder
function checkAllCaught() {
  if (caughtPokemons === totalPokemons) {
    launchConfetti();
    setTimeout(() => {
      alert("🎉 Congratulations! You caught all Pokémon! 🎉");
    }, 500);
  }
}

// Konfeti Efekti
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}
