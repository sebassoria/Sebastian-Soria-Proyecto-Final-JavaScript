
//--------------------------------------------------------------------------
//fetch

const info = document.getElementById("gal-info")

 fetch("https://api.seatgeek.com/2/events?client_id=Mjg3NDA3NDN8MTY2MTcyNTQ4MS41NTc4MDI3&client_secret=6d096b6a510ccc4fe3ca6786ad5b805e3976fe09043c7faafbfd203b90c387e6")
  .then((res) => res.json())
  .then((data) => {

    const conciertos = data.events.filter(elem => {
      return elem.type === 'concert'
    });

    if (conciertos == '') {
      const sinConciertos=document.createElement("div")
      sinConciertos.className = "col-12 sin-conciertos"
      sinConciertos.innerHTML = `<p>En el día de la fecha SeatGeek no muestra ningún concierto</p>`
        info.append(sinConciertos)
    } else {

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
    }
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


//--------------------------------------------------------------------------
//Registro de usuario para encargar discos
let registroUsuarios = [];

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
 
  }
});

//--------------------------------------------------------------------------
//para encargar discos
let encargues = [];

const inputArtista = document.getElementById("input-artista");
const inputAlbum = document.getElementById("input-album");
const inputAnio = document.getElementById("input-anio");
const formulario = document.getElementById("form2");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputArtista.value === "" || inputAlbum.value === "" || inputAnio.value === "") {
    faltaAlgunDato()
  } else {

      Swal.fire({
        icon: "success",
        title: "Disco cargado con éxito",
        text: "Puede agregar otro álbum o finalizar su carga",
      });
    
    const art = inputArtista.value;
    const album = inputAlbum.value;
    const anio = inputAnio.value;

    encargues.push(new vinilos("img/disc1.svg", art, album, anio, "a definir"));
   
    formulario.reset();
  };
});
//--------------------------------------------------------------------------
//boton finalizar
let pedidoUsuario = [];

const finalizar = document.getElementById("finalizar");

finalizar.addEventListener("click", (ev) => {
  ev.preventDefault();

  if (registroUsuarios.length > 0 && encargues.length > 0) {

    pedidoUsuario=[...registroUsuarios,...encargues]
    registroUsuarios=[]
    encargues=[]

    console.log(pedidoUsuario);

    mensajeCargado(registroUsuarios);
    datos.reset()
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
    html: `<b>${pedidoUsuario[0].Nombre}</b>,
    usted ha encargado ${pedidoUsuario.length-1} disco/s.<br>
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
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
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

let total=0;
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
   total = carrito.reduce((ac, disc) => ac + disc.precio, 0);

  if (carrito.length !== 0) {
    //para que aparezca el boton de vaciar el carrito
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

    //finalizar la compra
    botonFinalizar.innerHTML = ""

    const mostrFinalizar = document.createElement("div")
    mostrFinalizar.innerHTML = `
    <button type="button" class="btn btn-primary" onClick="finalizarCompra(event)">Finalizar compra</button>`
    botonFinalizar.append(mostrFinalizar);
  } else {
    btnVaciar.innerHTML = "Carrito vacio"
    botonFinalizar.innerHTML = ""
  }

  //para el icono del carrito en el navegador
  numCarrito.innerText = carrito.length;

  localStorage.setItem("carrito", JSON.stringify(carrito));

};
//fin render carrito


//funcion para agregar al carrito
const agregarCarrito = (id) => {
  const disc = discos.find((disco) => disco.id === id);
  carrito.push(disc);
  actCarrito();

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
};

//funcion para vaciar el carrito
const vaciar = () => {
  carrito.length = 0;
  actCarrito();
}

// funcion para el boton de finalizar compra
const finalizarCompra = (evt) => {
  evt.preventDefault()
  Swal.fire({
    title: 'Calcule su pago en cuotas <hr>',
    html:
    `<div id="calculadora" class="container">
      <div class="row align-items-center cont-calculadora">

        <div class="formulario-calc col-12">
          <form id="form3">
            <div class="mb-3 monto-total">
              <h4 id="monto">Total compra: <span>$${total}</span></h4> 
            </div>

            <label class="form-label">Elija entre 3, 6, 12, o 18 cuotas</label>
            <select class="form-select mb-3" aria-label="Default select example" id="cuotas">
              <option selected>Seleccione cantidad de cuotas</option>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="18">18</option>
            </select>

            <button type="submit" class="btn btn-primary" onclick="montoInteres(event)">Calcular</button>
            <h4 class="mas-interes1">Costo final con interés: <span id="interes" class="result">$0</span></h4>
            <h4 class="mas-interes2">Plan de pago: <span id="planCuota" class="result"></span><span id="plan"
                class="result">$0</span></h4>
            <h6 class="aviso">*Nos comunicaremos vía email para concretar el pago</h6>
          </form>
        </div>
        
      </div>
    </div>
    `,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar compra',
    cancelButtonText: 'Cancelar'
  })
  .then((result) => {
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

let resultado;
let cuota;

//funciones para sumar interes y para calcular el monto de cada cuota
const calculoInteres = (mon, interes) => (resultado = mon + mon * interes);
const cadaCuota = (total, cant) => (cuota = total / cant);

//funcion integradora
const montoInteres = (ev) => {
  ev.preventDefault();

  const cantCuotas = Number(document.getElementById("cuotas").value);

  if (cantCuotas === 3 && total != "") {
    calculoInteres(total, 0.05);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` ${cantCuotas} cuotas de `;
  } else if (cantCuotas === 6 && total != "") {
    calculoInteres(total, 0.1);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` ${cantCuotas} cuotas de `;
  } else if (cantCuotas === 12 && total != "") {
    calculoInteres(total, 0.15);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` ${cantCuotas} cuotas de `;
  } else if (cantCuotas === 18 && total != "") {
    calculoInteres(total, 0.2);
    cadaCuota(resultado, cantCuotas);
    interes.innerText = `$${resultado}`;
    plan.innerText = `$${cuota.toFixed(2)}`;
    planCuota.innerText = ` ${cantCuotas} cuotas de `;
  } else {
    interes.innerText = " No calculado";
    plan.innerText = " No calculado";
    planCuota.innerText = ``;
    resultado = undefined;
    cuota = undefined;
    Swal.fire({
      icon: "error",
      title: "Calculo no permitido!",
      text: "No ingreso cantidad de cuotas",
    });
  }
};