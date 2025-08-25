const casillas = document.getElementsByClassName("casilla");
const btnReiniciar = document.getElementById("btnReiniciar");
const contenedorEstrellas = document.getElementsByClassName("estrellas")[0];
const totalEstrellas = 100; // cantidad de estrellas
const historial = document.getElementById("historial");
const contadorEstrella = document.getElementById("puntosEstrella");
const contadorLuna = document.getElementById("puntosLuna");

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

let personaJuega = "💫"; // Emoji de estrella
let botJuega = "🌙"; // Emoji de luna
let juegoActivo = true;
let puntosEstrella = 0;
let puntosLuna = 0;

//  Click en casillas
for (let i = 0; i < casillas.length; i++) {
  casillas[i].addEventListener("click", function () {
    if (casillas[i].textContent === "" && juegoActivo) {
      casillas[i].textContent = personaJuega;
      tablero[i] = personaJuega;

      // Verifica si el jugador ganó
      let ganador = verificarGanador();
      if (ganador) {
        juegoActivo = false;
        actualizarPuntos(ganador);
        agregarHistorial(ganador);
        setTimeout(() => alert("¡Ganó " + ganador + "!"), 100);
        return;
      }

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

//  Bot 
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
    actualizarPuntos(ganador);
    agregarHistorial(ganador);
    setTimeout(() => alert("¡Ganó " + ganador + "!"), 100);
    return;
  }

  // Verifica empate
  if (!tablero.includes("")) {
    juegoActivo = false;
    setTimeout(() => alert("¡Empate!"), 100);
  }
}

// Verificar ganador 
function verificarGanador() {
  for (let combo of ganadores) {
    if (tablero[combo[0]] !== "" && combo.every(i => tablero[i] === tablero[combo[0]])) {
      return tablero[combo[0]];
    }
  }
  return null;
}

// Actualizar puntos
function actualizarPuntos(ganador) {
  if (ganador === personaJuega) puntosEstrella++;
  if (ganador === botJuega) puntosLuna++;
  contadorEstrella.textContent = puntosEstrella;
  contadorLuna.textContent = puntosLuna;

  localStorage.setItem("puntosEstrella", puntosEstrella);
  localStorage.setItem("puntosLuna", puntosLuna);
}

// Agregar al historial 
function agregarHistorial(ganador) {
  const li = document.createElement("li");
  li.textContent = "¡Ganó " + ganador + "!";
  historial.appendChild(li);
}

// reincia el juego
btnReiniciar.addEventListener("click", function() {
for (let i = 0; i < casillas.length; i++) {
     casillas[i].textContent = ""
    }
     personaJuega = "💫"
     tablero =["","","","","","","","",""]

     juegoActivo = true
     
    })

// estrellas fugases
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < totalEstrellas; i++) crearEstrella();

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
