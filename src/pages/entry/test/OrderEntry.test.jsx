import {render, screen, waitFor} from "@testing-library/react";
import {OrderEntry} from "../OrderEntry";
import {rest} from "msw";
import {server} from "../../../mocks/server";

const setupRTL = () => {
    render(<OrderEntry/>);
}

beforeEach( () =>
    server.resetHandlers(
        rest.get('http://locaohost:3030/scoops', (req, res, ctx) =>
            res(ctx.status(500))
        ),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
            res(ctx.status(500))
        )
    )
);

it('handles error for scoops and toppings routes', async () => {
    //need to override handlers from server


    //setup
    setupRTL();

    await waitFor(async() => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });
});
