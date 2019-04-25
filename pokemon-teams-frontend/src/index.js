const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded',function() {
    fetchAllTrainers()
});

function fetchAllTrainers() {
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(teams => teams.forEach(team => addTeam(team)))
}

function addTeam(team) {
    // console.log(team)
    const div = document.createElement('div')
    div.className = 'card'
    div.dataset.id = team.id
    // console.log(div)
    team.pokemons.forEach(pokemon => addPokemon(pokemon))

}

function addPokemon(pokemon) {
    console.log(pokemon)
    
}