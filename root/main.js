//--------------------------------------------------------------------------
//fetch

const info = document.getElementById("gal-info")
fetch("https://api.seatgeek.com/2/events?client_id=Mjg3NDA3NDN8MTY2MTcyNTQ4MS41NTc4MDI3&client_secret=6d096b6a510ccc4fe3ca6786ad5b805e3976fe09043c7faafbfd203b90c387e6")
  .then((res) => res.json())
  .then((data) => {

    console.log(data)

    const conciertos = data.events.filter(elem => {
      return elem.type === 'concert'
    });

    console.log(conciertos)

    conciertos.forEach(element => {
      const div = document.createElement("div")
      div.className = "col-lg-3 col-md-6 cont-cards"
      div.innerHTML = `
          <div class="card" style="width: 18rem; height: 100%;">
          <img src="${element.performers[0].image}" class="card-img-top" alt="imagen de concierto">
            <div class="card-body">
              <h5 class="card-title api-art">${element.title}</h5>
              <p class="card-text"><b>Lugar: </b>${element.venue.name}</p>
              <p class="card-text"><b>Ciudad, Pais: </b>${element.venue.city}, ${element.venue.country}</p>
              <p class="card-text"><b>Tickets: </b><a class="ticket" href="${element.venue.url}">${element.venue.url}</a></p>
            </div>
          </div>`
      info.append(div)
    });


  });


//--------------------------------------------------------------------------
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
  new vinilos("img/tapas/d12.webp", "George Harrison", "living in the material world", 1973, 6000, 1)
);
discos.push(
  new vinilos("img/tapas/d3.webp", "Pescado rabioso", "pescado rabioso 2", 1973, 7000, 2)
);
discos.push(
  new vinilos("img/tapas/d1.webp", "David Bowie", "the next day", 2013, 5000, 3)
);
discos.push(
  new vinilos("img/tapas/d9.webp", "Gorillaz", "demon day", 2005, 5700, 4)
);
discos.push(
  new vinilos("img/tapas/d15.webp", "Yes", "close to the edge", 1972, 6300, 5)
);
discos.push(
  new vinilos("img/tapas/d6.webp", "Radiohead", "ok computer", 1997, 6500, 6)
);
discos.push(
  new vinilos("img/tapas/d5.webp", "Pink floyd", "the dark side of the moon", 1973, 6900, 7)
);
discos.push(
  new vinilos("img/tapas/d8.webp", "Led zeppelin", "houses of the holy", 1973, 6800, 8)
);
discos.push(
  new vinilos("img/tapas/d10.webp", "Luis Alberto Spinetta", "para los arboles", 2003, 7100, 9)
);
discos.push(
  new vinilos("img/tapas/d2.webp", "Anderson.Paak", "malibu", 2016, 5500, 10)
);
discos.push(
  new vinilos("img/tapas/d7.webp", "David Bowie", "heathen", 2002, 4900, 11)
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

const faltaAlgunDato = () => {
  Swal.fire({
    icon: "warning",
    title: "Falto completar algun campo",
    text: "Por favor, ingrese todos los datos requeridos",
  });
}

datos.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (usuario.value === "" || email.value === "") {
    faltaAlgunDato()
  } else {
    const valorUsuario = usuario.value;
    const valorEmail = email.value;

    const usuarios = {
      Nombre: valorUsuario,
      Correo: valorEmail,
    };
    registroUsuarios.push(usuarios);

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
const inputAnio = document.getElementById("input-anio");
const formulario = document.getElementById("form2");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputArtista.value === "" || inputAlbum.value === "" || inputAnio.value === "") {
    faltaAlgunDato()
  } else {
    const art = inputArtista.value;
    const album = inputAlbum.value;
    const anio = inputAnio.value;

    encargues.push(new vinilos("img/disc1.svg", art, album, anio, "a definir"));
    console.log(encargues);
    formulario.reset();
  };
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

let carrito = [];

//en este evento si encuentra en localstorage, parsea con JSON y recupera en el carrito
document.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actCarrito();
  }
})

//armado de grilla con objetos del array
const productos = document.getElementById("galProd");

discos.forEach((disc) => {
  const divProd = document.createElement("div");
  divProd.className = "col-lg-3 col-md-4 col-sm-6 gal__item";
  divProd.innerHTML = `<div><img src="${disc.tapa}"/>
  <h4>${disc.artista}</h4>
  <p>${disc.album}</p>
  <p>Año: ${disc.anio}</p>
  <h6>Precio: $${disc.precio}</h6>
  <button type="button" class="btn btn-warning" onClick="agregarCarrito(${disc.id})">Comprar <i class="fas fa-shopping-cart"></button></div>`;
  productos.append(divProd);
});

//--------------------------------------------------------------------------
//funcionalidad carrito

//funcion para actualizar el estado de la informacion del carrito en el HTML y hacer conteos
const btnVaciar = document.getElementById("btn-vaciar");
const numCarrito = document.getElementById("num-carrito");
const botonFinalizar = document.getElementById("modal-footer");
const addCarrito = document.getElementById("add");

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
    <button type="button" class="btn-eliminar" onClick="borrarItem(${disc.id})"><i class="fa-regular fa-circle-xmark"></i></button>
    </div>`;

    addCarrito.append(mostProd);
  });

  // condicion para mostrar u ocultar el boton de vaciar el carrito y finalizar compra
  const total = carrito.reduce((ac, disc) => ac + disc.precio, 0);

  if (carrito.length !== 0) {
    btnVaciar.innerHTML = ""
    const mostrVaciar = document.createElement("div")
    mostrVaciar.className = "row"
    mostrVaciar.innerHTML =
      `<div class="col-6" >
      <button type="button" class="btn btn-warning" onClick="vaciar()">Vaciar carrito</button>
    </div>
    <div class="col-3">
      <h5 class="precio">Precio total: $<span>${total}</span></h5>
    </div>
    <div class="col-3">
      <h5>Cant. total: <span>${carrito.length}</span></h5>
    </div>`
    btnVaciar.append(mostrVaciar);
    

    botonFinalizar.innerHTML = ""

    const mostrFinalizar = document.createElement("div")
    mostrFinalizar.innerHTML = `
    <button type="button" class="btn btn-primary" onClick="finalizarCompra()">Finalizar compra</button>`
    botonFinalizar.append(mostrFinalizar);
  } else {
    btnVaciar.innerHTML = "Carrito vacio"
    botonFinalizar.innerHTML = ""
  }

  numCarrito.innerText = carrito.length;

  localStorage.setItem("carrito",JSON.stringify(carrito));

};



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

//funcion para vaciar el carrito
const vaciar = () => {
  carrito.length = 0;
  actCarrito();
  console.log(carrito);
}

// funcion para el boton de finalizar compra
const finalizarCompra = () => {
  Swal.fire({
    title: 'Desea terminar esta compra?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      vaciar();
      Swal.fire(
        'Felicidades!',
        'Su compra ha sido exitosa',
        'success'
      )
    }
  })
};

//Modal del carrito
const modalCarrito = document.getElementById("modal-carrito");

modalCarrito.addEventListener('click', (even) => {
  even.preventDefault();
  actCarrito();
});

//--------------------------------------------------------------------------
//calculo de pago en cuotas

const calcOk = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Excelente!!",
    showConfirmButton: false,
    timer: 1200,
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

  if (cantCuotas === 3 && monto != "") {
    calculoInteres(monto, 0.05);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` ${cantCuotas} cuotas de `;
    calcOk();
  } else if (cantCuotas === 6 && monto != "") {
    calculoInteres(monto, 0.1);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` ${cantCuotas} cuotas de `;
    calcOk();
  } else if (cantCuotas === 12 && monto != "") {
    calculoInteres(monto, 0.15);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` ${cantCuotas} cuotas de `;
    calcOk();
  } else if (cantCuotas === 18 && monto != "") {
    calculoInteres(monto, 0.2);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` ${cantCuotas} cuotas de `;
    calcOk();
  } else {
    interes.innerText = " No calculado";
    plan.innerText = " No calculado";
    planCuota.innerText = ``;
    resultado = undefined;
    cuota = undefined;
    if (monto == "") {
      Swal.fire({
        icon: "error",
        title: "Ups!",
        text: "No ha ingresado un monto",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Calculo no permitido!",
        text: "Recuerde elegir cantidad de cuotas",
      });
    }
  }

  resultado
    ?
    console.log(resultado) :
    console.log("no se puede obtener un resultado");
  resultado ? console.log(cuota) : console.log("no se puede calcular cuotas");
};