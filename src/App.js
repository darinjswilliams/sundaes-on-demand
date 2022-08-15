import logo from './logo.svg';
import {Container} from "react-bootstrap";
import {OrderEntry} from "./pages/entry/OrderEntry";
import {useState} from "react";
import {OrderDetailsProvider} from "./contexts/OrderDetails";

function App() {
    return (
        <Container>
            <OrderDetailsProvider>
                //TODO summary page and entry page need provider
                //The confirmation page does not
                <OrderEntry/>
            </OrderDetailsProvider>
        </Container>
    );
}

export default App;
