// src/components/NumberOfEvents/index.js (or NumberOfEvents.jsx)
import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
	const [number, setNumber] = useState(currentNOE);

	const handleInputChanged = (event) => {
		const raw = event.target.value;

		// Allow empty string while typing, but show error
		if (raw === "") {
			setNumber("");
			setErrorAlert("Enter a valid number");
			return;
		}

		const value = Number(raw);

		// Non-number or non-finite
		if (Number.isNaN(value) || !Number.isFinite(value)) {
			setNumber(raw);
			setErrorAlert("Enter a valid number");
			return;
		}

		// <= 0 invalid
		if (value <= 0) {
			setNumber(value);
			setErrorAlert("Enter a valid number");
			return;
		}

		// > 32 invalid
		if (value > 32) {
			setNumber(value);
			setErrorAlert("Only maximum of 32 is allowed");
			return;
		}

		// Valid
		setErrorAlert("");
		setNumber(value);
		setCurrentNOE(value);
	};

	return (
		<div id="number-of-events">
			<label htmlFor="number-of-events-input">Number of Events:</label>
			<input
				id="number-of-events-input"
				type="number"
				min={1}
				max={32}
				step={1}
				value={number}
				onChange={handleInputChanged}
				inputMode="numeric"
				data-testid="numberOfEventsInput"
				aria-label="number of events input"
			/>
		</div>
	);
};

export default NumberOfEvents;
