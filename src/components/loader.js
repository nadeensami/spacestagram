// Import libraries
import { useEffect, useState } from "react";

// Import assets
import mountain_1 from "../assets/mountains/mountain_1.svg";
import mountain_2 from "../assets/mountains/mountain_2.svg";
import mountain_3 from "../assets/mountains/mountain_3.svg";

const Loader = ({ transition, error }) => {
	const [textIndex, setTextIndex] = useState(0);

	const textsFromSpace = [
		"Waking up from a space nap",
		"Wiping VisionMasterX9000 lenses",
		"Calibrating space suit laundry machines",
		"Planning solar supernova watch party",
		"Waiting for cute Martian to like Spacestagram post",
		"Avoiding awkward telescope alien eye contact",
		"Joining nearest planet crawl",
	];

	useEffect(() => {
		const sentenceInterval = setInterval(() => {
			setTextIndex((prev) => (prev + 1) % textsFromSpace.length);
		}, 2000);

		return () => {
			clearInterval(sentenceInterval);
		};
	}, [textsFromSpace.length]);

	return (
		<main className="loader" id="main">
			<div className={`loader-content ${transition}`}>
				{error ? (
					<h2 className="loading-text">
						There was an error retrieving the data &#9785; Please try again later
					</h2>
				) : (
					<>
						<div className="loading-spinner"></div>
						<h2 className="loading-text">{textsFromSpace[textIndex]}...</h2>
					</>
				)}
			</div>

			<img
				src={mountain_1}
				className={`mountain mountain-1 ${transition}`}
				alt="medium blue mountain"
			/>
			<img
				src={mountain_2}
				className={`mountain mountain-1 ${transition}`}
				alt="light blue mountain"
			/>
			<img
				src={mountain_3}
				className={`mountain mountain-1 ${transition}`}
				alt="dark blue mountain"
			/>
		</main>
	);
};

export default Loader;
