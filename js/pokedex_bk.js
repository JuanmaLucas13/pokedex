const newLista$$ = document.body.querySelector('#pokedex');
const listaPokemon = [];
const lista2Pokemon = [];
let finllamadas = false;
let llamadasRec = 0;
let llamadas = 0;

const mostrarPokemons = () => {

    lista2Pokemon.sort ((a, b) => {
         return a.id - a.id;
      });

     const newDivImagenes$$ = document.createElement('div');
     newDivImagenes$$.id = 'pokedex';

     for (const iterator of lista2Pokemon) {
        console.log(iterator);
        const newDivImagen$$ = document.createElement('div');
        newDivImagen$$.className = 'card';

        const newTitle$$ = document.createElement('p');
        newTitle$$.className = 'card-title';
        newTitle$$.textContent = iterator.id;

        const newSubtitle$$ = document.createElement('p');
        newSubtitle$$.className = 'card-subtitle';
        newSubtitle$$.textContent = iterator.name;

        const newImagen$$ = document.createElement('img');
        newImagen$$.className = 'card-image';
        newImagen$$.src = iterator.sprites.front_default;


        newDivImagen$$.appendChild(newTitle$$)
        newDivImagen$$.appendChild(newSubtitle$$)
        newDivImagen$$.appendChild(newImagen$$)
        newDivImagenes$$.appendChild(newDivImagen$$)
        
     }



     newLista$$.appendChild(newDivImagenes$$)
}


const completarInfoPokemon = (datosPokemon) => {

    console.log(datosPokemon);
    llamadasRec= llamadasRec + 1;

    const pokeFind = listaPokemon.find(pokemon => datosPokemon.name == pokemon.name);

    if (pokeFind != null)
     {
       const todosDatos = {...pokeFind, ...datosPokemon};
       todosDatos.restodatos = 1;
    //    console.log(todosDatos) 
       lista2Pokemon.push(todosDatos);
     }  
    else
    {
        const todosDatos = {...pokeFind};
        lista2Pokemon.push(todosDatos);
    }  
 
    if (finllamadas)
     {
        if (llamadas == llamadasRec)
         {
            mostrarPokemons();
            console.log("lista2:"); 
            console.log(lista2Pokemon);
         }  
     }  
    
}

const recuperarDatosPokemon = () => {
    for (const iterator of listaPokemon) {
    //   console.log(iterator.url)  ;
      llamadas = llamadas + 1;
      
      fetch (iterator.url)
        .then (res => res.json())
        .then ( myJson => {completarInfoPokemon(myJson)} );
    }

    finllamadas = true;
}



const cargarListaPokemon = (listaJson) => {
    for (const iterator of listaJson.results) {
        let newPokemon = {};
        newPokemon = {...iterator, restodatos: 0};
        listaPokemon.push(newPokemon);
     }
 
     console.log("lista1: ");
     console.log(listaPokemon);

     recuperarDatosPokemon();
}

const inicio = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5');
    const listaAuxPokemon = await res.json();
    // console.log(listAuxPokemon);
    cargarListaPokemon(listaAuxPokemon);
}


inicio();