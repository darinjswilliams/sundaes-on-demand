import {render, screen} from "@testing-library/react";
import {Options} from '../Options';

const setupScoopsRTL = (options) => {
    render(<Options optionType={options}/>);
}
it('displays image for each scoop options from server', async () => {
    setupScoopsRTL("scoops");
    //find images
    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);
    // screen.debug(await screen.findAllByRole('img', {name: /scoop$/i}));

    // confirm alt text of images
    let altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

it('displays image for each topping options from server', async () => {
    //setupRTL
    setupScoopsRTL("toppings")

    //find images
    const toppingImages = await screen.findAllByRole('img', {name: /topping/i});
    expect(toppingImages).toHaveLength(3);


    //confirm alt text of images
    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
    // screen.debug();
});