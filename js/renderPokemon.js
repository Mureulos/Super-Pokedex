// RendePokemon.js
const fetchPokemon = async (pokemon) => { 
    try {
        const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        
        if (apiResponse.status === 200) {
            const data = await apiResponse.json()
            const data2 = await fetchPokemonAdditional(pokemon)
            return { data, data2 }
        } else {
            throw new Error(`Failed to fetch Pokemon`)
        }
    } catch (error) {
        console.error(`Error fetching Pokemon:`, error)
        return { error: true }
    }
}

const fetchPokemonAdditional = async (pokemon) => { 
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
    
    if (apiResponse.status == 200) {
        const data = await apiResponse.json() 
        return data
    }
}

const renderPokemon = async (pokemon) => {
    const result = await fetchPokemon(pokemon)

    if (result.error) {
        errorElements()
        return
    }

    const { data, data2 } = result
    currentPokemon = data.id

    if (data && data2) {
        pokeCards.forEach((container) => {
            updateElements(data, data2)
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

const updateElements = (data, data2) => {
    updateElement(".poke-name", { value: data.name })
    updateElement(".poke-number", { label:'#', value: data.id })

    updateElement(".poke-img",{ value: getImg(data) })
    updateElement(".poke-imgShiny", { value: getImgShiny(data) })

    updateElement(".poke-type1", { value: getType(data, 0) })
    updateElement(".poke-type2", { value: getType(data, 1) })

    updateElement(".poke-ability1", { label: 'Ability 1: ', value:getAbility(data, 0) })
    updateElement(".poke-ability2", { label: 'Ability 2: ', value:getAbility(data, 1) })
    updateElement(".poke-rate", { label:'Captura rate: ', value: data2.capture_rate })
    updateElement(".poke-experience", { label: 'Base experience: ', value: `${data.base_experience}` })

    updateElement(".poke-description", { value: data2['flavor_text_entries']['1']['flavor_text'] })

    updateElement(".poke-habitat", { label:'Habitat ', value: data2.habitat.name })
    updateElement(".poke-weight", { label: 'Weight: ', value: `${data.weight}` })
    updateElement(".poke-height", { label: 'Height: ', value: `${data.height}` })
    updateElement(".poke-color", { label:'Color: ', value: data2.color.name })
    updateElement(".poke-mythical", { label:'Mythical: ', value: data2.is_mythical })
    updateElement(".poke-legendery", { label:'Legendary: ', value: data2.is_legendary })
}

const updateElement = (selector, data) => {
    document.querySelectorAll(selector).forEach((element) => {
        if (data.label && data.value) {
            element.innerHTML = `<bold>${data.label}</bold>${data.value}`
        } 
        
        else if (selector.includes("img")) {
            element.src = data.value
        } 
        
        else if (selector.includes("type")) {
            if (data.value) {
                element.src = data.value
                element.style.display = "flex"
            } else {
                element.style.display = "none"
            }
        } 

        else if (selector.includes("mythical")) {
            const isMythical = data ? 'No': 'Yes'
            element.innerHTML = `<bold>${data.label}</bold> ${isMythical}`
        }

        else if (selector.includes("legendery")) {
            const isLegendary = data == false ? 'Yes': 'No'
            element.innerHTML = `<bold>${data.label}</bold> ${isLegendary}`
        }
        
        else {
            element.innerHTML = data.value
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

const getType = (data, index) => {
    const types = data.types

    if (types[index]) {
        const type = data.types[index]['type']['name']
        return `./img/type-${type}.png`
    }

    return ""
}

const getAbility = (data, index) => {
    const abilities = data.abilities

    if (abilities[index]) {
        return data.abilities[index]['ability']['name']
    }

    return "N/A"
}

const getDescription = (data) => {
    const imgPaths = [
        "flavor_text_entries.",
        "sprites.front_default"
    ]
    const validPath = imgPaths.find((path) => getValueFromData(data, path))
    
    if (validPath) {
        return getValueFromData(data, validPath)
    } else {
        return "./img/pokeNotFound.png"
    }
}

const getAtt = data => type[data]


const errorElements = () => {
    updateElement(".poke-name", { value: 'Error :(' })
    updateElement(".poke-number", { label:'#', value: '404' })

    updateElement(".poke-img", { value: './img/pokeNotFound.png' })
    updateElement(".poke-imgShiny", { value: './img/pokeNotFound.png' })

    updateElement(".poke-type1", { value: ''})
    updateElement(".poke-type2", { value: ''})

    updateElement(".poke-ability1", { label: 'Ability 1: ', value: 'N/A' })
    updateElement(".poke-ability2", { label: 'Ability 2: ', value: 'N/A' })
    updateElement(".poke-rate", { label:'Captura rate: ', value: 'N/A' })
    updateElement(".poke-experience", { label: 'Base experience: ', value: 'N/A' })

    updateElement(".poke-description", { value: 'Pokemon not found' })

    updateElement(".poke-habitat", { label:'Habitat ', value: 'N/A' })
    updateElement(".poke-weight", { label: 'Weight: ', value: 'N/A' })
    updateElement(".poke-height", { label: 'Height: ', value: 'N/A' })
    updateElement(".poke-color", { label:'Color: ', value: 'N/A' })
    updateElement(".poke-mythical", { label:'Mythical: ', value: 'N/A' })
    updateElement(".poke-legendery", { label:'Legendary: ', value: 'N/A' })
}