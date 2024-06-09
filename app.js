let pagina = 0;
const btnSiguiente = document.getElementById('loadMore');
const cargando = document.getElementById('cargando');
const cards = document.getElementById('container');
const nav = document.querySelector('.menuNav');

window.addEventListener('scroll', () => {
    if(window.scrollY > 0){
        nav.classList.add('menuNav-scroll');
    }else{  
        nav.classList.remove('menuNav-scroll');
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const pokedexLink = document.querySelector('a[href="#pokedex"]');

    pokedexLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el enlace recargue la página

        const pokedexSection = document.getElementById('pokedex');
        pokedexSection.scrollIntoView({ behavior: 'smooth' }); 
    });
});

btnSiguiente.addEventListener('click', async () => {
    pagina += 12;
    cargando.style.display = 'block';
    cards.style.display = 'none';
    await cargarPokemon();
});

const cargarPokemon = async () => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${pagina}`);
        const data = await res.json();
        console.log(data.results);

        let nombre = '';
        for(const pokemon of data.results){
            const pokemonRes = await fetch(pokemon.url);
            console.log(pokemonRes)
            const pokemonData = await pokemonRes.json();
            const pokemonImg = pokemonData.sprites.other['official-artwork'].front_default;

            //tipos
            let tipos = ''
            for(let types of pokemonData.types){
                const res = await fetch(types.type.url);
                const data = await res.json();
                const tiposespanol = data.names.find(name => name.language.name === 'es').name;
                tipos += `<span class="type">${tiposespanol}</span>`
            }

            //habilidades
            let ability=''
            for(let habilidades of pokemonData.abilities){
                const res = await fetch(habilidades.ability.url)
                const data = await res.json();
                const habilidadesespanol = data.names.find(name => name.language.name === 'es').name;
                ability += `<span class="type">${habilidadesespanol}</span>`
            }

            nombre += `
            <div class="pok">
            <img src="${pokemonImg}"
            alt="pokemon ${pokemon.name}">
            <h1>${pokemon.name}</h1>
            <div>${tipos}</div>
            <div class="habilidad">${ability}</div>
            </div>`
        };
         document.getElementById('container').innerHTML = nombre;
            cargando.style.display = 'none';
            cards.style.display = 'flex';

    }
    catch(error){
        console.log(error);
    }
}




cargarPokemon();