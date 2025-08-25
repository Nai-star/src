const btnReiniciar = document.getElementById("btnReiniciar")
const casillas = document.getElementsByClassName("casilla") // recorre varias elementos
const contenedorEstrellas = document.getElementsByClassName("estrellas") [0]
const TotalEstrellas = 100; // cantidad de estrellas
const historial = document.getElementById("historial")
const contador = document.getElementById("contador")
const contadorEstrella = document.getElementById("puntosEstrella")
const contadorLuna = document.getElementById("puntosLuna")



let tablero =["","","","","","","","",""]
let ganadores= [ //combos para ganar
  [0,1,2,],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]



let turno= "💫"
let juegoActivo = true
let alerta = false
let puntosEstrella = 0
let puntosLuna = 0

for (let i = 0; i < casillas.length; i++) {
  casillas[i].addEventListener("click", function() {
    if (!juegoActivo) return;
    if (casillas[i].textContent === "") { // solo se puede poner un simbolo si esta vacia
      casillas[i].textContent = turno;
      tablero[i] = turno;
      
     let ganador = verificarGanador();
     if (ganador) {
        juegoActivo = false;
        alerta = true
        setTimeout(function() {
        alert("¡Ganó " + ganador + "!");
        alerta = false
          return;
        }, 1000)

        // Se muestra el historial de las ganadas
        const li = document.createElement("li");
       li.textContent = "¡Ganó " + ganador + "!";
        historial.appendChild(li);
        setTimeout(function() {
        alerta = false;
        }, 500); 

         if (ganador === "💫") {
        puntosEstrella++;
       } else if (ganador === "🌙") {
        puntosLuna++;
        localStorage.setItem("puntosEstrella", puntosEstrella);
          localStorage.setItem("puntosLuna", puntosLuna);
       }

       actualizarMarcador()
       
     
      }
      if (!tablero.includes("")) {
        juegoActivo = false;
          alerta = true
          setTimeout(function() {
          alert("¡Empate!");
          alerta = false
          return;
        }, 1000)
        }
     turno = (turno === "💫") ? "🌙" : "💫"; // Hace que una vez utilizada la x cambie a o
      
    }
    
  });
   

}

  
  function actualizarMarcador() {
 contadorEstrella.textContent = puntosEstrella
  contadorLuna.textContent =  puntosLuna
  }
        
///El every verifica que todas las posiciones de un combo ganador sean iguales 
function verificarGanador() {
   for (let combo of ganadores) {
    if (tablero[combo[0]] !== "" && combo.every(i => tablero[i] === tablero[combo[0]])) {
      return tablero[combo[0]]; 
    }
  }
  return null;
}
   //Reincia el juego
    btnReiniciar.addEventListener("click", function () {
    for (let i = 0; i < casillas.length; i++) {
     casillas[i].textContent = ""
    }
     turno = "💫"
     tablero =["","","","","","","","",""]

     juegoActivo = true
     alerta = false
    })
      
   

for (let i = 0; i < TotalEstrellas; i++) {
  const estrella = document.createElement("div");
  estrella.className = "estrella";
  estrella.style.left = Math.random() * 100 + "%"; // Posición horizontal aleatoria
  estrella.style.animationDuration = (Math.random() * 5 + 5) + "s";// Velocidad y retraso aleatorios
  estrella.style.animationDelay = Math.random() * 5 + "s";
  estrella.style.width = estrella.style.height = (Math.random() * 1 + 0.5) + "%";// Tamaño aleatorio, responsivo
 contenedorEstrellas.appendChild(estrella);
}
