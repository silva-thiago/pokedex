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
        <li class='pokemon ${types[0]}'>
          <img class='pokemon-img' src='${sprites.front_default}' alt='${pokemon.name}' width='150px' height='150px'>
          <h2 class='pokemon-name'>${pokemon.name}</h2>
          <p class='pokemon-types'>${types.join(' | ')}</p>
          <span class='pokemon-id'>#${pokemon.id}</span>
        </li>`

      return accumulator
    }, '')

    const list = document.querySelector('[data-js=\'pokedex\']')
    list.innerHTML = pokemonsList
  })
}

fetchPokemon()
