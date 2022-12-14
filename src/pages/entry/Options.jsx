import axios from "axios";
import {useEffect, useState} from "react";
import {ScoopOption} from "./ScoopOption";
import {ToppingOption} from "./ToppingOption";
import {Row} from "react-bootstrap";
import {AlertBanner} from "../common/AlertBanner";
import {pricePerItem} from "../../constants";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {formatCurrency} from "../../utilities"

export const Options = ({optionType}) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDetails, updateItemCount] = useOrderDetails();

    useEffect(() => {
        //optionType is 'scoops' or 'toppings'
        axios.get(`http://localhost:3030/${optionType}`)
            .then(response => setItems(response.data))
            .catch((error) => {
                setError(true)
            });
    }, [optionType]);

    if (error) {
        return <AlertBanner/>;
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    //when ever you have an array, you have to give it a key
    const optionItems = items.map((item) =>
        <ItemComponent key={item.name}
                       name={item.name}
                       imagePath={item.imagePath}
                       updateItemCount = {(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
        />);


    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>{title} total: {orderDetails.totals[optionType]}</p>
            <Row>{optionItems}</Row>

        </>
    );
}