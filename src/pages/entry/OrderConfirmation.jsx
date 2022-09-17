import {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {response} from "msw";
import {useOrderDetails} from "../../contexts/OrderDetails";

//The setOrderPhase comes from the App Component, this allows you to move to the next page
export const OrderConfirmation = ({setOrderPhase}) => {
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(false);
    const [, , resetOrder] = useOrderDetails();

    //when using useEffect and it has no dependency array it will only run once on the component mount
    useEffect(() => {
        axios.get(`http://localhost:3030/order`)
            .then(response => {
                setOrderNumber(response.data.orderNumber)
            })
            .catch((error) => {
                {/* TODO HANDLE ERROR */
                }
                setError(true)
            });
    }, []);

    const handleClick = () => {
        // clear the order details
        resetOrder();

        //send back to order page
        setOrderPhase('inProgress');
    }

    const loading = () => (
        <>
            <div>
                <h2>Loading Information</h2>
            </div>
        </>
    );

    return (
        orderNumber == null ? loading :
            <div style={{textAlign: 'center'}}>
                <h2>Thank you!</h2>
                <p>Your order number is {orderNumber}</p>
                <p style={{fontSize: '25%'}}>
                    as per our terms and conditions, nothing will happen now
                </p>
                <Button onClick={handleClick}>
                    Create new order
                </Button>
            </div>
    )
}