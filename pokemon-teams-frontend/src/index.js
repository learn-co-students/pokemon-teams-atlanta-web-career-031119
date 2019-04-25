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
    let div = document.createElement("div")
    div.className = 'card'
    div.dataset.id = team.id

    let p = document.createElement("p")
    p.innerText = team.name

    let addBtn = document.createElement("button")
    addBtn.innerText = "Add Pokemon"
    addBtn.dataset.id = team.id
    addBtn.addEventListener("click", addPokemon)

    let ul = document.createElement("ul")
    
    for (pokemon of team.pokemons){
        let li = createListItem(pokemon)
        ul.appendChild(li)
    }

    div.appendChild(p)
    div.appendChild(addBtn)
    div.appendChild(ul)
    document.querySelector("main").appendChild(div)
}

function createListItem(pokemon){
    let li = document.createElement("li")
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    li.dataset.id = pokemon.nickname
    let remBtn = document.createElement("button")
    remBtn.innerText = "Remove"
    remBtn.className = "release"
    remBtn.dataset.id = pokemon.id
    remBtn.addEventListener("click", removePokemon)
    li.appendChild(remBtn)
    return li
}

function addPokemon(e){
    fetch("http://localhost:3000/pokemons",{
        headers:{
          "Content-Type": "application/json"
        },
        method:"POST",
        body: JSON.stringify({ 
            trainer_id: e.target.dataset.id
        })
    }).then(response => response.json())
    .then(pokemon => addNewPokemon(pokemon, e))
}

function addNewPokemon(pokemon, e){
    let div = e.target.parentElement
    newUl = div.querySelector("ul")
    if (newUl.childElementCount < 6){
        let li = createListItem(pokemon)
        newUl.appendChild(li)
    }
    div.appendChild(newUl)
}

function removePokemon(e){
    e.target.parentElement.remove()
    fetch(`http://localhost:3000/pokemons/${e.target.dataset.id}`,{
        method: 'DELETE'
    })
}