const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const createPokemonLiTag = (pokemonData) => {
  return `<li>${pokemonData.nickname} (${pokemonData.species}) <button class="release" data-pokemon-id="${pokemonData.id}">Release</button></li>`
}

const createTrainerCardHTML = (trainerData) => {
  return `<div class="card" data-id="${trainerData.id}"><p>${trainerData.name}</p>
    <button class="add" data-trainer-id="${trainerData.id}">Add Pokemon</button>
    <ul class="poke-list">
      <!-- pokemon should go in here -->
    </ul>
    </div>`
}

const trainerMainTag = document.querySelector('main');

fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainersArray => {
  trainersArray.forEach((trainer) => {
    // console.log(trainer)
    trainerMainTag.innerHTML += createTrainerCardHTML(trainer)
    const pokemonUlTag = trainerMainTag.lastChild.querySelector('ul');
    trainer.pokemons.forEach(pokemon => {
      pokemonUlTag.innerHTML += createPokemonLiTag(pokemon)
    })
  })
})

// Whenever a user hits Add Pokemon and they have space on their team, they should get a new Pokemon.

trainerMainTag.addEventListener('click', event => {
  // if (event.target.tagName === 'BUTTON') {
  if (event.target.className === 'add') {
    console.log(event.target)
    const pokemonListLength = event.target.parentElement.querySelectorAll('ul li').length
    const trainerIdNumber = parseInt(event.target.dataset.trainerId);
    const ulTag = event.target.parentElement.querySelector('ul');
    // console.log(trainerId)
    if (pokemonListLength < 6) {
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          trainer_id: trainerIdNumber
        })
      })
      .then(response => response.json())
      .then(newPokemonData => {
        ulTag.innerHTML += createPokemonLiTag(newPokemonData)
      })
    } else {
      alert('your party is full!')
    }
  } else if (event.target.className === 'release') {
    const pokemonId = event.target.dataset.pokemonId
    // removes it from the dom
    event.target.parentElement.remove()
    // removes it from the db
    fetch(`${POKEMONS_URL}/${pokemonId}`,{
      method: 'DELETE'
    })
  }
    // if ul length is less than 6
    // then create a pokemon and add it to the team

    // ? how do we get our pokemon and add it ???

    // #=> Example Request
    // POST /pokemons
    //
    // Required Headers:
    // {
    //   'Content-Type': 'application/json'
    // }
    //
    // Required Body:
    // {
    //   trainer_id: 1
    // }
    //
    // #=> Example Response
    // {
    //   "id":147,
    //   "nickname":"Gunnar",
    //   "species":"Weepinbell",
    //   "trainer_id":1
    // }
  // }
})
