const btnReiniciar = document.getElementById("btnReiniciar")
const casillas = document.getElementsByClassName("casilla") // recorre varias elementos




let turno= "🌸"

for (let i = 0; i < casillas.length; i++) {
  casillas[i].addEventListener("click", function() {
    if (casillas[i].textContent === "") { // solo se puede poner un simbolo si esta vacia
      casillas[i].textContent = turno;
      turno = (turno === "X") ? "🌙" : "🌸"; // Hace que una vez utilizada la x cambie a o
      
    }
  });
}
   //Reincia el juego
    btnReiniciar.addEventListener("click", function () {
    for (let i = 0; i < casillas.length; i++) {
     casillas[i].textContent = ""
    }
     turno ="🌸"
     
    })


