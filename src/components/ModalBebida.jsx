import { Modal, Image } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'

const ModalBebida = () => {

  // funciones que vienen del provider
    const { modal, handleModalClick, receta, cargando } = useBebidas()


// Esta funcion la muestra en el modal, en el 'Modal.Body'.
    const mostrarIngredientes = () => {
        let ingredientes = []

        for(let i = 1; i < 16; i++) {
            if( receta[`strIngredient${i}`]) {
// Por lo general no usamos el metodo push, porque modifica un array ya existente, pero como no estamos trabajando con estado no hay problem in this case.
                ingredientes.push(
                    <li>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes
    }
// modal y handleModalClieck vienen del provider, modal es un state booleano, y modalhandleClick togglea de false a true.
    return (
        !cargando && (
            <Modal show={modal} onHide={handleModalClick}>
                <Image 
                    src={receta.strDrinkThumb}
                    alt={`Imagen receta ${receta.strDrink}`}
                />
                <Modal.Header>
                    <Modal.Title>{receta.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='p-3'>
                        <h2>Instrucciones</h2>
                        {receta.strInstructions}
                        <h2>Ingredientes y Cantidad</h2>
                        {mostrarIngredientes()}
                    </div>
                </Modal.Body>
            </Modal>
        )
    )
}

export default ModalBebida