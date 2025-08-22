const casillas = document.getElementsByClassName("casilla");
const btnReiniciar = document.getElementById("boton");
const contenedorEstrellas = document.getElementsByClassName("estrellas")[0];
const totalEstrellas = 100; // cantidad de estrellas
const historial = document.getElementById("historial")
const contador = document.getElementById("contador")
const contadorEstrella = document.getElementById("puntosEstrella")
const contadorLuna = document.getElementById("puntosLuna")

let tablero = ["","","","","","","","",""];
let ganadores = [ // combos para ganar
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

let personaJuega = "X";
let botJuega = "O";
let juegoActivo = true;

// se ve la x
for (let i = 0; i < casillas.length; i++) {
  casillas[i].addEventListener("click", function () {
    if (casillas[i].textContent === "" && juegoActivo) {
      casillas[i].textContent = personaJuega;
      tablero[i] = personaJuega;

      // Verifica si el jugador ganó
      let ganador = verificarGanador();
      if (ganador) {
        juegoActivo = false;
        setTimeout(() => alert("¡Ganó " + ganador + "!"), 100);
        return;
      }
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
        
       }

       actualizarMarcador()
       

      // Verifica empate
      if (!tablero.includes("")) {
        juegoActivo = false;
        setTimeout(() => alert("¡Empate!"), 100);
        return;
      }

      // Turno del bot
      setTimeout(bot, 500);
    }
  });
}

// para ver el ganador
function verificarGanador() {
  for (let combo of ganadores) {
    if (tablero[combo[0]] !== "" && combo.every(i => tablero[i] === tablero[combo[0]])) {
      return tablero[combo[0]];
    }
  }
  return null;
}

// ---- Bot ----
function bot() {
  if (!juegoActivo) return;

  let casillasVacias = [];
  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] === "") casillasVacias.push(i);
  }

  if (casillasVacias.length === 0) return;

  let eleccion = casillasVacias[Math.floor(Math.random() * casillasVacias.length)];
  casillas[eleccion].textContent = botJuega;
  tablero[eleccion] = botJuega;

  // Verifica si el bot ganó
  let ganador = verificarGanador();
  if (ganador) {
    juegoActivo = false;
    setTimeout(() => alert("¡Ganó " + ganador + "!"), 100);
    return;
  }

  // Verifica empate
  if (!tablero.includes("")) {
    juegoActivo = false;
    setTimeout(() => alert("¡Empate!"), 100);
  }
}

// ---- Estrellas animadas ----
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < totalEstrellas; i++) {
    crearEstrella();
  }

  function crearEstrella() {
    const estrella = document.createElement("div");
    estrella.classList.add("estrella");

    estrella.style.top = `${Math.random() * 50}vh`;
    estrella.style.left = `${Math.random() * 100}vw`;
    estrella.style.animationDuration = `${Math.random() * 1.5 + 1}s`;

    contenedorEstrellas.appendChild(estrella);

    estrella.addEventListener("animationend", () => {
      estrella.remove();
      setTimeout(crearEstrella, Math.random() * 3000);
    });
  }
});
