let currentPokemon = 1
let maxPokemon

const init = async () => {
    maxPokemon = await getMaxPokemonNumber()
    renderPokemon(currentPokemon)
    fillArray()
}

const getMaxPokemonNumber = async () => {
    const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon-species/?limit=1")
    const data = await apiResponse.json()
    return data.count
}

const getContainerColor = () => {
    const container = document.querySelector('.container')
    const containerColor = window.getComputedStyle(container).backgroundColor
    return containerColor
}

const clearList = () => {
    list.innerHTML = ""
    list.style.display = "none"
    inpSearch.classList.remove("removeShadow")
}

init()