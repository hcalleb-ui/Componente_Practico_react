import { useState } from "react";

function App() {
  const [contactos, setContactos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  function guardarContacto() {
    if (nombre.trim() === "" || correo.trim() === "" || telefono.trim() === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!correo.includes("@") || !correo.includes(".")) {
      setError("El correo no es válido.");
      return;
    }
    if (isNaN(telefono)) {
      setError("El teléfono solo debe tener números.");
      return;
    }

    setError("");

    if (idEditando === null) {
      const nuevoContacto = {
        id: Date.now(),
        nombre: nombre,
        correo: correo,
        telefono: telefono
      };
      setContactos([...contactos, nuevoContacto]);
    } else {
      const contactosActualizados = contactos.map(function (contacto) {
        if (contacto.id === idEditando) {
          return { id: contacto.id, nombre: nombre, correo: correo, telefono: telefono };
        } else {
          return contacto;
        }
      });
      setContactos(contactosActualizados);
      setIdEditando(null);
    }

    setNombre("");
    setCorreo("");
    setTelefono("");
  }

  function empezarEdicion(contacto) {
    setIdEditando(contacto.id);
    setNombre(contacto.nombre);
    setCorreo(contacto.correo);
    setTelefono(contacto.telefono);
  }

  function eliminarContacto(id) {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este contacto?");
    if (confirmar) {
      const contactosSinEste = contactos.filter(function (contacto) {
        return contacto.id !== id;
      });
      setContactos(contactosSinEste);
    }
  }

  const contactosFiltrados = contactos.filter(function (contacto) {
    return contacto.nombre.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <div className="contenedor">
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontFamily:  "serif"        }}>Agenda de Contactos</h1>
      <div className="bloque-diferente">
        <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={function (e) { setBusqueda(e.target.value); }}
      />
      </div>
      <div className="bloque-diferente2">
        <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={function (e) { setNombre(e.target.value); }}
      />
      <input
        type="text"
        placeholder="Correo electrónico"
        value={correo}
        onChange={function (e) { setCorreo(e.target.value); }}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={function (e) { setTelefono(e.target.value); }}
      />
      </div>

      {error !== "" && <p className="error">{error}</p>}

      <button onClick={guardarContacto}>
        {idEditando === null ? "Guardar" : "Actualizar"}
      </button>

      <hr />

      {contactosFiltrados.map(function (contacto) {
        return (
          <div className="contacto" key={contacto.id}>
            <p><b>{contacto.nombre}</b></p>
            <p>{contacto.correo}</p>
            <p>{contacto.telefono}</p>
            <button onClick={function () { empezarEdicion(contacto); }}>Editar</button>
            <button onClick={function () { eliminarContacto(contacto.id); }}>Eliminar</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;