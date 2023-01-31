let start = 0;
let limit = 20;
let pokeApi = [];
let pokemons = document.querySelector('.pokemons');



function loadPoke() {
    getPokemons(start, limit).then((poke)=> {
        createPoke(poke.results);
    });
}
function createPoke(result) {

    for(let i in result) {
        let pokeArea = document.querySelector('.pokemon-model .poke-area').cloneNode(true);
        let res = result[i];
        getSpecificPoke(res.url).then((response)=>{
            // console.log(response);
            pokeArea.querySelector('.poke-info span:last-child').innerHTML = `#${response.id}`;
            for(let j in response.types) {
                let type = response.types[j].type;
                let span = document.createElement('span');
                span.classList.add('poke-status--type');
                span.setAttribute('data-status-type', type.name,);
                span.innerHTML = type.name;

                pokeArea.querySelector('.poke-status a').before(span);
                pokeArea.classList.add(response.types[0].type.name);
            }
            pokeArea.querySelector('.poke-pic').innerHTML = `<img src="${response.sprites.other.dream_world.front_default}" alt="">`
        });

       

        pokeArea.querySelector('.poke-info span:first-child').innerHTML = res.name;
        pokemons.appendChild(pokeArea);
    }
    

    
}
loadPoke();
document.querySelector('.more').addEventListener('click', ()=>{
    start += limit;
    console.log(start);
    loadPoke();
});