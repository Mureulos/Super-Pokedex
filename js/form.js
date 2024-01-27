//Form.js

form.addEventListener("submit", (event) => {
    event.preventDefault()
    renderPokemon(inpSearch.value.toLowerCase())
    clearList()
})

btnPrev.addEventListener("click", () => {
    if (currentPokemon > 1)
        currentPokemon -= 1

    pokeImg.src = "./img/loading.gif"
    pokeImgShiny.src = "./img/loading.gif"
    renderPokemon(currentPokemon)

    clearList()
})

btnNext.addEventListener("click", () => {
    if (currentPokemon < maxPokemon)
        currentPokemon += 1
    
    pokeImg.src = "./img/loading.gif"
    pokeImgShiny.src = "./img/loading.gif"
    renderPokemon(currentPokemon)

    clearList()
})

const hoverElement = document.querySelector('.hoverElement')
const balloon = document.querySelector('#balloon')
hoverElement.addEventListener('mouseenter', () => {balloon.style.display = 'flex'})
hoverElement.addEventListener('mouseleave', () => {balloon.style.display = 'none'})