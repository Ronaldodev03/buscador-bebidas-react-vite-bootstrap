import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import useCategorias from "../hooks/useCategorias";
import useBebidas from "../hooks/useBebidas";
import { useState } from "react";

const Formulario = () => {
  // Estas categorias me las estoy trayendo desde el contexto, usando el customHook useCategorias().
  const { categorias } = useCategorias();

  // Estas categorias me las estoy trayendo desde el contexto, usando el customHook useBebidas().
  const { consultarBebida } = useBebidas();

  // Este estado se va llenando con el onChance que hay en las inputs de la form.
  const [busqueda, setBusqueda] = useState({
    categoria: "",
  });

  const [alerta, setAlerta] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion.
    if (Object.values(busqueda).includes("")) {
      setAlerta("Seleccione Categoria");
      return;
    }
    setAlerta("");

    // Esta funcion viene del contexto de BebidasProvider, se llena con lo que haya en el estado de busqueda luego de hacer el submit.
    consultarBebida(busqueda);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {alerta && (
        <Alert variant="danger" className="text-center">
          {alerta}
        </Alert>
      )}

      <Row>
        <Col md={9}>
          <Form.Group className="mb-3">
            <Form.Select
              name="categoria"
              value={busqueda.categoria}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value, // Esta cool el onChange.
                })
              }
            >
              <option value="" disabled>
                - Selecciona Categoria -
              </option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.strCategory}
                  value={categoria.strCategory}
                >
                  {categoria.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Button
            type="submit" // Importante que el boton sea tipo submit.
            variant="danger" // Esto hace rojo al boton.
            className="text-uppercase w-100"
          >
            Buscar Bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;

// Notes:

// Esta cool el onChange de las inputs.

// Form.Control is sort of the inputs (type text in this case).

// Note concerning theory: htmlFor in the label goes the the id in the input, and the name for the input is for e.target.name!!
