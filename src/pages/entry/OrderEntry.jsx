import {Options} from "./Options";
import { useOrderDetails} from "../../contexts/OrderDetails";

export const OrderEntry = () => {

    //get it from context
    const [userCtx] = useOrderDetails();
    return (
        <div>
            <Options optionType='scoops'/>
            <Options optionType='toppings'/>
            <h2>
            Grand Total: {userCtx.totals.grandTotal}
            </h2>
        </div>
    );
}