let start = 0;
let limit = 20;

let pokemons = document.querySelector('.pokemons');
let modal = document.querySelector('.poke-modal');
let typeDefault = '';
let filter = 'about';



function loadPoke() {
    document.querySelector('.loader-wrapper').style.display = 'none';
    document.querySelector('.more').style.display = 'block';
    getPokemons(start, limit).then((poke)=> {
        createPoke(poke.results);
    });
}
function createPoke(result) {
    for(let i in result) {
        let pokeArea = document.querySelector('.pokemon-model .poke-area').cloneNode(true);
        let res = result[i];
        // console.log(res)
        getSpecificPoke(res.url).then((response)=> {
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

                getEvolves(`https://pokeapi.co/api/v2/pokemon-species/${response.id}/`).then((species)=>{
                    
                });
                let pokemon = e.target.closest('.poke-area ');

                typeDefault = response.types[0].type.name;
                modal.querySelector('.modal-name span:first-child').innerHTML = res.name;
                modal.querySelector('.modal-name span:last-child').innerHTML = `#${response.id}`;
                modal.querySelector('.area-modal').classList.add(typeDefault);
                modal.querySelector('.modal-pic').innerHTML = `<img src="${response.sprites.other.dream_world.front_default}">`;

                modal.querySelector('.performance .data.base-xp span:last-child').innerHTML = response.base_experience;
                modal.querySelector('.performance .data.height span:last-child').innerHTML = `${(response.height/10).toFixed(1).replace('.',',')} m`;
                modal.querySelector('.performance .data.weight span:last-child').innerHTML = `${(response.weight/10).toFixed(1).replace('.',',')} kg`;
                let skills = [];
                for(let k in response.abilities) {
                    skills.push(response.abilities[k].ability.name);
                }
                modal.querySelector('.performance .data.skill span:last-child').innerHTML = skills.join(', ');
                pokemon.querySelectorAll('.types span').forEach((value)=>{
                    let tp = value.cloneNode(true);
                    modal.querySelector('.modal-type').appendChild(tp);
                });

                modal.querySelector('.performance .hp .progress-bar').style.width = `${response.stats[0].base_stat}%`;
                modal.querySelector('.performance .hp .progress-bar span').innerText = `${response.stats[0].base_stat}`;

                modal.querySelector('.performance .atk .progress-bar').style.width = `${response.stats[1].base_stat}%`;
                modal.querySelector('.performance .atk .progress-bar span').innerText = `${response.stats[1].base_stat}`;

                modal.querySelector('.performance .def .progress-bar').style.width = `${response.stats[2].base_stat}%`;
                modal.querySelector('.performance .def .progress-bar span').innerText = `${response.stats[2].base_stat}`;

                modal.querySelector('.performance .spd .progress-bar').style.width = `${response.stats[5].base_stat}%`;
                modal.querySelector('.performance .spd .progress-bar span').innerText = `${response.stats[5].base_stat}`;
                

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
function changeStats(e) {
    document.querySelector('.opt .selected').classList.remove('selected');
    e.target.classList.add('selected');

    filter = e.target.getAttribute('data-filter');

    document.querySelectorAll('.performance div').forEach((item)=>{
       let filterItem = item.getAttribute('data-filter');
        if(filterItem !== filter) {
            item.classList.replace('d-flex','d-none');
        } else {
            item.classList.replace('d-none','d-flex');
        }
    });
}

loadPoke();
document.querySelector('.more').addEventListener('click', ()=>{
    start += limit;
    document.querySelector('.loader-wrapper').style.display = 'block';
    document.querySelector('.more').style.display = 'none';
    setTimeout(()=>{
        loadPoke();
    },1000)

});
document.querySelector('.close-modal').addEventListener('click',(e)=>{
    e.preventDefault();
    modal.querySelector('.modal-type').innerHTML = '';
    setTimeout(()=>{
        modal.style.opacity = 0;
    }, 500);
    modal.style.display = 'none';
    e.target.closest('.area-modal').classList.remove(typeDefault);
});
document.querySelectorAll('.opt span').forEach((item)=>{
    item.addEventListener('click', changeStats);
})
