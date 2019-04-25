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
    div.dataset.id = team.id

    let p = document.createElement("p")
    p.innerText = team.name

    let addBtn = document.createElement("button")
    addBtn.innerText = "Add Pokemon"
    addBtn.dataset.id = team.id
    addBtn.addEventListener("click", addPokemon)
    
    // console.log(team.name)

    let ul = document.createElement("ul")
    
    for (pokemon of team.pokemons){
        let li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.dataset.id = pokemon.nickname
        let remBtn = document.createElement("button")
        remBtn.innerText = "Remove"
        remBtn.className = "release"
        remBtn.dataset.id = pokemon.id
        remBtn.addEventListener("click", removePokemon)
        li.appendChild(remBtn)
        ul.appendChild(li)
    }

    div.appendChild(p)
    div.appendChild(addBtn)
    // console.log(div)
    div.appendChild(ul)
    document.querySelector("main").appendChild(div)
}

function addPokemon(e){
    // console.log(e.target.dataset.id)
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
    // console.log(e.target.dataset.id)
    let divs = document.querySelectorAll("div")
    // console.log(divs)
    let newDiv;
    for (divi of divs){
        if (divi.dataset.id == e.target.dataset.id){
            // console.log(divi)
            newDiv = divi
        }
    }
    newUl = newDiv.querySelector("ul")
    if (newUl.childElementCount < 6){
        console.log(newDiv)
        let li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        li.dataset.id = pokemon.nickname
        let remBtn = document.createElement("button")
        remBtn.innerText = "Remove"
        remBtn.className = "release"
        remBtn.dataset.id = pokemon.id
        remBtn.addEventListener("click", removePokemon)
        li.appendChild(remBtn)

        console.log(newUl)
        newUl.appendChild(li)
    }

}

function removePokemon(e){
    // console.log(e.target.dataset.id)
    e.target.parentElement.remove()
    fetch(`http://localhost:3000/pokemons/${e.target.dataset.id}`,{
        method: 'DELETE'
    })
}