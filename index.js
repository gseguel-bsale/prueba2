const API_URL = "prueba-bsale.herokuapp.com";

const xhttp = new XMLHttpRequest();
xhttp.addEventListener("load", obtenerProductosClasificadosIniciales);
xhttp.open("GET", API_URL);
xhttp.send();

function obtenerProductosClasificadosIniciales() {
  if (this.readyState == 4 && this.status == 200) {
    let dataJson = JSON.parse(this.responseText);
    //console.log(dataJson["data"][0]);

    //obtener productos iniciales.
    for (let i = 0; i < dataJson["data"].length; i++) {
      let unDataJson = dataJson["data"][i];
      
      
      console.log(unDataJson);
      
      //solo agregare productos con foto 
      if (dataJson["data"][i]["url_image"] != null && dataJson["data"][i]["url_image"] != "") {
        let imagen = document.getElementById("imagen-productos");

        imagen.innerHTML += "<tr><td><img src='" +unDataJson["url_image"] +"' width='250' height='250'></td><td><p>Precio: $"+unDataJson["price"] +"</p></tr></td>";
      }
    }
    //obteniendo info del boton
    const botones = document.querySelectorAll(".btn");
    let botonSelecionado = "";

    //funcion cuando se hace clic en el boton
    const cuandoSeHaceClick = function (evento) {
      //obtengo el boton.
      botonSelecionado = this.innerText;
      //console.log(botonSelecionado);
      let arrayCat = ["bebida energetica","pisco","ron","bebida","snack","cerveza","vodka"];
      for (let i = 0; i < arrayCat.length; i++) {
        if (botonSelecionado == arrayCat[i]) {
          botonSelecionado = i + 1;
          console.log(
            "el id es: " + botonSelecionado + " la categoria es: " + arrayCat[i]
          );
        }

        //agregando imagenes por  filtro de categoria.
        let imagen2 = document.getElementById("imagen-productos");
        imagen2.innerHTML = "";
        for (let i = 0; i < dataJson["data"].length; i++) {
          let unDataJson = dataJson["data"][i];

          //let app = document.getElementById('app');
          //app.innerHTML += '<br>Categoria: ' + unDataJson['categoria'] + '<br> Producto: ' + unDataJson['name'];
          console.log(botonSelecionado + " hola");
          if (
            dataJson["data"][i]["id"] == botonSelecionado &&
            dataJson["data"][i]["url_image"] != null &&
            dataJson["data"][i]["url_image"] != ""
          ) {
            imagen2.innerHTML += "<tr><td><img src='" +unDataJson["url_image"] +"' width='250' height='250'></td><td><p>Precio: $"+unDataJson["price"] +"</p></tr></td>"
          }
        }
      }
    };
    botones.forEach((boton) => {
      //Agregar listener
      boton.addEventListener("click", cuandoSeHaceClick);
    });
  }
}
