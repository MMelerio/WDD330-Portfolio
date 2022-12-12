const sch = document.getElementById("Search"); 
const add = document.getElementById("add");
const display = document.getElementById("display");

const poke = document.getElementById("poke");

let result = "";

function getJSON(url) {
    return fetch(url, {method: 'GET'})
        .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
           return response.json();
        }
        })
        .catch(function (error) {
            console.log(error);
        });
}
  
function getPokemon(url) {
    return getJSON(url);
}

function displayPokemon(url) {
    getPokemon(url).then(function (data) {
        console.log(data);
        result = data;

        display.innerHTML = `
            <h2>${result.name}</h2>
            <img src=${result.sprites.front_default} width="250" height="250">
            <ol>Abilities:</ol>
            <li>${result.abilities[0].ability.name}</li>
            <li>${result.abilities[1].ability.name}</li>
            <button type="submit" id="add">Add to Team</button>
        `;
    })
}

function getPokemonName() {
    let pName = poke.value;
    let url = "https://pokeapi.co/api/v2/pokemon/"+pName+"/";
    displayPokemon(url);
}


// Update local storage
function updateLocalStorage() {
    // Store Pokemon in variable
    let new_poke = result.name;

    // Check inf local storage is empty
    if(localStorage.getItem(new_poke) === null) {
        localStorage.setItem(new_poke, new_poke);
        window.alert("The pokemon has been added to your team!");;
    } else {
        window.alert("This pokemon is already on your team!");
    }
}

sch.addEventListener("click", getPokemonName);
document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id == 'add' ) {
      updateLocalStorage();
    };
  } );