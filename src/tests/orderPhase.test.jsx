import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";


const setupRTl = () => {
    render(<App/>);
}
describe('Happy Path', () => {
    it('order phases for happy path', async () => {
        //render the app
        setupRTl();

        // add ice cream scoops and toppings
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        expect(vanillaInput).toBeInTheDocument();

        //find and click order button on page
        await userEvent.clear(vanillaInput);
        await userEvent.type(vanillaInput, '1');

        const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
        await userEvent.clear(chocolateInput);
        await userEvent.type(chocolateInput, '2');

        const mochiInput = await screen.findByRole('checkbox', {name: 'Mochi'});
        expect(mochiInput).toBeInTheDocument();
        await userEvent.click(mochiInput);

        //click the order sundae button to advance to  OrderSummary
        const orderSundaeButton = screen.getByRole('button', {name: /order sundae/i});
        await userEvent.click(orderSundaeButton);

        //After clicking Order Sundae button, advance to Order Summary
        //accept terms and conditions and click button to confirm order

        const scoopsHeading = screen.getByRole('heading', {name: 'Order Summary'});
        expect(scoopsHeading).toBeInTheDocument();

        //check the scoops subtotal
        const scoopsTotalHeading = screen.getByRole('heading', {name: 'Scoops: $6.00'});
        expect(scoopsTotalHeading).toBeInTheDocument()

        const toppingTotalHeading = screen.getByRole('heading', {name: 'Toppings: $1.50'});
        expect(toppingTotalHeading).toBeInTheDocument();

        //check summary option items
        expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
        expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Mochi')).toBeInTheDocument();

        // const termsCheckBox = screen.getByRole('checkbox', {name: /as per our terms and conditions/i});
        // await userEvent.click(termsCheckBox);

        //click the "new order "button on summary page, to advance to  order confirmation
        const confirmBtn = await screen.findByRole('button', {name: /confirm order/i,});
        await userEvent.click(confirmBtn);


        //do we need to away anything to avoid test test errors
        const thankYouHeader = await screen.findByRole('heading', {name: /thank you/i,});
        expect(thankYouHeader).toBeInTheDocument();

        //confirm order number on confirmation page
        const orderNumber = await screen.findByText(/order number/i);
        expect(orderNumber).toBeInTheDocument();


        //click the "new order "button on confirmation page
        const createOrderBtn = screen.getByRole('button', {name: /create new order/i});
        await userEvent.click(createOrderBtn);

        // check that scoops and topping subtotals have been reset

        //check that toppings and scoops have been clear
        const scoopsTotal = screen.getByText('Scoops total: $0.00');
        expect(scoopsTotal).toBeInTheDocument();
        const toppingsTotal = screen.getByText('Toppings total: $0.00');
        expect(toppingsTotal).toBeInTheDocument();


        //wait for items to appear so that testing libary does not get antry about
        // happening after test is over
        await screen.findByRole('spinbutton', {name: 'Vanilla'});
        await screen.findByRole('checkbox', {name: 'Cherries'})

    });
});