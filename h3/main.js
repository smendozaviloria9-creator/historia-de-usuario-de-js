const input = document.getElementById("inputNota");
const boton = document.querySelector("#btnAgregar");
const lista = document.getElementById("listaNotas");

console.log(input);
console.log(boton);
console.log(lista);

let notas = [];

const guardarNotas = () => {
  localStorage.setItem("notas", JSON.stringify(notas));
};

const crearNota = (texto) => {
  const li = document.createElement("li");

  li.textContent = texto;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  li.appendChild(btnEliminar);

  lista.appendChild(li);

  btnEliminar.addEventListener("click", () => {
    lista.removeChild(li);

    notas = notas.filter(nota => nota !== texto);

    guardarNotas();

    console.log("Nota eliminada");
  });
};

const cargarNotas = () => {
  const notasGuardadas = localStorage.getItem("notas");

  if (notasGuardadas) {
    notas = JSON.parse(notasGuardadas);

    notas.forEach(nota => {
      crearNota(nota);
    });

    console.log(`${notas.length} notas cargadas`);
  }
};

boton.addEventListener("click", () => {
  const texto = input.value.trim();

  if (texto === "") {
    alert("El input está vacío");
    return;
  }

  notas.push(texto);

  guardarNotas();

  crearNota(texto);

  input.value = "";

  input.focus();

  console.log("Nota agregada");
});

cargarNotas();