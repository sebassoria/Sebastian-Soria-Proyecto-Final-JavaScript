/*En este simulador recorro el array buscando un disco en particular, si no lo encuentro,
puedo encargar el disco o ignorarlo y hacer otra consulta si asi lo deseo.
Al final me muestra los discos encargados
*/

//Array de objetos discos en stock

class vinilos {
  constructor(tapa, artista, album, anio, precio) {
    this.tapa = tapa;
    this.artista = artista;
    this.album = album;
    this.anio = anio;
    this.precio = precio;
  }
}
let discos = [];
discos.push(
  new vinilos(
    "img/tapas/d12.jpg",
    "George Harrison",
    "living in the material world",
    1973,
    6000
  )
);
discos.push(
  new vinilos(
    "img/tapas/d3.jpg",
    "Pescado rabioso",
    "pescado rabioso 2",
    1973,
    7000
  )
);
discos.push(
  new vinilos("img/tapas/d1.jpg", "David Bowie", "the next day", 2013, 5000)
);
discos.push(
  new vinilos("img/tapas/d9.jpg", "Gorillaz", "demon day", 2005, 5700)
);
discos.push(
  new vinilos("img/tapas/d15.jpeg", "Yes", "close to the edge", 1972, 6300)
);
discos.push(
  new vinilos("img/tapas/d6.jpg", "Radiohead", "ok computer", 1997, 6500)
);
discos.push(
  new vinilos(
    "img/tapas/d5.jpg",
    "Pink floyd",
    "the dark side of the moon",
    1973,
    6900
  )
);
discos.push(
  new vinilos(
    "img/tapas/d8.jpg",
    "Led zeppelin",
    "houses of the holy",
    1973,
    6800
  )
);
discos.push(
  new vinilos(
    "img/tapas/d10.jpg",
    "Luis Alberto Spinetta",
    "para los arboles",
    2003,
    7100
  )
);
discos.push(
  new vinilos("img/tapas/d2.jpg", "Anderson.Paak", "malibu", 2016, 5500)
);
discos.push(
  new vinilos("img/tapas/d7.jpg", "David Bowie", "heathen", 2002, 4900)
);
discos.push(
  new vinilos("img/tapas/d4.webp", "The Beatles", "abbey road", 1969, 6700)
);
console.log(discos);

//fin array

const registroUsuarios = [];

const usuario = document.getElementById("usuario");
const email = document.getElementById("email");

const datos = document.getElementById("form1");

datos.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const valorUsuario = usuario.value;
  const valorEmail = email.value;

  const usuarios = {
    Nombre: valorUsuario,
    Correo: valorEmail,
  };

  registroUsuarios.push(usuarios);

  console.log(registroUsuarios);
});

const encargues = [];

const inputArtista = document.getElementById("input-artista");
const inputAlbum = document.getElementById("input-album");
const inputAnio = document.getElementById("input-anio");

const formulario = document.getElementById("form2");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const art = inputArtista.value;
  const album = inputAlbum.value;
  const anio = inputAnio.value;

  encargues.push(new vinilos("img/disc1.png", art, album, anio, "a definir"));
  // console.log(encargues);
  formulario.reset();
});

const pedidoUsuario = [];

const finalizar = document.getElementById("finalizar");

finalizar.addEventListener("click", () => {
  pedidoUsuario.push(registroUsuarios);
  pedidoUsuario.push(encargues);

  console.log(pedidoUsuario);

  mensajeCargado(registroUsuarios);
});

const mensajeCargado = () => {
  const mensajeFinal = document.getElementById("mensajeModal");
  mensajeFinal.innerHTML = `${registroUsuarios[0].Nombre},
  usted ha encargado ${encargues.length} discos.<br>
  pronto le enviaremos un email.`;
};

//funcion para pushear el encargue
/*function agrDisco() {
  let artista = prompt("Por favor ingrese el Nombre del artista");
  let album = prompt("Por favor ingrese el Nombre del album");
  let anio = Number(prompt("Por favor ingrese el año del album"));
  let precio = Number(
    prompt("Por favor ingrese un precio estimado del vinilo")
  );

  album = album.toLowerCase();

  encargues.push(new vinilos("img/disc1.png", artista, album, anio, precio));
}*/

// let consulta;
// let encargar;

//funcion de busqueda
/*function busqueda() {
  let buscar = prompt("Que album esta buscando?");
  //aca aplico .find para recorrer el array discos buscando un album
  const encontrado = discos.find((elemento) => {
    return elemento.album === buscar.toLowerCase();
  });
  //opcion de encargar un disco
  if (encontrado === undefined) {
    encargar = prompt(
      "El album " +
        buscar +
        " no esta en stock, quiere encargar ese disco? SI/NO"
    );
    if (encargar.toUpperCase() === "SI") {
      agrDisco();
    } else {
      console.log("solo consulta");
    }
  } else {
    alert("El album " + encontrado.album + " esta disponible");
  }
}*/

// busqueda();

//funcion de nueva consulta
/*function otraConsulta() {
  consulta = prompt("Quiere hacer otra consulta? SI/NO");
  if (consulta.toUpperCase() === "SI") {
    encontrado = false;
    busqueda();
    otraConsulta();
  } else {
    console.log(discos);
  }
}*/
// otraConsulta();

// console.log(encargues);

//aca aplico .forEach para mostrar los discos encargados
/*encargues.forEach((el) => {
  console.log(el.album);
  alert(
    "Usted ha solicitado el disco: " +
      el.album +
      " del artista: " +
      el.artista +
      ", pronto le enviaremos novedades."
  );
});*/

let carrito = [];

//armado de grilla con objetos del array
const productos = document.getElementById("galProd");

discos.forEach((disc) => {
  const divProd = document.createElement("div");
  divProd.className = "col-lg-3 col-md-6 col-sd-12 gal__item";
  divProd.innerHTML = `<div><img src="${disc.tapa}"/>
  <h4>${disc.artista}</h4>
  <p>${disc.album}</p>
  <p>Año: ${disc.anio}</p>
  <h6>Precio: $${disc.precio}</h6>
  <button type="button" class="btn btn-warning" id="btn-compra">Comprar</button></div>`;

  // divProd.innerHTML = `<div class="card" style="width: 18rem;">
  // <img src="${disc.tapa}" class="card-img-top" alt="...">
  // <div class="card-body">
  //   <h5 class="card-title">${disc.artista}</h5>
  //   <p class="card-text">${disc.album}</p>
  //   <p class="card-text">${disc.anio}</p>
  //   <h6>Precio: $${disc.precio}</h6>
  //   <button type="button" class="btn btn-warning">Comprar</button>
  // </div>
  // </div>`;

  productos.append(divProd);
});

const agrCarrito = document.getElementById("btn-compra");

agrCarrito.addEventListener("click", (ev) => {
  ev.preventDefault();
  // carrito.push(vinilos);
  // console.log(carrito);
  console.log("hola mundo");
});
