//Form.js
const form = document.querySelector("form")
const inpSearch = document.querySelector(".inpSearch")
const list = document.querySelector('.autocomplete-list')

form.addEventListener("submit", (event) => {
    event.preventDefault()
    renderPokemon(inpSearch.value.toLowerCase())
    clearList()
})


const btnPrev = document.querySelector(".prevPokemon")
const btnNext = document.querySelector(".nextPokemon")
const btnRandom = document.querySelector(".randomPokemon")

btnPrev.addEventListener("click", () => {
    if (currentPokemon > 1) {
        currentPokemon -= 1
    }

    renderPokemon(currentPokemon)
    clearList()
})

btnNext.addEventListener("click", () => {
    if (currentPokemon < maxPokemon) {
        currentPokemon += 1
    }

    renderPokemon(currentPokemon)
    clearList()
})

btnRandom.addEventListener("click", () => {
    currentPokemon = Math.floor(Math.random() * maxPokemon)
    renderPokemon(currentPokemon)
    clearList()
})


const hoverElement = document.querySelector('.hoverElement')
const balloon = document.querySelector('#balloon')
hoverElement.addEventListener('mouseenter', () => {balloon.style.display = 'flex'})
hoverElement.addEventListener('mouseleave', () => {balloon.style.display = 'none'})