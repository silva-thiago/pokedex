const fetchPokemon = () => {
  const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${ id }`
  const pokemonPromises = []

  for (let i = 1; i <= 150; ++i) {
    pokemonPromises.push(fetch(getPokemonURL(i)).then(response => response.json()))
  }

  Promise.all(pokemonPromises).then(pokemons => {
    const pokemonsList = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)
      const sprites = Object.create(pokemon.sprites.other.dream_world)

      accumulator += `
        <li class='card'>
          <div class='card-header'>
            <span class='pokemon-id'>#${pokemon.id}</span>
            <h2 class='pokemon-name'>${pokemon.name}</h2>
          </div>
          <div class='card-content pokemon ${types[0]}'>
            <div class='card-body'>
              <img class='pokemon-img' src='${sprites.front_default}' alt='${pokemon.name}' width='192px' height='192px'>
            </div>
          </div>
          <div class='card-footer'>
            <p class='pokemon-types'>${types.join(' | ')}</p>
          </div>
        </li>
      `

      return accumulator
    }, '')

    const list = document.querySelector('[data-js=\'pokedex\']')
    list.innerHTML = pokemonsList
  })
}

fetchPokemon()
