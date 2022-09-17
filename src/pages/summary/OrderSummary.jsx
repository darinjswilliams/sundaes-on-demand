import {useState} from "react";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {SummaryForm} from "./SummaryForm";


export const OrderSummary = ({setOrderPhase}) => {

    const [useCtx] = useOrderDetails();

    const scoopArray = Array.from(useCtx.scoops.entries());
    const scoopList = scoopArray.map(([key, value]) =>(
        <li key ={key}>
           <p> {value} {key} </p>
        </li>
    ));

    const toppingsArray = Array.from(useCtx.toppings.keys());
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

    return (
        <div>
        <h1>Order Summary</h1>
            <h2>Scoops: {useCtx.totals.scoops}</h2>
            <ul>{scoopList}</ul>
            <h2>Toppings: {useCtx.totals.toppings}</h2>
            <ul>{toppingList}</ul>
            {/* Button is a child component in SummaryForm */}
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    )
}
