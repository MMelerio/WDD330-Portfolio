const sch = document.getElementById("Search");

function getJSON(url = "https://pokeapi.co/api/v2/pokemon/clefairy/") {
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

sch.addEventListener("click", getPokemon);