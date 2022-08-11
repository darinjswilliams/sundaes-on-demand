import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import {SummaryForm} from "../SummaryForm";


const setupRTL = () => {
    render(<SummaryForm/>)
}

it('when checkbox is checked disable button', () => {

    //  const checkBox = screen.getByRole('checkbox', {name: /I agree to Terms and Conditions/i});
    // fireEvent.click(checkBox)
    //fire event to check checkbox
    setupRTL();
    const checkBox = screen.getByRole('checkbox', {name: /I agree to Terms and Conditions/i})
    const button = screen.getByRole('button', {name: /Confirm Order/i,})

    fireEvent.click(checkBox)
    expect(checkBox).toBeChecked();
    expect(button).toBeEnabled();

    fireEvent.click(checkBox);
    expect(checkBox).not.toBeChecked();
    expect(button).toBeDisabled();

});

it('when checkbox is visible it is uncheck by default, button is disable ', async () => {
    //call setupRTL
    setupRTL()

    //expect the checkbox is visible and  not check
    await waitFor(() =>
            expect(
                screen.getByRole('checkbox', {name: /I agree to Terms and Conditions/i})
            ).not.toBeChecked(),

        expect(
            screen.getByRole('button', {name: /Confirm Order/i})
            // screen.debug(),
            // screen.debug(screen.getAllByAltText('Confirm Order'))
        ).toBeDisabled()
    );


});
