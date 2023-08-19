import { useContext } from "react";
import BebidasContext from "../context/BebidasProvider";

// Igual a como hizo en el proyecto de cotizador de autos.

const useBebidas = () => {
  return useContext(BebidasContext);
};

export default useBebidas;
