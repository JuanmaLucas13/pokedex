const newLista$$ = document.body.querySelector('#pokedex');
let listaPokemons = [];
let listaFiltrada = [];
let Pagina = 0;

const paginarPokemons = (event) => {
    newLista$$.innerHTML = '';
    Pagina = 0;

    const input$$ = document.body.querySelector("input");
    input$$.value = '';
    
    const select$$ = document.body.querySelector("select");
    listaFiltrada = listaPokemons.slice(0, select$$.value);
    mostrarPokemons(listaFiltrada);

    const buttons$$ = document.body.querySelectorAll('.paginar');
    for (const iterator of buttons$$) {
        iterator.remove();
    }

    if (select$$.value != 0)
    {
       mostrarBotones();
    }
}

const cambiarPagina = (event) => {
    newLista$$.innerHTML = '';

    if (event.target.value === 'anterior')
    {
       Pagina = Pagina - 1;
    }
    else
    {
        Pagina = Pagina + 1;
    }

    const select$$ = document.body.querySelector("select");
    let desde = Pagina * select$$.value;
    let cuantos = select$$.value;
    listaFiltrada = [];

    for (index = desde; index <= desde + cuantos; index++)
     {
        if (index >= listaPokemons.length)
           break;
           
        listaFiltrada.push(listaPokemons[index]);  

     }
    mostrarPokemons(listaFiltrada);

    const buttons$$ = document.body.querySelectorAll('.paginar');
    for (const iterator of buttons$$) {
        iterator.remove();
    }

    if (select$$.value != 0)
    {
       mostrarBotones();
    }
}

const mostrarBotones = () => {
    const beforeDiv$$ = document.body.querySelector('.container');

    console.log(Pagina);

    if (Pagina > 0)
    {
        const newButtonSig$$ = document.createElement('button');
        newButtonSig$$.classList.add('paginar');
        newButtonSig$$.value = 'anterior';
        newButtonSig$$.textContent = 'Pag. anterior';
        newButtonSig$$.addEventListener('click', cambiarPagina);
    
        document.body.insertBefore(newButtonSig$$, beforeDiv$$)
    }
    const select$$ = document.body.querySelector("select");
    let cuantos = (Pagina + 1) * select$$.value;
    console.log(cuantos);

    if (cuantos < listaPokemons.length)
     {
       const newButtonSig$$ = document.createElement('button');
       newButtonSig$$.classList.add('paginar');
       newButtonSig$$.value = 'siguiente';
       newButtonSig$$.textContent = 'Pag. siguiente';
       newButtonSig$$.addEventListener('click', cambiarPagina);

       document.body.insertBefore(newButtonSig$$, beforeDiv$$)
     }
}


const filtrarPokemons = (event) => {
    newLista$$.innerHTML = '';
    Pagina = 0;

    const buttons$$ = document.body.querySelectorAll('button');
    for (const iterator of buttons$$) {
        iterator.remove();
    }

    const select$$ = document.body.querySelector("select");
    select$$.value = "0";

    if (event.target.value.trim().length == 0)
       listaFiltrada = [...listaPokemons] 
    else
        listaFiltrada = listaPokemons.filter
           ( personaje => personaje.name.toLowerCase().includes(event.target.value.toLowerCase()) );

    mostrarPokemons(listaFiltrada);
}

const mostrarFiltros = () => {
    const beforeDiv$$ = document.body.querySelector('.container');

    const newDiv$$ = document.createElement('div');
    newDiv$$.classList.add("filtros");
    newDiv$$.style.display = 'flex';
    newDiv$$.style.flexDirection = 'row';
    newDiv$$.style.justifyContent = 'start';
    newDiv$$.style.alignContent = 'center';

    const newP1$$ = document.createElement('div');
    newP1$$.textContent = 'Indica cuantos pokemos quieres mostrar:'
    const newP2$$ = document.createElement('div');
    newP2$$.textContent = 'Filtrado por nombre:'

    // paginacion:
    let select = document.createElement("select");
    select.addEventListener('input', paginarPokemons);
    select.style.width = '100px';
    select.style.height = '20px';
 
    let option1 = document.createElement("option");
    option1.setAttribute("value", "0");
    let option1Texto = document.createTextNode("Todos");
    option1.appendChild(option1Texto);
 
    let option2 = document.createElement("option");
    option2.setAttribute("value", "10");
    let option2Texto = document.createTextNode("10 Pokemon");
    option2.appendChild(option2Texto);
 
    let option3 = document.createElement("option");
    option3.setAttribute("value", "20");
    let option3Texto = document.createTextNode("20 Pokemon");
    option3.appendChild(option3Texto);

    let option4 = document.createElement("option");
    option4.setAttribute("value", "30");
    let option4Texto = document.createTextNode("30 Pokemon");
    option4.appendChild(option4Texto);


    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
 

    // filtro por nombre:
    const newInput$$ = document.createElement('input');
    newInput$$.type = 'text';
    newInput$$.value = '';
    newInput$$.style.width = '200px';
    newInput$$.style.height = '20px';
    newInput$$.addEventListener('input', filtrarPokemons);


    // añado los datos.
    newDiv$$.appendChild(newP1$$);
    newDiv$$.appendChild(select);
    newDiv$$.appendChild(newP2$$);
    newDiv$$.appendChild(newInput$$);
    document.body.insertBefore(newDiv$$,beforeDiv$$);
}

const volverLista = () => {
    newLista$$.innerHTML = '';
    mostrarPokemons(listaFiltrada) ;
}

const verDetalle = (event) => {
    const nodo$$ = event.target.parentNode;
    newLista$$.innerHTML = '';

    const detallePokemon = listaPokemons.find(pokemon => pokemon.id == nodo$$.value)
    console.log(detallePokemon);

    const newIL$$ = document.createElement('il');

    // console.log(iterator);
    const newDivImagen$$ = document.createElement('div');
    newDivImagen$$.className = 'card';
    newDivImagen$$.value = detallePokemon.id;

    const newImagen$$ = document.createElement('img');
    newImagen$$.className = 'card-image';
    newImagen$$.src = detallePokemon.sprites.front_default;
    newDivImagen$$.appendChild(newImagen$$)

    const newTitle$$ = document.createElement('p');
    newTitle$$.className = 'card-title';
    newTitle$$.textContent = 'Tipo de pokemon';
    newDivImagen$$.appendChild(newTitle$$)

    for (const iterator of detallePokemon.types) {
        const newTitle2$$ = document.createElement('p');
        newTitle2$$.className = 'card-subtitle';

        console.log(iterator)
        newTitle2$$.textContent = iterator.type.name;
        newDivImagen$$.appendChild(newTitle2$$)
    }

    const newTitle1$$ = document.createElement('p');
    newTitle1$$.className = 'card-title';
    newTitle1$$.textContent = 'Habilidades';
    newDivImagen$$.appendChild(newTitle1$$)

    for (const iterator of detallePokemon.abilities) {
        const newTitle3$$ = document.createElement('p');
        newTitle3$$.className = 'card-subtitle';

        console.log(iterator)
        newTitle3$$.textContent = iterator.ability.name;
        newDivImagen$$.appendChild(newTitle3$$)
    }

    const newButtonSig$$ = document.createElement('button');
    newButtonSig$$.classList.add('bImagen');
    newButtonSig$$.textContent = 'Atras';
    newButtonSig$$.addEventListener('click', volverLista);
    newDivImagen$$.appendChild(newButtonSig$$)

    newIL$$.appendChild(newDivImagen$$)
    newLista$$.appendChild(newIL$$)

}


const mostrarPokemons = (listaAuxPokemon) => {
     const select$$ = document.body.querySelector("select");
     let index = 0
 
     for (const iterator of listaAuxPokemon) {
        const newIL$$ = document.createElement('il');

        // console.log(iterator);
        const newDivImagen$$ = document.createElement('div');
        newDivImagen$$.className = 'card';
        newDivImagen$$.value = iterator.id;

        const newTitle$$ = document.createElement('p');
        newTitle$$.className = 'card-title';
        newTitle$$.textContent = iterator.id;

        const newSubtitle$$ = document.createElement('p');
        newSubtitle$$.className = 'card-subtitle';
        newSubtitle$$.textContent = iterator.name;

        const newImagen$$ = document.createElement('img');
        newImagen$$.className = 'card-image';
        newImagen$$.src = iterator.sprites.front_default;

        const newButtonSig$$ = document.createElement('button');
        newButtonSig$$.classList.add('bImagen');
        newButtonSig$$.textContent = 'Detalle';
        newButtonSig$$.addEventListener('click', verDetalle);

        newDivImagen$$.appendChild(newImagen$$)
        newDivImagen$$.appendChild(newTitle$$)
        newDivImagen$$.appendChild(newSubtitle$$)
        newDivImagen$$.appendChild(newButtonSig$$)

        newIL$$.appendChild(newDivImagen$$)
        newLista$$.appendChild(newIL$$)

        index = index +1;
        if (select$$.value != 0)
        {
           if ( index == select$$.value)
            {
               break;
            }   
        }
    }
}


async function getDetailPokemons(pokemons)
 { 
   const pokemonsPromises = pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json())) 
   
   const detailPokemons = await Promise.all(pokemonsPromises); 
//    console.log(detailPokemons) ;

   listaPokemons  = [...detailPokemons];
   listaPokemons.sort ((a, b) => {
       return a.id - a.id;
    });

   Pagina = 0;
   mostrarFiltros(); 
   listaFiltrada = [...listaPokemons]
   mostrarPokemons(listaPokemons) ;
 } 

async function getPokemons()
 { 
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=30") 
	const resPokemons = await res.json(); 
	getDetailPokemons(resPokemons.results); 
 } 

getPokemons()

