import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent, {set} from "@testing-library/user-event";
import {Options} from "../Options";
import {OrderEntry} from "../OrderEntry";

const setupRTL = (option) => {
    render(<Options optionType={option}/>);
}

const setupOrderEntryRTl = () => {
    render(<OrderEntry/>);
}

it('update subtotal when scoops change', async () => {
//setup
    setupRTL("scoops")

    //make sure total starts out $0.00
    //since this is a partial match, you need to make the exact option false
    // now it will find an element even if it is not the entire string
    const scoopsSubTotal = screen.getByText('Scoops total: $', {exact: false});
    expect(scoopsSubTotal).toHaveTextContent('0.00');

    //update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');
    expect(scoopsSubTotal).toHaveTextContent('2.00');
    // screen.debug()

    //update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');
    expect(scoopsSubTotal).toHaveTextContent('6.00');
});

it('update subtotal when toppings change', async () => {

    setupRTL("toppings");

    //toppings are either checked or un-checked if check calculate subtotal
    //Assert on default toppings subtotal, the value should be zero, do a partial match
    const toppingsSubTotal = screen.getByText('Toppings total: $', {exact: false});
    expect(toppingsSubTotal).toHaveTextContent('0.00');

    //find and check on box, validate subtotal for 1 checkbox
    const cherryCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'});
    await userEvent.click(cherryCheckBox)
    expect(cherryCheckBox).toBeChecked();
    // screen.debug();
    expect(toppingsSubTotal).toHaveTextContent('1.50');

    //Check another checkbox and validate subtotal, check to make sure it can handle two checkboxes
    const hotfudgeCheckbox = await screen.findByRole('checkbox', {name: 'Hot fudge'});
    await userEvent.click(hotfudgeCheckbox);
    expect(hotfudgeCheckbox).toBeChecked();
    expect(toppingsSubTotal).toHaveTextContent('3.00');

    //Check one box off, and validate subtotal
    await userEvent.click(hotfudgeCheckbox);
    expect(hotfudgeCheckbox).not.toBeChecked();
    expect(toppingsSubTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {


    it('grand total updates properly if scoop is added first', async () => {
        setupOrderEntryRTl();

        //expect grand total starts out at 0
        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/i});
        expect(grandTotal).toHaveTextContent('0.00');

        const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
        expect(chocolateInput).toBeInTheDocument();

        const scoopSubTotal = screen.getByText('Scoops total: $', {exact: false});
        expect(scoopSubTotal).toHaveTextContent('0.00');

        await userEvent.clear(chocolateInput);
        await userEvent.type(chocolateInput, '1');

        //check subtotal for scoops
        expect(scoopSubTotal).toHaveTextContent('2.00');

        //check grand total

        expect(grandTotal).toHaveTextContent('2.00');

        const gummiBears = await screen.findByRole('checkbox', {name: 'Gummi bears'});
        expect(gummiBears).toBeInTheDocument();
        await userEvent.click(gummiBears);
        const toppingSubTotal = screen.getByText('Toppings total: $', {exact: false});
        expect(toppingSubTotal).toHaveTextContent('1.50');

        //check grand Total again
        expect(grandTotal).toHaveTextContent('3.50');

    });

    it('grand total updates properly if topping is added first', async () => {

        setupOrderEntryRTl();


        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/i});
        expect(grandTotal).toHaveTextContent('0.00');

        const mnmsInput = await screen.findByRole('checkbox', {name: 'M&Ms'});
        expect(mnmsInput).toBeInTheDocument();
        await userEvent.click(mnmsInput);

        const toppingTotal = screen.getByText('Toppings total: $', {exact: false});
        expect(toppingTotal).toHaveTextContent('1.50');

        expect(grandTotal).toHaveTextContent('1.50');


        const mintInput = await screen.findByRole('spinbutton', {name: 'Mint chip'});
        await userEvent.clear(mintInput);
        await userEvent.type(mintInput, '2');

        const scoopsTotal = screen.getByText('Scoops total: $', {exact: false});
        expect(scoopsTotal).toHaveTextContent('4.00');

        expect(grandTotal).toHaveTextContent('5.50');


    });

    it('grand total updates properly if item is removed', async () => {

        setupOrderEntryRTl();

        const cherriesInput = await screen.findByRole('checkbox', {name: 'Cherries'});
        expect(cherriesInput).toBeInTheDocument();
        await userEvent.click(cherriesInput);

        const hotfudgeInput = await screen.findByRole('checkbox', {name: 'Hot fudge'});
        expect(hotfudgeInput).toBeInTheDocument()
        await userEvent.click(hotfudgeInput);

        const gummiBearsInput = await screen.findByRole('checkbox', {name: 'Gummi bears'});
        expect(gummiBearsInput).toBeInTheDocument();
        await userEvent.click(gummiBearsInput);

        const toppingsTotal = screen.getByText('Toppings total: $', {exact: false});
        expect(toppingsTotal).toHaveTextContent('4.50');

        const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
        await userEvent.clear(chocolateInput);
        await userEvent.type(chocolateInput, '3');

        const grandTotal = screen.getByRole('heading', {name: /Grand total: \$/i});
        expect(grandTotal).toHaveTextContent('10.50')

        await userEvent.clear(chocolateInput);
        await userEvent.type(chocolateInput, '2');

        expect(grandTotal).toHaveTextContent('8.50');
    });

});