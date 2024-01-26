const fetchPokemon = async (pokemon) => { 
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (apiResponse.status == 200) {
        const data = await apiResponse.json() 
        return data
    } 
}

// Renderiza os detalhes do Pokémon
const renderPokemon = async (pokemon) => { 
    pokeName.forEach(element => element.innerHTML = "Loading...")
    pokeNumber.forEach(element => element.innerHTML = "")
    pokeImg.forEach(element => element.src = "./img/loading.gif")
    pokeType.forEach(element => element.src = "")

    const data = await fetchPokemon(pokemon)
    
    if (data) {
        pokeCard.forEach((containers, index) => {
            updateElements(data, index)
            containers.style.background = getAtt(data['types']['0']['type']['name'])
        })
        currentPokemon = data.id

    } else {
        pokeCard.forEach((containers, index) => {
            updateElements(null, index)
            containers.style.background = '#c6c6c6'
        })
    }

    inpSearch.value = ""
}

// Atualiza os elementos do PokeCard
const updateElements = (data, index) => {
     // Seletores do elementos do PokeCard
    const selectors = [".poke-name", ".poke-number", ".poke-img", ".poke-type"]

    // Valores padrão para cada seletor
    const defaultValues = ["name", "id", "sprites.versions.generation-v.black-white.animated.front_default", "types.0.type.name"]

    // Itera os seletores e atualiza os elementos com os dados do Pokémon ou do valor padrão
    selectors.forEach((selector, i) => {
        const elements = document.querySelectorAll(selector)
        
        if (elements.length > index) {
            const element = elements[index]
            const value = data ? getValueFromData(data, defaultValues[i]) : defaultValues[i]
        
            if (selector === ".poke-img" && value)
                element.src = getImg(value)
            else
                element[selector.includes("img") ? "src" : "innerHTML"] = value

        }
    })
}

// Obtém um valor aninhado de um objeto usando uma chave de ponto
const getValueFromData = (data, key) => {
    const keys = key.split('.')
    return keys.reduce((obj, k) => obj && obj[k], data)
}

const getImg = img => {
    if (img != null) {
        return img
    } else {
        return `./img/pokeNotFound.png`
    }
}

const getType = type => `./img/type-${type}.png`
const getAtt = data => type[data]