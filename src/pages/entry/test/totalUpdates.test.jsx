import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import {Options} from "../Options";

const setupRTL = (option) => {
    render(<Options optionType={option}/>);
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
    screen.debug()

    //update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');
    expect(scoopsSubTotal).toHaveTextContent('6.00');
});