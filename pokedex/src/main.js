import "./style.css"; // importacion del archivo css

const app = document.querySelector("#app"); // crear una contante y usar querySelector para coger el div con ese id
app.classList = "container"; // ponerle una clase al div

function createButtonNext() {
  // crear una funcion que crea un elemento botón.
  const buttonNext = document.createElement("button"); // crear el boton usando createElement.
  buttonNext.textContent = "Next"; // añadir el contenido al boton en este caso el string next.

  return buttonNext; // devolver la constante que crea el botón.
}
const buttonNext = createButtonNext(); // crear una constante que es igual al resultado de la función anterior.

function createButtonprevius() {
  // crear otra funcion que crea un elemento boton
  const buttonPrevius = document.createElement("button"); // crear el boton usando createElement.
  buttonPrevius.textContent = "Previus"; // añadir el contenido al boton en este caso el string Previus.

  return buttonPrevius; // devolver la constante que crea el botón.
}
const buttonPrevius = createButtonprevius(); // crear una constante que es igual al resultado de la función anterior.

function container() {
  // crear una funcion que crea el elemento contenedor
  const contenedor = document.createElement("div"); // crear un div
  contenedor.classList = "container"; // poner la clase al div
  return contenedor; // devolver la constante que contiene el div
}

const contenedor = container(); // crear una constante que es igual al resultado de la función anterior.

function createText() {
  // crear una funcion que crea un div
  const texto = document.createElement("div"); // crear el div
  texto.innerHTML = `<img src = "./src/Diseño sin título.svg">`; //añadir el contenido al div en este caso una imagen.
  texto.classList = "container titulo"; //Ponerle clases a ese div
  return texto; // devolver el div
}
const texto = createText(); // crear una constante que es igual al resultado de la función anterior

function createInterfaz() {
  // crear una funcion que crea un div
  const interfaz = document.createElement("div"); // crear el div
  interfaz.classList = "box-pokemon invisible "; //Ponerle clases a ese div
  return interfaz; //devolver el div
}
const box = createInterfaz(); // crear una constante que es igual al resultado de la función anterior

box.addEventListener("click", () => {
  // usar un evento tipo click en el elemento box resolvemos que hacel el click en una arrow function
  box.classList.add("invisible"); // añade la clase invisible a box
  box.classList.remove("visible"); // elimina la clase visible a box
});

let offset = 0; // crear una variable que inicializa en 0 llamada offset. Más tarde se usara en la url del fecth de abajo
const limit = 24; // crear una constante que inicializa en 12 llamada limit. Más tarde se usara en la url del fecth de abajo

async function obtenerPokemon() {
  // crear una funcion asincrona tipo async-await

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  ); // constante response que guarda la respuesta de la peticion fecth a la api
  //la api tiene dentro la variable offset anterior para saber que inicializa en 0 y el limit en 12 para saber que muestre 12 pokemon

  try {
    // creamos un try para manejar erros posibles

    if (!response.ok) {
      // condicional if que dice que si la respuesta no es Ok lanzara un nuevo error
      throw new Error("Error: ¡Desaparecieron los pokemons!");
    }
    const data = await response.json(); // creamos la cconstante data que almacena el contenido de response pasado a json.

    const details = await Promise.all(
      data.results.map((poke) => fetch(poke.url).then((r) => r.json()))
    ); // creamos la constante details que es igual a un
    // array de promesas en las que en data obtenomos el results y le hacemos un map que resolvemos con un arrow function en la que hacemos un peticion con fetch a la url usanmos .then para manejar el resultado
    // y la respuesta seria la respuesta en formato json
    contenedor.innerHTML = ""; // añadimos un inner vacio a contenedor para borrar las card antiguas al llamar a las nuevas
    mostrasPokemon(details); // llamamos a la funcion mostrar pokemon con el parametro details
  } catch (error) {
    // ponemos un catch por si la respuesta es rechazada y muestra un error en la consola
    console.log("Ha ocurrido un error inesperado");
  }
}

obtenerPokemon(); // llamamos a la funcion anterior

app.appendChild(texto); // añadimos al dom texto haciendolo hijo de app
app.appendChild(contenedor); // añadimos al dom contenedor haciendolo hijo de app
app.appendChild(box); // añadimos al dom box haciendolo hijo de app
app.appendChild(buttonPrevius); // añadimos al dom buttonPrevius haciendolo hijo de app
app.appendChild(buttonNext); // añadimos al dom buttonNext haciendolo hijo de app

async function mostrasPokemon(pokemons) {
  // creamos otra funcion asincrona tipo asyn-await con el parametro pokemons
  pokemons.forEach((pokemon) => {
    // usamos el metodo forEach en pokemons y resolvemos con otra arrow function
    const card = document.createElement("div"); // en la que creamos una constante card con document.createElement y hacemos un div
    card.classList = "pokeCard"; // le añadimos la clase pokeCard

    // a card le añadimos contenido html con el metodo inner ponemos un h2 en donde sacamos el contenido del json que pedimos con el fetch
    // concretamente el name que esta refeljado como tal en el json, ponemos el metod toUpperCase para que lo pase a mayuscula
    //luego ponemos una imagen que sacamos del json tambien en el aparatado sprites en la secion other en su subseccion offical-artwork y cogemos la front default
    // creamos un parrafo donde ponemos la altura sacado del json
    // creamos un parrafo donde ponemos el peso sacado del json
    // como hemos recorrido los array de datos con el forEach en todos los casos anteriores ponemos pokemon.(propiedad que queremos) y asi obtenemos lo que queremos de la respuesta de la api
    card.innerHTML = ` 
    <h2>${pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)}</h2> 
    <img class="circulo" src ="${
      pokemon.sprites.other["official-artwork"].front_default
    }">
    <p>Number: ${pokemon.id}</p>
    
    `;
    // en height y weight divimos entre 1o el resultado y usamos el metodo toFixed para quitar los decimales eso lo hacemos por que queremos los resultados en kg y metros
    contenedor.appendChild(card); // añadimos a contendor card que contiene todo lo anterior

    card.addEventListener("click", () => {
      // a card le ponemos un evento de escucha click
      box.classList.toggle("visible"); // donde box tendra y perdera la calse visible por el toogle

      // aqui añadiremos a box como en el ejemplo anterior las etiquetas html y el contenido recogido del json de la respuesta de la api
      // este sera el contenido de div box que aparecera al clickar sobre una card
      box.innerHTML = `
      <div>
      
      <div>
        <h1 class= "name-box" > ${
          pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)
        }</h1>
        </div>
        <div>
        <img class= "img-box" src="${
          pokemon.sprites.other["official-artwork"].front_default
        }">
        </div>
        <div>
         
        </div>
        <div class="box-right">
        <p class="type">Type: ${pokemon.types
          .map((t) => t.type.name)
          .join(", ")}</p>
           <p class="type">Height: ${(pokemon.height / 10).toFixed(1)} M</p>
          <p class="type">Weight: ${(pokemon.weight / 10).toFixed(1)} Kg</p>
        </div>
        </div>

        <div>
        <div>
         
        <div class = "stats"><ul><strong>STATS:</strong><br> ${pokemon.stats
          .map((s) => `${s.stat.name.toUpperCase()}: ${s.base_stat}`)
          .join(", ")}</ul></div>
        </div>
        </div>
      `;
    });
  });
}

// haremos metodos de escucha tipo click a los botones next y previus
buttonNext.addEventListener("click", () => {
  offset += limit; // a offset le sumaremos el limit
  obtenerPokemon();
});

buttonPrevius.addEventListener("click", () => {
  if (offset >= limit) {
    // si offset es igual o mayor a limit le restaremos el limite al offset
    offset -= limit;
    obtenerPokemon();
  }
});
