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

//array de discos
let discos = [];

discos.push(
  new vinilos("img/tapas/d12.jpg", "George Harrison", "living in the material world", 1973, 6000, 1)
);
discos.push(
  new vinilos("img/tapas/d3.jpg", "Pescado rabioso", "pescado rabioso 2", 1973, 7000, 2)
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
  new vinilos("img/tapas/d5.jpg", "Pink floyd", "the dark side of the moon", 1973, 6900, 7)
);
discos.push(
  new vinilos("img/tapas/d8.jpg", "Led zeppelin", "houses of the holy", 1973, 6800, 8)
);
discos.push(
  new vinilos("img/tapas/d10.jpg", "Luis Alberto Spinetta", "para los arboles", 2003, 7100, 9)
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

//--------------------------------------------------------------------------
//Registro de usuario para encargar discos
const registroUsuarios = [];

const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const datos = document.getElementById("form1");

datos.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (usuario.value === "" || email.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Falto completar algun campo",
      text: "Ingrese todos sus datos personales",
    });
  } else {
    const valorUsuario = usuario.value;
    const valorEmail = email.value;

    const usuarios = {
      Nombre: valorUsuario,
      Correo: valorEmail,
    };
    registroUsuarios.push(usuarios);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Usuario registrado",
      showConfirmButton: false,
      timer: 1100,
    });
    console.log(registroUsuarios);
  }
});

//--------------------------------------------------------------------------
//para encargar discos
const encargues = [];

const inputArtista = document.getElementById("input-artista");
const inputAlbum = document.getElementById("input-album");
const inputAnio = Number(document.getElementById("input-anio"));
const formulario = document.getElementById("form2");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const art = inputArtista.value;
  const album = inputAlbum.value;
  const anio = inputAnio.value;

  encargues.push(new vinilos("img/disc1.png", art, album, anio, "a definir"));
  console.log(encargues);
  formulario.reset();
});

//--------------------------------------------------------------------------
//boton finalizar
const pedidoUsuario = [];

const finalizar = document.getElementById("finalizar");

finalizar.addEventListener("click", (ev) => {
  ev.preventDefault();

  if (registroUsuarios.length > 0 && encargues.length > 0) {
    registroUsuarios.push(encargues);
    pedidoUsuario.push(registroUsuarios);

    console.log(pedidoUsuario);
    console.log(registroUsuarios);

    mensajeCargado(registroUsuarios);
  } else {
    Swal.fire({
      icon: "warning",
      title: "No ha completado su pedido!",
      text: "Registre sus datos y encargue al menos un disco",
    });
  }
});

//Funcion para mensaje de finalizado
const mensajeCargado = () => {
  Swal.fire({
    title: "Muchas gracias!",
    imageUrl: "img/disc-foto.webp",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
    html: `<b>${registroUsuarios[0].Nombre}</b>,
    usted ha encargado ${encargues.length} disco/s.<br>
    Pronto le enviaremos un email.`,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: true,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Listo',
    confirmButtonAriaLabel: "Thumbs up, great!",
  });
};

//--------------------------------------------------------------------------
//armado de grilla con objetos del array

const carrito = [];

const productos = document.getElementById("galProd");
const vaciar = document.getElementById("vaciar");
const addCarrito = document.getElementById("add");
const numCarrito = document.getElementById("num-carrito");

discos.forEach((disc) => {
  const divProd = document.createElement("div");
  divProd.className = "col-lg-2 col-md-3 col-sd-6 gal__item";
  divProd.innerHTML = `<div><img src="${disc.tapa}"/>
  <h4>${disc.artista}</h4>
  <p>${disc.album}</p>
  <p>Año: ${disc.anio}</p>
  <h6>Precio: $${disc.precio}</h6>
  <button type="button" class="btn btn-warning" onClick="agregarCarrito(${disc.id})">Comprar <i class="fas fa-shopping-cart"></button></div>`;
  productos.append(divProd);
});

//funcion para agregar al carrito
const agregarCarrito = (id) => {
  const disc = discos.find((disco) => disco.id === id);
  carrito.push(disc);
  actCarrito();
  
  console.log(carrito);

  Toastify({
    text: "Disco agregado al carrito",
    duration: 1000,
    style: {
      background: "linear-gradient(to left, #ffb000, #764100)",
    },
    position: "center",
    offset: {
      x: 0,
      y: 200,
    },
  }).showToast();
};

//funcion para borrar item agregado al carrito
const borrarItem = (id) => {
  const item = carrito.find((disco) => disco.id === id);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actCarrito();
  console.log(carrito)
};

const contCarrito = document.getElementById("contador-carrito");
const total = document.getElementById("total");

//funcion para actualizar el estado de la informacion del carrito en el HTML y hacer conteos
const actCarrito = () => {
  addCarrito.innerHTML = "";

  carrito.forEach((disc) => {
    const mostProd = document.createElement("div");
    mostProd.className = "row";
    mostProd.innerHTML = `
    <div class="col-6">  
    <p>${disc.artista} - "${disc.album}"</p>
    <hr>
    </div> <div class="col-3">
    <p> $${disc.precio}</p>
    <hr>
    </div><div class="col-2">
    <p>1</p>
    <hr>
    </div>
    <div class="col-1 cont-eliminar">
    <button type="button" class="btn-eliminar" onClick="borrarItem(${disc.id})"><i class="fa-solid fa-trash-can"></i></button>
    </div>`;
    addCarrito.append(mostProd);
  });

  contCarrito.innerText = carrito.length;
  numCarrito.innerText = carrito.length;
  total.innerText = carrito.reduce((ac, disc) => ac + disc.precio, 0);
};

//evento para vaciar el carrito
vaciar.addEventListener("click", (evt) => {
  evt.preventDefault();
  carrito.length = 0;
  actCarrito();
  console.log(carrito);
});


const modalCarrito = document.getElementById("modal-carrito");

modalCarrito.addEventListener('click',(even)=>{
  even.preventDefault();
  actCarrito(); 
});

//--------------------------------------------------------------------------
//calculo de pago en cuotas

const calcOk = ()=>{
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Bien hecho",
    showConfirmButton: false,
    timer: 1100,
  });
};

let resultado;
let cuota;

//funciones para sumar interes y para calcular el monto de cada cuota
const calculoInteres = (mon, interes) => (resultado = mon + mon * interes);
const cadaCuota = (total, cant) => (cuota = total / cant);

//funcion integradora
const montoInteres = (ev) => {
  ev.preventDefault();

  const monto = Number(document.getElementById("monto").value);
  const cantCuotas = Number(document.getElementById("cuotas").value);

  if (cantCuotas === 3) {
    calculoInteres(monto, 0.05);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` en ${cantCuotas} cuotas`;
    calcOk();
  } else if (cantCuotas === 6) {
    calculoInteres(monto, 0.1);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` en ${cantCuotas} cuotas`;
    calcOk();
  } else if (cantCuotas === 12) {
    calculoInteres(monto, 0.15);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` en ${cantCuotas} cuotas`;
    calcOk();
  } else if (cantCuotas === 18) {
    calculoInteres(monto, 0.2);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` en ${cantCuotas} cuotas`;
    calcOk();
  } else {
    interes.innerText = " No calculado";
    plan.innerText = " No calculado";
    planCuota.innerText = ``;
    resultado = undefined;
    cuota = undefined;
    Swal.fire({
      icon: "error",
      title: "Calculo no permitido!",
      text: "Recuerde elegir entre 3, 6, 12 o 18 cuotas",
    });
  }

  resultado
    ?
    console.log(resultado) :
    console.log("no se puede obtener un resultado");

  resultado ? console.log(cuota) : console.log("no se puede calcular cuotas");

  resultado ? form3.reset() : (cuotas.value = "");
};