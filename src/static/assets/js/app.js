const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${ id }`
const generatePokemonPromises = () => Array(150).fill().map((_, index) => fetch(getPokemonURL(index + 1)).then(response => response.json()))
const pokemonPromises = generatePokemonPromises()

const fetchPokemon = () => {

  Promise.all(pokemonPromises).then(pokemons => {
    return pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)
      const sprites = Object.create(pokemon.sprites.other.dream_world)

      accumulator += `
        <li class='card'>
          <div class='card-header'>
            <span class='pokemon-id'>#${ pokemon.id }</span>
            <h2 class='pokemon-name'>${ pokemon.name }</h2>
          </div>
          <div class='card-content pokemon ${ types[0] }'>
            <div class='card-body'>
              <img class='pokemon-img' src='${ sprites.front_default }' alt='${ pokemon.name }' width='192px' height='192px'>
            </div>
          </div>
          <div class='card-footer'>
            <p class='pokemon-types'>${ types.join(' | ') }</p>
          </div>
        </li>
      `

      return accumulator
    }, '')

  })
    .then(pokemons => {
      const list = document.querySelector('[data-js=\'pokedex\']')
      list.innerHTML = pokemons
    })
}

fetchPokemon()
