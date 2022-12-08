const url = 'https://pokeapi.co/api/v2/pokemon/clefairy/'

const sch = document.getElementById("Search");

async function getJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const fetchJson = await response.json();
        return fetchJson;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getPokemon(url) {
    return getJSON(url);
  }

  sch.addEventListener("click", getPokemon);