const sch = document.getElementById("search"); 
const add = document.getElementById("add");
const display = document.getElementById("display");
const team = document.getElementById("team");

const poke = document.getElementById("poke");
let myTeam = [];

let result = "";

// Fetch API data
function getJSON(url) {
    return fetch(url, {method: 'GET'})
        .then(function (response) {
        if (response.status != 200) {
            window.alert("The pokmon could not be found. Please try another Pokemon");
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

// Display on the screen the information of the Pokemon that was searched
function displayPokemon(url) {
    getPokemon(url).then(function (data) {
        console.log(data);
        result = data;

        display.innerHTML = `
        <h2>${result.name}</h2>
        <img src=${result.sprites.front_default} width="200" height="200">
        <dl>
        <dt>Abilities:</dt>
        <dd>- ${result.abilities[0].ability.name}</dd>
        <dd>- ${result.abilities[1].ability.name}</dd>
        </dl>
        <button type="submit" id="add">Add to Team</button>
        `;
    })
}

function displayMyPokemon(url) {
    getPokemon(url).then(function (data) {
        console.log(data);
        result = data;

        display.innerHTML = `
        <h2>${result.name}</h2>
        <img src=${result.sprites.front_default} width="200" height="200">
        <dl>
        <dt>Abilities:</dt>
        <dd>- ${result.abilities[0].ability.name}</dd>
        <dd>- ${result.abilities[1].ability.name}</dd>
        </dl>
        `;
    })
}

// To get from search bar
function getPokemonName() {
    let pName = poke.value.toLowerCase();
    let url = "https://pokeapi.co/api/v2/pokemon/"+pName+"/";
    displayPokemon(url);
}

// To display from localStorage
function displayPokemonTeam(name) {
    let tName = name;
    let url = "https://pokeapi.co/api/v2/pokemon/"+tName+"/";
    displayMyPokemon(url);
}

// Loop through local storage and display the team
function displayMyTeam() {
    if(localStorage.length != 0) {
        team.innerHTML = `
            <h2>Your Pokemon Team</h2>
        `;
        myTeam = [];
        for(let i = 0; i < localStorage.length; i++) {
            myTeam.push(localStorage.getItem(i));
        }
        
        for(let i = 0; i < myTeam.length; i++) {
        
        let newDiv = document.createElement("div");
        newDiv.id = i;
        newDiv.className = "PokeTeam";
        let tName = document.createElement("h3");
        tName.textContent = myTeam[i];
        let tView = document.createElement("button");
        tView.type = "submit";
        tView.id = myTeam[i];
        tView.textContent = "View Pokemon";
        let tRemove = document.createElement("button");
        tRemove.type = "submit";
        tRemove.className = "remove";
        tRemove.id = i;
        tRemove.textContent = "Remove from Team";

        newDiv.append(tName, tView, tRemove);
        team.append(newDiv);
        }
    }
}

// Update local storage
function updateLocalStorage() {
    // Store Pokemon in variable
    let new_poke = result.name;

    //Helper to check if the pokemon is already in localstorage
    myTeam = [];
    for(let i = 0; i < localStorage.length; i++) {
        myTeam.push(localStorage.getItem(i));
    }

    if(myTeam.includes(new_poke)) {
        window.alert("This pokemon is already on your team!");
    } else {
        let nKey = localStorage.length;
        localStorage.setItem(nKey, new_poke);
        displayMyTeam();
        window.alert("The pokemon has been added to your team!");
    }

    poke.value = "";
    display.innerHTML = "";
}

// Event listeners
sch.addEventListener("click", getPokemonName);
display.addEventListener( 'click', function ( event ) {
    if( event.target.id == 'add' ) {
      updateLocalStorage();
    };
  });
team.addEventListener( 'click', function ( event ) {
    myTeam = [];
        for(let i = 0; i < localStorage.length; i++) {
            myTeam.push(localStorage.getItem(i));
        }
        
        for(let i = 0; i < myTeam.length; i++) {
            if(event.target.id == i) {
                localStorage.removeItem(i);
                displayMyTeam();
            }
        }
});
team.addEventListener( 'click', function ( event ) {
    myTeam = [];
        for(let i = 0; i < localStorage.length; i++) {
            myTeam.push(localStorage.getItem(i));
        }
        
        for(let i = 0; i < myTeam.length; i++) {
            if(event.target.id == myTeam[i]) {
                let name = myTeam[i];
                displayPokemonTeam(name);
            }
        }
});
displayMyTeam();