// Import libraries
import { useState, useEffect } from "react";

// Import components
import Header from "./components/header";
import MainGrid from "./components/mainGrid";
import Loader from "./components/loader";

// Import assets
import rocket from "./assets/icons/rocket.svg";

const App = () => {
	// Initalize app states
	const [loading, setLoading] = useState(true);
	const [loadingTransition, setLoadingTransition] = useState("in");
	const [error, setError] = useState(false);
	const [data, setData] = useState([]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0 });
	};

	// Fetch data
	useEffect(() => {
		// Start loading :)
		setLoadingTransition("in");

		const startDate = new Date(Date.now() - 2592000000); // 30 days ago
		const endDate = new Date();

		const url = `https://api.nasa.gov/planetary/apod?api_key=${
			process.env.REACT_APP_API_KEY
		}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&thumbs=True`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setError(false);
				setLoadingTransition("out");

				setTimeout(() => {
					setLoading(false);
				}, 1000);

				data.reverse();

				setData(data);
			})
			.catch(() => {
				setError(true);
			});
	}, []);

	return (
		<div className="app">
			<Header />

			{loading ? <Loader transition={loadingTransition} error={error} /> : <MainGrid data={data} />}

			<button
				className={loading ? "none" : "back-to-top"}
				aria-label="back to top button"
				onClick={scrollToTop}
			>
				<img src={rocket} alt="rocket flying back to top icon" />
			</button>
		</div>
	);
};

const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export default App;
