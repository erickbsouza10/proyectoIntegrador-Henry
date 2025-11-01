//open sections
document.querySelectorAll("nav ul li a").forEach(menu => {
  menu.addEventListener("click", e => {
    e.preventDefault();

    // Atualiza menu ativo
    document.querySelectorAll("nav ul li a").forEach(l => l.classList.remove("active-menu"));
    menu.classList.add("active-menu");

    const destino = menu.getAttribute("href");
    const destinoSection = document.querySelector(destino);


    document.querySelectorAll("section.active").forEach(sec => {
      sec.style.opacity = "0";
      setTimeout(() => {
        sec.classList.remove("active");
        sec.style.display = "none";
      }, 400); // tempo da transição
    });

    setTimeout(() => {
      destinoSection.style.display = "block";
      setTimeout(() => destinoSection.style.opacity = "1", 10);
      destinoSection.classList.add("active");
    }, 400);
  });
});



//generar contrasena


const generar = document.getElementById("generar");

generar.addEventListener("click", () => {
  const cantidad = document.getElementById("cantidad").value;
  const incluirEspeciales = document.getElementById("incluir-especiales").value;
  const incluirNumeros = document.getElementById("incluir-numeros").value;
  const incluirMayusculas = document.getElementById("incluir-mayusculas").value;

  if (cantidad != "" && incluirEspeciales != "" && incluirNumeros != "" && incluirMayusculas != "") {
    const valor = Number(cantidad);
    if (!isNaN(valor)) {

      let caracteres = "abcdefghijklmnopqrstuvwxyz";
      if (incluirMayusculas === "si") caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (incluirNumeros === "si") caracteres += "0123456789";
      if (incluirEspeciales === "si") caracteres += "!@#$%&";
      let contrasena = "";

      for (let i = 0; i < cantidad; i++) {
        const generador = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres[generador];
      }

      const exibir = document.getElementById("contrasena");
      exibir.textContent = contrasena;

    } else {
      alert("Se debe ingresar un número válido de caracteres");
    }
  } else {
    alert("Complete todos los campos para generar la contraseña")
  }
})

//gestion de perfiles


var perfiles = [
  { usuario: "Alice", codigo: 1234, nivel_de_autorizacion: "bajo", antiguedad: 12 },
  { usuario: "Bob", codigo: 5678, nivel_de_autorizacion: "medio", antiguedad: 24 },
  { usuario: "Charlie", codigo: 9101, nivel_de_autorizacion: "alto", antiguedad: 35 },
  { usuario: "Diana", codigo: 1122, nivel_de_autorizacion: "admin", antiguedad: 48 },
  { usuario: "Eve", codigo: 334, nivel_de_autorizacion: "bajo", antiguedad: 6 },
  { usuario: "Frank", codigo: 5566, nivel_de_autorizacion: "medio", antiguedad: 12 },
  { usuario: "Grace", codigo: 7788, nivel_de_autorizacion: "alto", antiguedad: 18 },
  { usuario: "Hank", codigo: 9900, nivel_de_autorizacion: "admin", antiguedad: 30 },
  { usuario: "Ivy", codigo: 1235, nivel_de_autorizacion: "bajo", antiguedad: 36 },
  { usuario: "Jack", codigo: 5679, nivel_de_autorizacion: "medio", antiguedad: 48 },
  { usuario: "Karen", codigo: 9102, nivel_de_autorizacion: "alto", antiguedad: 6 },
  { usuario: "Leo", codigo: 1123, nivel_de_autorizacion: "admin", antiguedad: 24 }
];
var asistente = {
  verPerfiles: function (option) {
    switch (option) {
      case "todo":
        return perfiles;
      case "nombre":
        return perfiles.map(p => p.usuario);
      case "codigo":
        return perfiles.map(p => p.codigo);
      case "nivel":
        return perfiles.map(p => p.nivel_de_autorizacion);
      case "antiguedad":
        return perfiles.map(p => p.antiguedad);
      default:
        return "Opción inválida. Usa: todo, nombre, codigo, nivel o antiguedad.";
    }
  },
  verPerfilesPorAntiguedad: function () {
    return [...perfiles].sort((a, b) => b.antiguedad - a.antiguedad);
  },
  verAdministradores: function () {
    var filtrar = perfiles.filter(p => p.nivel_de_autorizacion === "admin");
    return filtrar.map(p => p.usuario);
  },
  modificarAcesso: function (usuario, nuevoCodigo) {
    if (!/^\d{4}$/.test(nuevoCodigo)) {
      return "codigo de acceso invalido, debe contener solo 4 numeros";
    }
    const perfil = perfiles.find(p => p.usuario.toLowerCase() === usuario.toLowerCase());
    if (!perfil) {
      return "usuario no encontrado";
    }
    perfil.codigo = Number(nuevoCodigo);
    return "codigo de acesso modificado";
  }
}

document.getElementById("button-ver-perfiles").addEventListener("click", function () {
  const titulo = document.getElementById("ver-perfiles").value;
  if (titulo != "") {
    document.getElementById("ver-perfiles-resultado").textContent = asistente.verPerfiles(titulo);
  } else {
    alert("introduce un valor")
  }
});
document.getElementById("button-ver-antiguedad").addEventListener("click", function () {
  const resultado = asistente.verPerfilesPorAntiguedad();
  const target = document.getElementById("ver-antiguedad-resultado");

  target.innerHTML = resultado.map(p => `<li>${p.usuario} - ${p.antiguedad}</li>`).join("");
});

document.getElementById("button-ver-administradores").addEventListener("click", function () {
  document.getElementById("ver-administradores").textContent = asistente.verAdministradores();
});

document.getElementById("actualizar").addEventListener("click", function () {
  const usuario = document.getElementById("usuario").value;
  const codigo = document.getElementById("codigo").value;
  const resultado = asistente.modificarAcesso(usuario, codigo);
  alert(resultado)
})


//caja fuerte

var cajaFuerte = {
  cantidadIntentos: 0,
  intentosActuales: 0,
  codigo: "",

  guardar: function (codigo, intentos) {
    this.codigo = codigo;
    this.cantidadIntentos = parseInt(intentos);
    this.intentosActuales = 0;
    return "Código e intentos guardados com sucesso.";
  },
  validar: function (codigoEntrada) {
    if (this.intentosActuales >= this.cantidadIntentos) {
      return "Acesso bloqueado. Número máximo de tentativas atingido.";
    }
    this.intentosActuales++;
    if (codigoEntrada === this.codigo) {
      return "Acesso permitido!";
    } else {
      return "Acesso denegado! Tentativas restantes: " + (this.cantidadIntentos - this.intentosActuales);

    }
  },
  reset: function () {
    this.intentosActuales = 0;
    this.cantidadIntentos = 0;
    this.codigo = "";
    return "Cofre Reiniciado.";

  }

};
document.getElementById("guardar").addEventListener("click", function () {
  const codigo = document.getElementById("codigo-secreto").value;
  const intentos = document.getElementById("cantidad-intentos").value;
  if (codigo != "" && intentos != "") {
    const guardar = cajaFuerte.guardar(codigo, intentos);
    alert(guardar)
  } else {
    alert("rellena todos los campos")
  }
})
document.getElementById("validar-codigo-button").addEventListener("click", function () {
  const entradaCodigo = document.getElementById("validar-codigo").value;
  if (entradaCodigo != "") {
    const validar = cajaFuerte.validar(entradaCodigo);
    alert(validar)
  } else {
    alert("rellena el campo")
  }
})
document.getElementById("reset").addEventListener("click", function () {
  const reset = cajaFuerte.reset();
  alert(reset);
  document.getElementById("validar-codigo").value = "";
  document.getElementById("cantidad-intentos").value = "";
  document.getElementById("codigo-secreto").value = "";
})


//monitoreo de actividad sospechosa

var actividades = [
  { id: 0, description: "asdf", riesgo: "medio" },
  { id: 1, description: "asdf", riesgo: "medio" },
  { id: 2, description: "asdf", riesgo: "medio" },
  { id: 3, description: "asdf", riesgo: "alto" }
];
var monitorio = {
  agregarActividad: function (description, nivel) {
    if (description != "" && nivel != "") {
      var guardar = {
        id: actividades.length, description: description, riesgo: nivel
      };
      actividades.push(guardar);
      alert("Actividad agregada correctamente");
    } else {
      alert("Debes completar todos los campos");
      return;
    }

  },
  filtrarActividades: function (nivel) {
    var filtradas = actividades.filter(p => p.riesgo.toLocaleLowerCase() === nivel.toLocaleLowerCase());

    if (filtradas.length === 0) {
      alert("No hay actividades con ese nivel de riesgo");
    } else {
      return filtradas
    }

  },
  eliminarActividad: function (id) {
    var eliminar = parseInt(id);
    var filtrado = actividades.filter(p => p.id === eliminar);
    if (filtrado.length === 0) {
      alert("No hay actividades con ese ID");
    } else {
      var index = actividades.findIndex(p => p.id === eliminar);
      actividades.splice(index, 1);
      alert("Actividad eliminada correctamente");
      console.table(actividades)
    }

  },
  reporteActividades: function (nombre) {
    if (nombre != "") {
      return `<h5>${nombre}</h5>` + actividades.map(p => `<li>${p.id} - ${p.description} - ${p.riesgo}</li>`).join("");
    } else {
      alert("Debes completar el campo");
      return;
    }
  }
}

document.getElementById("agregar-actividad").addEventListener("click", function () {
  const description = document.getElementById("description").value;
  const nivel = document.getElementById("nivel-de-riesgo").value;
  monitorio.agregarActividad(description, nivel);
});
document.getElementById("mostrar-actividades").addEventListener("click", function () {
  const filtro = document.getElementById("filtrar-actividades").value;
  const resultado = document.getElementById("resultado-filtro");
  resultado.innerHTML = monitorio.filtrarActividades(filtro).map(p => `<li>${p.id} - ${p.description}</li>`).join("")

});
document.getElementById("eliminar-actividad").addEventListener("click", function () {
  const eliminar = document.getElementById("eliminar-sospechosa").value;
  monitorio.eliminarActividad(eliminar);
});

document.getElementById("reporte-actividades-button").addEventListener("click", function () {
  const nombre = document.getElementById("reporte-actividades").value;
  document.getElementById("reporte").innerHTML = monitorio.reporteActividades(nombre)
})


//responsividade
const toggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  toggle.classList.toggle('active');
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

