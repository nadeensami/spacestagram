// Import libraries
import { useState } from "react";

// Import components
import ContentCard from "./contentCard";

const MainGrid = ({ data }) => {
	const [likedSet, setLikedSet] = useState(
		new Set(JSON.parse(sessionStorage.getItem("liked-set")))
	);

	return (
		<main className="main-grid" id="main">
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

export default MainGrid;
