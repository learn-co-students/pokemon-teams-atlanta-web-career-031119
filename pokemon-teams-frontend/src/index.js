const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {

      getTrainersData(TRAINERS_URL)
})

function getTrainersData(TRAINERS_URL) {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => addAllTrainers(trainers))
}

function addAllTrainers(trainers){
  trainers.forEach(trainer => addTrainer(trainer))
}

function addTrainer(trainer){
  const trainerList = document.querySelector('main')

  let trainerCard = document.createElement('div')
    trainerCard.className = 'card'
    trainerCard.dataset.id = trainer.id

  let p = document.createElement('p')
    p.innerText = trainer.name

  let addPokemon = document.createElement('button')
    addPokemon.dataset.id = trainer.id
    addPokemon.innerText = "Add Pokemon"
    addPokemon.addEventListener('click', addNewPokemon)


    let ul = document.createElement('ul')
    let list = pokemonList(trainer)

    for(let li of list){
      ul.appendChild(li)
    }


    trainerCard.appendChild(p)
    trainerCard.appendChild(addPokemon)
    trainerCard.appendChild(ul)

    trainerList.appendChild(trainerCard)


}

function pokemonList(trainer) {
  return trainer.pokemons.map(pokemon => createPokemon(pokemon))
}

function createPokemon(pokemon){
  let listItem = document.createElement('li')
  listItem.innerText = `${pokemon.nickname} (${pokemon.species})`
  let release = document.createElement('button')
  release.className = "release"
  release.innerText = "Release"
  release.dataset.id = pokemon.id
  release.addEventListener('click', releasePokemon)
  listItem.appendChild(release)
  return listItem
}

function releasePokemon(e) {
  e.target.parentElement.remove()

  fetch(`${POKEMONS_URL}/${e.target.dataset.id}`, {
    method: 'DELETE'
  })
}

function addNewPokemon(e){
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {  'Content-Type': 'application/json'},
    body: JSON.stringify({trainer_id:  e.target.dataset.id})
  })
    .then(res => res.json())
    .then(newPokemon => addToDOM(newPokemon, e))
}

function addToDOM(newPokemon, e) {
    let trainerDiv = e.target.parentElement
    let newListItem = createPokemon(newPokemon)
    trainerDiv.querySelector('ul').appendChild(newListItem)

}
