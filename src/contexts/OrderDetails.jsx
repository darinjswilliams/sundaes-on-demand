import {createContext, useContext, useState, useMemo, useEffect} from "react";
import {pricePerItem} from "../constants";
import {formatCurrency} from "../utilities";


const OrderDetails = createContext();

//create custom hook to check whether we are inside a provider
export const useOrderDetails = () => {
    const context = useContext(OrderDetails);

    if (!context) {
        throw new Error('userOrderDetails must be used within an OrderDetailsProvider');
    }
    return context;
}


const calculateSubTotal = (orderType, optionCounts) => {
    let optionCount = 0;
    for (const count of optionCounts[orderType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
}

export const OrderDetailsProvider = (props) => {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map(),
    });

    //when ever optionCount updates, use useEffect to update totals
    const zeroCurrency = formatCurrency(0);

    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    });

    useEffect(() => {
        const scoopsSubTotal = calculateSubTotal("scoops", optionCounts);
        const toppingsSubTotal = calculateSubTotal("toppings", optionCounts);
        const grandTotal = scoopsSubTotal + toppingsSubTotal;
        setTotals(
            {
                scoops: formatCurrency(scoopsSubTotal),
                toppings: formatCurrency(toppingsSubTotal),
                grandTotal: formatCurrency(grandTotal),
            }
        )
    }, [optionCounts]);


    const value = useMemo(() => {

        const updateItemCount = (itemName, newItemCount, optionType) => {
            const newOptionCounts = {...optionCounts}

            //update option count for this item with new value
            //get the map that relates to the optionType
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            //set state to contain new information
            setOptionCounts(newOptionCounts);

        }

        //resetOrder, sets the counts back
        const resetOrder = () => {
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map(),
            })
        }
        //getter: object containing options counts for scoops and toppings,
        //subtotals and totals
        //setter: only responsible for option count, simply and updateOptionCount
        //get the option count for scoops and topping by spreading, it will create new object for scoops, toppings 
        //with the values
        return [{...optionCounts, totals}, updateItemCount, resetOrder];
    }, [optionCounts, totals]);


    return <OrderDetails.Provider value={value} {...props} />

}

