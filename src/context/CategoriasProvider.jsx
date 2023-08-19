import { useState, useEffect, createContext } from "react";
import axios from "axios";

// Este es el contexto, va a abrazar a lo que retorne <App.jsx/>.
// Parecido a como hizo en el proyecto de cotizador de autos, solo que aqui añade axios para http call y un useEffect standard para el llamado.

const CategoriasContext = createContext();

const CategoriasProvider = ({ children }) => {
  // se guarda en el stado lo que viene del fetching.
  const [categorias, setCategorias] = useState([]);

  // fetching de data con axios.
  const obtenerCategorias = async () => {
    try {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

      const { data } = await axios(url);
      setCategorias(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  // llamado de la funcion de fetching.
  useEffect(() => {
    obtenerCategorias();
  }, []);

  // Se retorna el estado que contiene lo que vino del fetching para poder ser consumido en otros componentes.
  return (
    <CategoriasContext.Provider
      value={{
        categorias,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

export { CategoriasProvider };

export default CategoriasContext;
