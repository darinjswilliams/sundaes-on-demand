import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {SummaryForm} from "../SummaryForm";
import userEvent from "@testing-library/user-event";


const setupRTL = () => {
    render(<SummaryForm/>)
}

it('when checkbox is checked disable button', async () => {

    //  const checkBox = screen.getByRole('checkbox', {name: /I agree to Terms and Conditions/i});
    // fireEvent.click(checkBox)
    //fire event to check checkbox
    setupRTL();
    const checkBox = screen.getByRole('checkbox', {name: /I agree to Terms and Conditions/i})
    const button = screen.getByRole('button', {name: /Confirm Order/i,})

    await userEvent.click(checkBox)
    expect(checkBox).toBeChecked();
    expect(button).toBeEnabled();

    await userEvent.click(checkBox);
    expect(checkBox).not.toBeChecked();
    expect(button).toBeDisabled();

});

it('when checkbox is visible it is uncheck by default, button is disable', async () => {
    //call setupRTL
    setupRTL()

    //expect the checkbox is visible and  not check
    await waitFor(() =>
            expect(
                screen.getByRole('checkbox', {name: /I agree to Terms and Conditions/i})
            ).not.toBeChecked(),

        expect(
            screen.getByRole('button', {name: /Confirm Order/i})
        ).toBeDisabled()
    );
    // screen.debug();
    // screen.debug(screen.getByText('Confirm Order'));

});

it('popover response to hover', async () => {
    //popover starts out hidden
    //this is a negative test
    setupRTL()
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    //popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    //popover disappears when we mouse out
    await userEvent.unhover(termsAndConditions);
    const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopoverAgain).not.toBeInTheDocument();


});
