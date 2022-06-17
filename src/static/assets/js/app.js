const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${ id }`

const generatePokemonPromises = () => Array(150)
  .fill()
  .map((_, index) => fetch(getPokemonURL(index + 1))
    .then(response => response.json()))

const pokemonPromises = generatePokemonPromises()

const generateHTML = pokemons => pokemons.reduce((accumulator, { id, name, sprites, types }) => {
  const pokemonTypes = types.map(typeInfo => typeInfo.type.name)
  const pokemonSprites = Object.create(sprites.other.dream_world)

  accumulator += `
    <li class='card'>
      <div class='card-header'>
        <span class='pokemon-id'>#${ id }</span>
        <h2 class='pokemon-name'>${ name }</h2>
      </div>
      <div class='card-content pokemon ${ pokemonTypes[0] }'>
        <div class='card-body'>
          <img class='pokemon-img' src='${ pokemonSprites.front_default }' alt='${ name }' width='192px' height='192px'>
        </div>
      </div>
      <div class='card-footer'>
        <p class='pokemon-types'>${ pokemonTypes.join(' | ') }</p>
      </div>
    </li>
  `

  return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
  const list = document.querySelector('[data-js=\'pokedex\']')
  list.innerHTML = pokemons
}

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
