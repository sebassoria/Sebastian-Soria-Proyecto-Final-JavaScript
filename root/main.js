//Array de objetos discos en stock

class vinilos {
  constructor(tapa, artista, album, anio, precio, id) {
    this.tapa = tapa;
    this.artista = artista;
    this.album = album;
    this.anio = anio;
    this.precio = precio;
    this.id = id;
  }
}
let discos = [];
discos.push(
  new vinilos(
    "img/tapas/d12.jpg",
    "George Harrison",
    "living in the material world",
    1973,
    6000,
    1
  )
);
discos.push(
  new vinilos(
    "img/tapas/d3.jpg",
    "Pescado rabioso",
    "pescado rabioso 2",
    1973,
    7000,
    2
  )
);
discos.push(
  new vinilos("img/tapas/d1.jpg", "David Bowie", "the next day", 2013, 5000, 3)
);
discos.push(
  new vinilos("img/tapas/d9.jpg", "Gorillaz", "demon day", 2005, 5700, 4)
);
discos.push(
  new vinilos("img/tapas/d15.jpeg", "Yes", "close to the edge", 1972, 6300, 5)
);
discos.push(
  new vinilos("img/tapas/d6.jpg", "Radiohead", "ok computer", 1997, 6500, 6)
);
discos.push(
  new vinilos(
    "img/tapas/d5.jpg",
    "Pink floyd",
    "the dark side of the moon",
    1973,
    6900,
    7
  )
);
discos.push(
  new vinilos(
    "img/tapas/d8.jpg",
    "Led zeppelin",
    "houses of the holy",
    1973,
    6800,
    8
  )
);
discos.push(
  new vinilos(
    "img/tapas/d10.jpg",
    "Luis Alberto Spinetta",
    "para los arboles",
    2003,
    7100,
    9
  )
);
discos.push(
  new vinilos("img/tapas/d2.jpg", "Anderson.Paak", "malibu", 2016, 5500, 10)
);
discos.push(
  new vinilos("img/tapas/d7.jpg", "David Bowie", "heathen", 2002, 4900, 11)
);
discos.push(
  new vinilos("img/tapas/d4.webp", "The Beatles", "abbey road", 1969, 6700, 12)
);
console.log(discos);

//fin array

//Registro de usuario para encargar discos
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

//datos de discos a encargar
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

//boton finalizar
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

//armado de grilla con objetos del array

let carrito = [];

const productos = document.getElementById("galProd");
const vaciar = document.getElementById("vaciar");
const addCarrito = document.getElementById("add");

discos.forEach((disc) => {
  const divProd = document.createElement("div");
  divProd.className = "col-lg-2 col-md-3 col-sd-6 gal__item";
  divProd.innerHTML = `<div><img src="${disc.tapa}"/>
  <h4>${disc.artista}</h4>
  <p>${disc.album}</p>
  <p>Año: ${disc.anio}</p>
  <h6>Precio: $${disc.precio}</h6>
  <button type="button" class="btn btn-warning" onClick="agregarCarrito(${disc.id})">Agregar al carrito</button></div>`;
  productos.append(divProd);
});

//funcion para agregar al carrito
const agregarCarrito = (id) => {
  const disc = discos.find((disco) => disco.id === id);
  carrito.push(disc);
  actCarrito();
  console.log(carrito);
};

//funcion para borrar item agregado al carrito
const borrarItem = (id) => {
  const item = carrito.find((disco) => disco.id === id);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actCarrito();
};

const contCarrito = document.getElementById("contador-carrito");
const total = document.getElementById("total");

//funcion para actualizar el estado de la informacion del carrito en el HTML y hacer conteos
const actCarrito = () => {
  addCarrito.innerHTML = "";

  carrito.forEach((disc) => {
    const mostProd = document.createElement("div");
    mostProd.className = "row";
    mostProd.innerHTML = `<div class="col-6">
  <p>${disc.artista} - "${disc.album}"</p>
  <hr>
</div> <div class="col-2">
<p> $${disc.precio}</p>
<hr>
</div><div class="col-2">
<p>1</p>
<hr>
</div>
<div class="col-2">
<button type="button" class="btn-eliminar" onClick="borrarItem(${disc.id})"><i class="fa-solid fa-trash-can"></i></button>

</div>`;
    addCarrito.append(mostProd);
  });
  contCarrito.innerText = carrito.length;
  total.innerText = carrito.reduce((ac, disc) => ac + disc.precio, 0);
};

//evento para vaciar el carrito
vaciar.addEventListener("click", () => {
  carrito.length = 0;
  actCarrito();
  console.log(carrito);
});
