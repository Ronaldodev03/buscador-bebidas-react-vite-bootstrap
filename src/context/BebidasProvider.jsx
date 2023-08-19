import { useState, useEffect, createContext } from "react";
import axios from "axios";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  // Se guarda en el estado lo que viene del fetching que se hace con los datos que vienen del formulario al hacer submit.
  const [bebidas, setBebidas] = useState([]);

  // Este state va al componente ModalBebida, para mostra u ocultar el modal, el modal tiene una propieda show{true/false} y un onHide{function}.
  const [modal, setModal] = useState(false);

  // Id de la Card seleccionada en <Bebida/> al presionar el boton, se usa en un useEffect para hacer otro llamado a una API.
  const [bebidaId, setBebidaId] = useState(null);

  // Guarda la info de la bebida que se mostrara en el modal.
  const [receta, setReceta] = useState({});

  // Se togglea el state de cargando mientras se llama el useEffect de llamado a la API con los datos de la receta...
  // ... y se usa para renderizado condicional del Modal mientras se carga la info.
  const [cargando, setCargando] = useState(false);

  // Se hace un llamado a una API usando el Id de la bebida seleccionada en el card de cada bebida al presionar el boton.
  // Almacena los datos en el state de receta.
  useEffect(() => {
    setCargando(true);

    const obtenerReceta = async () => {
      if (!bebidaId) return;

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  // Esta funcion se llena con los datos que vienen del formulario, esta funcion es llamada en el componente Formulario al hacer submit.
  const consultarBebida = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${datos.categoria}`;

      const { data } = await axios(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  // Esta funcion togglea el state de modal, y es accionado por cada Card de las bebidas (en el componente Bebida) al dar en el boton.
  const handleModalClick = () => {
    setModal(!modal);
  };

  // Esta funcion guarda el id del boton accionado por cada Card de las bebidas (en el componente Bebida) al dar en el boton.
  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };

  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        receta,
        cargando,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
