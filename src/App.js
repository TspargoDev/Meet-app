// src/App.js
import { useEffect, useState } from "react";
import { extractLocations, getEvents } from "./api";
import { ErrorAlert, InfoAlert } from "./components/Alert"; // <-- import ErrorAlert
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";

import "./App.css";

const App = () => {
	const [allLocations, setAllLocations] = useState([]);
	const [currentNOE, setCurrentNOE] = useState(32);
	const [events, setEvents] = useState([]);
	const [currentCity, setCurrentCity] = useState("See all cities");
	const [infoAlert, setInfoAlert] = useState("");
	const [errorAlert, setErrorAlert] = useState(""); // <-- NEW

	useEffect(() => {
		fetchData();
		// re-fetch/filter when city OR number-of-events changes
	}, [currentCity, currentNOE]); // <-- added currentNOE

	const fetchData = async () => {
		const allEvents = await getEvents();
		const filteredEvents =
			currentCity === "See all cities"
				? allEvents
				: allEvents.filter((event) => event.location === currentCity);

		setEvents(filteredEvents.slice(0, currentNOE));
		setAllLocations(extractLocations(allEvents));
	};

	return (
		<div className="App">
			<div className="alerts-container">
				{/* show info first */}
				{infoAlert && <InfoAlert text={infoAlert} />}{" "}
				{/* <-- fixed to use infoAlert */}
				{/* then error alert */}
				{errorAlert && <ErrorAlert text={errorAlert} />} {/* <-- NEW */}
			</div>

			<CitySearch
				allLocations={allLocations}
				setCurrentCity={setCurrentCity}
				setInfoAlert={setInfoAlert}
			/>

			<NumberOfEvents
				setCurrentNOE={setCurrentNOE}
				setErrorText={setErrorAlert} // <-- pass the error setter to child
			/>

			<EventList events={events} />
		</div>
	);
};

export default App;
