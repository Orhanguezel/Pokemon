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

let totalPokemons = 10; 
let caughtPokemons = 0;

// Clear button: Temizleme
clearButton.addEventListener("click", () => {
  container.innerHTML = "";
  caughtList.innerHTML = "";
  caughtPokemonContainer.innerHTML = "";
  caughtPokemons = 0; 
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
    container.innerHTML = ""; 
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
  caughtPokemons = 0;
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

  let x = Math.random() * window.innerWidth * 0.9;
  let y = Math.random() * window.innerHeight * 0.9;

  img.style.position = "absolute";
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;

  container.appendChild(img);

  function movePokemon() {
    x = Math.random() * window.innerWidth * 0.9;
    y = Math.random() * window.innerHeight * 0.9;

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

// Pokémon Kartını Oluşturur ve Sesi Oynatır
function displayPokemonCard(pokemon) {
  const abilities = pokemon.abilities.map((ability) => ability.ability.name).join(", ");
  const types = pokemon.types.map((type) => type.type.name).join(", ");
  const stats = pokemon.stats
    .map((stat) => `<p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>`)
    .join("");

  // Pokémon cry (ses) dosyasının URL'si
  const pokemonCry = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;

  // Kart oluştur
  const card = document.createElement("div");
  card.classList.add("pokemon-card");
  card.innerHTML = `
    <h3>${pokemon.name.toUpperCase()}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Type:</strong> ${types}</p>
    <p><strong>Abilities:</strong> ${abilities}</p>
    ${stats}
    <audio controls autoplay>
      <source src="${pokemonCry}" type="audio/ogg">
      Your browser does not support the audio element.
    </audio>
  `;

  // Kartı ekrana yerleştir
  container.appendChild(card);
}

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
    container.innerHTML = "";
    displayPokemonCard(data); 
  } catch (error) {
    alert(error.message);
  }
});




// Yakalanan Pokémonu üst kutuya ekler ve sesi çalar
function addToCaughtList(name, imgSrc) {

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = name;
  img.classList.add("caught-pokemon-img");

  caughtPokemonContainer.appendChild(img);

  // Pokémon'un sesini çalma
  playPokemonCry(name);

  caughtPokemons++;
  checkAllCaught(); 
}


// Ses oynatma fonksiyonu
function playPokemonCry(pokemonName) {

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then((response) => response.json())
    .then((data) => {
      const pokemonId = data.id;
      const audio = new Audio(
        `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`
      );
      audio.play();
    })
    .catch((error) => console.error("Error fetching Pokémon cry:", error));
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
