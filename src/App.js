import {Container} from "react-bootstrap";
import {OrderEntry} from "./pages/entry/OrderEntry";
import {OrderDetailsProvider} from "./contexts/OrderDetails";
import {OrderSummary} from "./pages/summary/OrderSummary";
import {OrderConfirmation} from "./pages/entry/OrderConfirmation";
import {useState} from "react";

const App = () => {

    //orderPhase needs to be  'inProgress', 'review' or 'completed'
    const [orderPhase, setOrderPhase] = useState('inProgress');

    let  Component = OrderEntry
    switch (orderPhase) {
        case 'inProgress':
            Component = OrderEntry;
            break;
        case 'review':
            Component = OrderSummary;
            break;
        case 'completed':
            Component = OrderConfirmation;
            break;
        default:
    }

    return (
            <OrderDetailsProvider>
                {/*    TODO summary page and entry page need provider */}
                {/*   The confirmation page does not */}
                <Container>{<Component setOrderPhase={setOrderPhase}/>}</Container>
            </OrderDetailsProvider>

    );
}

export default App;
