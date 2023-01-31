
//load pokemons
async function getPokemons(start, limit) {
    try {
        let response =  await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${limit}`)
        return  await response.json();

    } catch (error) {
        console.log(error);
        return error;
    }
}
async function getSpecificPoke(url) {
    let response = await fetch(url);
    return await response.json();
    // .then((response) => response.json())
    // .catch((error) => console.error(error))
}