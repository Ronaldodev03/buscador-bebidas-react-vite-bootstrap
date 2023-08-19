import { useContext } from "react";
import CategoriasContext from "../context/CategoriasProvider";

// Igual a como hizo en el proyecto de cotizador de autos.

const useCategorias = () => {
  return useContext(CategoriasContext);
};

export default useCategorias;
