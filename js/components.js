const pokeCard = document.querySelectorAll(".container")
const pokeName = document.querySelectorAll(".poke-name")
const pokeNumber = document.querySelectorAll(".poke-number")
const pokeImg = document.querySelectorAll(".poke-img")
const pokeType = document.querySelectorAll(".poke-type")

const form = document.querySelector("form")
const inpSearch = document.querySelector("#inpSearch")
const list = document.querySelector('.autocomplete-list')

const btnPrev = document.querySelector(".prevPokemon")
const btnNext = document.querySelector(".nextPokemon")

const type = {
    fire: "#ff9c54",
    grass: "#63bb5b",
    water: "#3586ff",
    electric: "#f3d23b",
    ice: "#74cec0",
    normal: "#9099a1",
    fighting: "#ce4069",
    flying: "#92aade",
    poison: "#ab6ac8",
    ground: "#d97746",
    rock: "#c7b78b",
    bug: "#90c12c",
    ghost: "#5269ac",
    steel: "#5a8ea1",
    psychic: "#f97176",
    dragon: "#096dc4",
    dark: "#5a5366",
    fairy: "#ec8fe6"
}