const sch = document.getElementById("Search");

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
  
function getPokemon(url = "https://pokeapi.co/api/v2/pokemon/clefairy/") {
    return getJSON(url);
}

sch.addEventListener("click", getPokemon);