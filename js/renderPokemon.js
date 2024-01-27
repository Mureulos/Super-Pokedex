// RendePokemon.js
const fetchPokemon = async (pokemon) => { 
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (apiResponse.status == 200) {
        const data = await apiResponse.json() 
        return data
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon)
    currentPokemon = data.id

    if (data) {
        pokeCards.forEach((container) => {
            updateElements(data)
            container.style.background = getAtt(data['types']['0']['type']['name'])
        })
    } else {
        pokeCards.forEach((container) => {
            updateElements(null)
            container.style.background = '#c6c6c6'
        })
    }

    inpSearch.value = ""
    clearList()
}

const updateElements = (data) => {
    updateElement(".poke-name", pokeName, data.name)
    updateElement(".poke-number", pokeNumber, `${data.id}`)

    updateElement(".poke-img", pokeImg, getImg(data))
    updateElement(".poke-imgShiny", pokeImgShiny, getImgShiny(data))

    updateElement(".poke-weight", pokeWeight, `${data.weight}`)
    updateElement(".poke-height", pokeHeight, `${data.height}`)

    updateElement(".poke-ability1", pokeAbility1, getAbility(data, 0))
    updateElement(".poke-ability2", pokeAbility2, getAbility(data, 1))
    
    updateElement(".poke-experience", pokeExperience, `${data["base_experience"]}`)
    
    updateElement(".poke-type1", pokeType1, getType(data, 0))
    updateElement(".poke-type2", pokeType2, getType(data, 1))
}

const updateElement = (selector, elements, value) => {
    elements.forEach((element) => {
        if (selector.includes("img")) {
            element.src = value
        } else if (selector.includes("type")) {
            if (value) {
                element.src = value
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        } else {
            element.innerHTML = value
        }
    })
}

// Obtém um valor aninhado de um objeto usando uma chave de ponto
const getValueFromData = (data, key) => {
    if (!key || typeof key !== 'string')
        return key  // Se a chave não for uma string, retorna a própria chave

    const keys = key.split('.')
    return keys.reduce((obj, k) => obj && obj[k], data)
}

const getImg = (data) => {
    const imgPaths = [
        "sprites.versions.generation-v.black-white.animated.front_default",
        "sprites.front_default"
    ]
    const validPath = imgPaths.find((path) => getValueFromData(data, path))
    
    if (validPath) {
        return getValueFromData(data, validPath)
    } else {
        return "./img/pokeNotFound.png"
    }
}

const getImgShiny = (data) => {
    const imgPathsShiny = [
        "sprites.versions.generation-v.black-white.animated.front_shiny",
        "sprites.front_shiny"
    ]
    
    const validPathShiny = imgPathsShiny.find((path) => getValueFromData(data, path))

    if (validPathShiny) {
        return getValueFromData(data, validPathShiny)
    } else {
        return "./img/pokeNotFound.png"
    }
}

const getAbility = (data, index) => {
    const abilities = data.abilities

    if (abilities[index]) {
        return data.abilities[index]['ability']['name']
    }

    return "N/A"
}

const getType = (data, index) => {
    const types = data.types

    if (types[index]) {
        const type = data.types[index]['type']['name']
        return `./img/type-${type}.png`
    }

    return ""
}

const getAtt = data => type[data]