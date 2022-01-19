// Import libraries
import { useState, useEffect } from "react";
import { formatDate } from "../utils";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

// Import components
import ContentCard from "./contentCard";

const Post = ({ setLoading, setLoadingTransition, setError, visible }) => {
	const { date } = useParams();

	const [image, setImage] = useState(null);

	const [likedSet, setLikedSet] = useState(
		new Set(JSON.parse(sessionStorage.getItem("liked-set")))
	);

	// Fetch data
	useEffect(() => {
		// Start loading :)
		setLoadingTransition("in");

		const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&date=${date}&thumbs=True`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setError(false);
				setLoadingTransition("out");

				setTimeout(() => {
					setLoading(false);
				}, 1000);

				setImage(data);
			})
			.catch(() => {
				setError(true);
			});
	}, []);

	return (
		<main id="main" className={`post ${visible ? "" : "none"}`}>
			{image && <ContentCard image={image} likedSet={likedSet} setLikedSet={setLikedSet} i={0} />}
		</main>
	);
};

export default Post;
