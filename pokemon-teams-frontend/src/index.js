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
    let div = document.createElement("div")
    div.className = 'card'
    let p = document.createElement("p")
    let addBtn = document.createElement("button")
    addBtn.innerText = "Add Pokemon"
    
    // console.log(team.name)
    p.innerText = team.name
    div.dataset.id = team.name
    let ul = document.createElement("ul")
    
    for (pokemon of team.pokemons){
        let li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.dataset.id = pokemon.nickname
        let remBtn = document.createElement("button")
        remBtn.innerText = "Remove"
        remBtn.className = "release"
        remBtn.dataset.id = pokemon.nickname
        li.appendChild(remBtn)
        ul.appendChild(li)
    }
    div.appendChild(p)
    div.appendChild(addBtn)
    // console.log(div)
    div.appendChild(ul)
    document.querySelector("main").appendChild(div)
}
