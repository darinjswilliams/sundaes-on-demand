import {Options} from "./Options";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {Button} from "react-bootstrap";

export const OrderEntry = ({setOrderPhase}) => {

    //get it from context
    const [userCtx] = useOrderDetails();

    return (
        <div>
            <Options optionType='scoops'/>
            <Options optionType='toppings'/>
            <h2>
                Grand Total: {userCtx.totals.grandTotal}
            </h2>
            <div>
                <Button onClick={() => {
                    setOrderPhase('review')
                }}
                >Order Sundae!</Button>
            </div>
        </div>
    );
}