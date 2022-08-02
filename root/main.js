/*En este simulador recorro el array buscando un disco en particular, si no lo encuentro,
puedo encargar el disco o ignorarlo y hacer otra consulta si asi lo deseo.
Al final me muestra los discos encargados
*/

//Array de objetos discos en stock
const discos = [
  {
    artista: "The Beatles",
    album: "abbey road",
    anio: 1969,
    company: "Apple",
    precio: 12000,
  },
  {
    artista: "David Bowie",
    album: "heathen",
    anio: 2002,
    company: "EMI",
    precio: 9000,
  },
  {
    artista: "Anderson.Paak",
    album: "malibu",
    anio: 2016,
    company: "EMPIRE",
    precio: 8000,
  },
  {
    artista: "Luis Alberto Spinetta",
    album: "para los arboles",
    anio: 2003,
    company: "Universal Music Argentina S.A.",
    precio: 10000,
  },
  {
    artista: "Led zeppelin",
    album: "houses of the holy",
    anio: 1973,
    company: "Atlanctic",
    precio: 5000,
  },
  {
    artista: "Pink floyd",
    album: "the dark side of the moon",
    anio: 1973,
    company: "Sony music",
    precio: 7000,
  },
  {
    artista: "Radiohead",
    album: "ok computer",
    anio: 1997,
    company: "XL recording",
    precio: 6850,
  },
  {
    artista: "Yes",
    album: "close to the edge",
    anio: 1972,
    company: "Elektra",
    precio: 5000,
  },
  {
    artista: "Gorillaz",
    album: "demon days",
    anio: 2005,
    company: "Parlophone records",
    precio: 5400,
  },
  {
    artista: "David Bowie",
    album: "the next day",
    anio: 2013,
    company: "Columbia records",
    precio: 9000,
  },
  {
    artista: "George Harrison",
    album: "living in the material world",
    anio: 1973,
    company: "Universal",
    precio: 8700,
  },
  {
    artista: "Pescado rabioso",
    album: "pescado rabioso 2",
    anio: 1973,
    company: "Sony music",
    precio: 11000,
  },
];
//fin array

alert("El stock actual es de " + discos.length + " discos de vinilo.");

//Array vacio para pushear el encargue
const encargues = [];

//funcion para pushear el encargue
function agrDisco() {
  let artista = prompt("Por favor ingrese el Nombre del artista");
  let album = prompt("Por favor ingrese el Nombre del album");
  let anio = Number(prompt("Por favor ingrese el año del album"));
  let compania = prompt("Por favor ingrese la compania disquera");
  let precio = Number(
    prompt("Por favor ingrese un precio estimado del vinilo")
  );

  album = album.toLowerCase();

  encargues.push({
    artista: artista,
    album: album,
    anio: anio,
    company: compania,
    precio: precio,
  });
}

let consulta;
let encargar;

//funcion de busqueda
function busqueda() {
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
}

busqueda();

//funcion de nueva consulta
function otraConsulta() {
  consulta = prompt("Quiere hacer otra consulta? SI/NO");
  if (consulta.toUpperCase() === "SI") {
    encontrado = false;
    busqueda();
    otraConsulta();
  } else {
    console.log(discos);
  }
}
otraConsulta();

console.log(encargues);

//aca aplico .forEach para mostrar los discos encargados
encargues.forEach((el) => {
  console.log(el.album);
  alert(
    "Usted ha solicitado el disco: " +
      el.album +
      " del artista: " +
      el.artista +
      ", pronto le enviaremos novedades."
  );
});
