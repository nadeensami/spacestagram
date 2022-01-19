import { useState } from "react";

const ContentCard = ({
	image: { hdurl, title, explanation, copyright, date, media_type, thumbnail_url, url },
	likedSet,
	setLikedSet,
	i,
}) => {
	const [liked, setLiked] = useState(likedSet.has(date));

	const handleLikeClick = () => {
		if (liked) {
			setLiked(false);

			// remove from liked set
			setLikedSet((prevDates) => {
				const newSet = new Set(prevDates);
				newSet.delete(date);

				// save to local storage
				sessionStorage.setItem("liked-set", JSON.stringify([...newSet]));

				return newSet;
			});
		} else {
			setLiked(true);

			// add to liked set
			setLikedSet((prevDates) => {
				const newSet = new Set(prevDates);
				newSet.add(date);

				// save to local storage
				sessionStorage.setItem("liked-set", JSON.stringify([...newSet]));

				return newSet;
			});
		}
	};

	return (
		<article className="image-card">
			<a className={media_type === "image" ? "image" : "image thumbnail"} href={url}>
				<img
					loading={i <= 1 ? "eager" : "lazy"}
					src={media_type === "image" ? hdurl : thumbnail_url}
					alt={title}
				/>
			</a>
			<p className="author">&copy; {copyright}</p>
			<h2 className="title">{title}</h2>
			<time className="date" dateTime={date}>
				{date}
			</time>
			<p className="description">{explanation}</p>
			<button className={`like-button ${liked ? "liked" : ""}`} onClick={handleLikeClick}>
				<svg
					width="22"
					height="19"
					viewBox="0 0 22 19"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M15.9921 0.153809C14.5848 0.154504 13.2282 0.674925 12.1872 1.6135C11.7915 1.96775 11.4483 2.37566 11.1678 2.82512C10.8872 2.3756 10.544 1.96752 10.1485 1.61293C9.10722 0.674754 7.75072 0.154566 6.34349 0.153809C3.21392 0.153809 0.667816 2.67718 0.667816 5.77881C0.667816 7.87243 1.32506 9.52506 2.86487 11.3054C5.10222 13.8929 10.7648 17.8416 11.0049 18.0087C11.0525 18.0422 11.1095 18.0601 11.1678 18.0601C11.2262 18.0601 11.2831 18.0422 11.3307 18.0087C11.5708 17.8416 17.2334 13.8929 19.4713 11.3054C21.0106 9.52506 21.6678 7.87243 21.6678 5.77881C21.6678 2.67718 19.1217 0.153809 15.9921 0.153809Z" />
				</svg>
			</button>
		</article>
	);
};

export default ContentCard;
