import { Row } from 'react-bootstrap'
import useBebidas from "../hooks/useBebidas"
import Bebida from './Bebida'

const ListadoBebidas = () => {

// En el provider BebidasProvider se guarda en el estado bebidas lo que viene del fetching que se hace con los datos que vienen del formulario al hacer submit.
// Ahora se usa ese estado para hacer un mapeo y crear componentes <Bebida/>>
    const { bebidas } = useBebidas()

    return (
        <Row className='mt-5'>
            {bebidas.map(bebida => (
                <Bebida
                    key={bebida.idDrink}
                    bebida={bebida}
                />
            ))}
        </Row>
    )
}

export default ListadoBebidas