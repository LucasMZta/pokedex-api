let start = 0;
let limit = 20;
let pokeApi = [];
let pokemons = document.querySelector('.pokemons');
let modal = document.querySelector('.poke-modal');
let typeDefault = '';



function loadPoke() {
    getPokemons(start, limit).then((poke)=> {
        createPoke(poke.results);
    });
}
function createPoke(result) {

    for(let i in result) {
        let pokeArea = document.querySelector('.pokemon-model .poke-area').cloneNode(true);
        let res = result[i];
        getSpecificPoke(res.url).then((response)=> {
            // console.log(response);
            pokeArea.querySelector('.poke-info span:last-child').innerHTML = `#${response.id}`;

            for(let j in response.types) {
                let type = response.types[j].type;
                let span = document.createElement('span');
                typeDefault = response.types[0].type.name;
                span.classList.add('poke-status--type');
                span.setAttribute('data-status-type', type.name,);
                span.innerHTML = type.name;

                pokeArea.querySelector('.poke-status .types').appendChild(span);
                pokeArea.classList.add(typeDefault);
            }

            if(response.sprites.other.dream_world.front_default != null) {
                pokeArea.querySelector('.poke-pic').innerHTML = `<img src="${response.sprites.other.dream_world.front_default}" alt="">`
            } else {
                pokeArea.querySelector('.poke-pic').innerHTML = `<img src="assets/images/no.png" alt="">`
            }

            pokeArea.querySelector('.poke-status a').addEventListener('click', (e)=> {
                e.preventDefault();
                typeDefault = response.types[0].type.name;
                modal.querySelector('.modal-name span').innerHTML = res.name;
                modal.querySelector('.area-modal').classList.add(typeDefault);
                modal.querySelector('.modal-pic').innerHTML = `<img src="${response.sprites.other.dream_world.front_default}">`;

                setTimeout(()=>{
                    modal.style.opacity = 1;
                }, 200);
                modal.style.display = 'flex';
            });
            
        });
        pokeArea.querySelector('.poke-info span:first-child').innerHTML = res.name;
        pokemons.appendChild(pokeArea);

        

    }   
}

loadPoke();
document.querySelector('.more').addEventListener('click', ()=>{
    start += limit;
    loadPoke();
});
document.querySelector('.close-modal').addEventListener('click',(e)=>{
    e.preventDefault();
    setTimeout(()=>{
        modal.style.opacity = 0;
    }, 500);
    modal.style.display = 'none';
    console.log(typeDefault);
    e.target.closest('.area-modal').classList.remove(typeDefault);
});