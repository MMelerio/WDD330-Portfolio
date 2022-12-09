const sch = document.getElementById("Search"); 
const add = document.getElementById("add");   

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

        const display = document.getElementById("display");

        display.innerHTML = `
            <h2>${result.name}</h2>
            <img src=${result.sprites.front_default} width="250" height="250">
            <p>Abilities: ${result.abilities[0].ability.name} and ${result.abilities[1].ability.name} </p>
            <button type="submit" id="add">Add to Team</button>
            `;

        updateLocalStorage(result);

    }) 
}

function getPokemonName() {
    let pName = poke.value;
    let url = "https://pokeapi.co/api/v2/pokemon/"+pName+"/";
    displayPokemon(url);
}


// Update local storage
function updateLocalStorage(result) {
    // Store Pokemon in variable
    let new_poke = result.name;

    // Check inf local storage is empty
    if(localStorage.getItem('mPoke') == null) {
        localStorage.setItem('mPoke', '[]');
    }

    // retrieve items and add new pokemon to array
    let stored_poke = JSON.parse(localStorage.getItem('mPoke'));
    stored_poke.push(new_poke);

    // save to local storage
    localStorage.setItem('mPoke', JSON.stringify(stored_poke));
}

sch.addEventListener("click", getPokemonName);