import {useState} from "react";
import {Button, Form, Popover, OverlayTrigger} from "react-bootstrap";

export const SummaryForm = ({setOrderPhase}) => {
    const [disable, setDisable] = useState(false)

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                No ice cream will actually be delivered
            </Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to
            <OverlayTrigger placement="right"
                            overlay={popover}
            >
            <span style={{color: 'blue'}}>Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    );

    const handleSubmit = ({event}) => {
        event.preventDefault();
        //pass along to the next phase
        //the next page will handle submitting order from context
        setOrderPhase('completed');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="terms-and-conditions">

                <Form.Check
                    type='checkbox'
                    check={disable ? 1 : 0}
                    onChange={(e) => setDisable(e.target.checked)}
                    label={checkboxLabel}
                />

            </Form.Group>
            <Button variant="primary"
                    type="submit"
                    disabled={!disable}
            >
                Confirm Order
            </Button>
        </Form>
    )
}