import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> Component", () => {
	test("component contains a number input", () => {
		render(
			<NumberOfEvents
				currentNOE={32}
				setCurrentNOE={() => {}}
				setErrorAlert={() => {}}
			/>
		);

		// type="number" uses role "spinbutton"
		const input = screen.getByRole("spinbutton", { name: /number of events/i });
		expect(input).toBeInTheDocument();
	});

	test("default value of the input is 32", () => {
		render(
			<NumberOfEvents
				currentNOE={32}
				setCurrentNOE={() => {}}
				setErrorAlert={() => {}}
			/>
		);

		const input = screen.getByRole("spinbutton", { name: /number of events/i });
		// DOM value is a string even for number inputs
		expect(input).toHaveValue(32);
	});

	test("input value changes when user types", async () => {
		render(
			<NumberOfEvents
				currentNOE={32}
				setCurrentNOE={() => {}}
				setErrorAlert={() => {}}
			/>
		);

		const input = screen.getByTestId("numberOfEventsInput");
		const user = userEvent.setup();

		await user.clear(input);
		await user.type(input, "10");

		expect(input).toHaveValue(10);
	});

	test("shows error when value <= 0", async () => {
		const setErrorAlert = jest.fn();
		render(
			<NumberOfEvents
				currentNOE={32}
				setCurrentNOE={() => {}}
				setErrorAlert={setErrorAlert}
			/>
		);

		const input = screen.getByRole("spinbutton", { name: /number of events/i });
		const user = userEvent.setup();

		await user.clear(input);
		await user.type(input, "0");

		expect(setErrorAlert).toHaveBeenLastCalledWith("Enter a valid number");
	});

	test("shows error when value > 32", async () => {
		const setErrorAlert = jest.fn();
		render(
			<NumberOfEvents
				currentNOE={32}
				setCurrentNOE={() => {}}
				setErrorAlert={setErrorAlert}
			/>
		);

		const input = screen.getByRole("spinbutton", { name: /number of events/i });
		const user = userEvent.setup();

		await user.clear(input);
		await user.type(input, "33");

		expect(setErrorAlert).toHaveBeenLastCalledWith(
			"Only maximum of 32 is allowed"
		);
	});

	test("clears error and calls setCurrentNOE on valid value", async () => {
		const setErrorAlert = jest.fn();
		const setCurrentNOE = jest.fn();

		render(
			<NumberOfEvents
				currentNOE={32}
				setCurrentNOE={setCurrentNOE}
				setErrorAlert={setErrorAlert}
			/>
		);

		const input = screen.getByRole("spinbutton", { name: /number of events/i });
		const user = userEvent.setup();

		await user.clear(input);
		await user.type(input, "10");

		expect(setErrorAlert).toHaveBeenLastCalledWith(""); // cleared
		expect(setCurrentNOE).toHaveBeenLastCalledWith(10); // valid update
	});
});
