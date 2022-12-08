const url = 'https://pokeapi.co/api/v2/pokemon/clefairy/'

const sch = document.getElementById("Search");

function getJSON(url) {
    return fetch(url)
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

  sch.addEventListener("click", getPokemon);