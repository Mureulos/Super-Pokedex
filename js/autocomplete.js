// autocomplete.js
const suggestions = [] 

const fillArray = async () => { 
    for (let i = 0; i < maxPokemon; i++) {
        const data = await fetchPokemon(i)

        if (data) {
            suggestions.push(data.name)
        }
    }
}

inpSearch.addEventListener('input', function() {
    if (this.value) {
        const search = this.value.toLowerCase()
        option = suggestions.filter(e => e.startsWith(search))
    } else {
        option = []
    }
    
    clearList()

    for(let i = 0; i < 5; i++) {
        if (option[i] == undefined) {
            continue
        } else {
            list.appendChild(createOption(option[i]))
            list.style.display = "flex"
            inpSearch.classList.add("removeShadow")
        }
    }
})

const createOption = (pokemon) => {
    let li = document.createElement('li')
    li.innerHTML = pokemon

    li.addEventListener('click', () => {
        renderPokemon(pokemon.toLowerCase())
        clearList()
    })

    li.addEventListener('mouseover', () => {
        li.style.background = pokeCard.style.background
    })

    li.addEventListener('mouseout', () => {
        li.style.background = ''
    })

    return li
}