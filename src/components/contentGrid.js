// Import libraries
import { useState, useEffect } from "react";
import { formatDate } from "../utils";

// Import components
import ContentCard from "./contentCard";

const ContentGrid = ({ setLoading, setLoadingTransition, setError, visible }) => {
	const [data, setData] = useState([]);

	const [likedSet, setLikedSet] = useState(
		new Set(JSON.parse(sessionStorage.getItem("liked-set")))
	);

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
		<main id="main" className={`main-grid ${visible ? "" : "none"}`}>
			{/* Main grid */}
			{data.map((image, i) => (
				<ContentCard
					key={`card-${i}`}
					image={image}
					likedSet={likedSet}
					setLikedSet={setLikedSet}
					i={i}
				/>
			))}
		</main>
	);
};

export default ContentGrid;
