import {render, screen} from "@testing-library/react";
import {Options} from '../Options';

const setupScoopsRTL = () => {
    render (<Options optionType="scoops"/>);
}
it('displays image for each scoop options from server',  async() => {
    setupScoopsRTL();
    //find images
    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);
    screen.debug(await screen.findAllByRole('img', {name: /scoop$/i}));

    // confirm alt text of images
    let altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});