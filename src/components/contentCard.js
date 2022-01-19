import { useState } from "react";

const ContentCard = ({
	image: { hdurl, title, explanation, copyright, date, media_type, thumbnail_url, url },
	likedSet,
	setLikedSet,
	i,
}) => {
	const [liked, setLiked] = useState(likedSet.has(date));
	const [displayCopied, setDisplayCopied] = useState(false);

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

	const handleShareClick = () => {
		const textToCopy = window.location.origin + "/" + date;
		navigator.clipboard.writeText(textToCopy);

		// Briefly show copied tooltip
		setDisplayCopied(true);

		setTimeout(() => {
			setDisplayCopied(false);
		}, 2000);
	};

	return (
		<article className="content-card">
			<a className={media_type === "image" ? "image" : "image thumbnail"} href={url}>
				<img
					loading={i <= 1 ? "eager" : "lazy"}
					src={media_type === "image" ? hdurl : thumbnail_url}
					alt={title}
				/>
			</a>
			<p className="author">&copy; {copyright}</p>
			<a className="title" href={`/${date}`}>
				<h2>{title}</h2>
			</a>
			<time className="date" dateTime={date}>
				{date}
			</time>
			<p className="description">{explanation}</p>
			<div className="action-buttons">
				<button
					className={`share-button ${displayCopied ? "copied" : ""}`}
					onClick={handleShareClick}
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.07671 3.59265C9.07671 3.59265 12.4624 0.206919 14.1553 1.89978C15.8482 3.59265 15.2839 5.8498 12.4624 8.10695C9.641 10.3641 7.94813 10.9284 6.81956 8.67124M6.81956 12.6213C6.81956 12.6213 3.43383 16.007 1.74096 14.3141C0.0480987 12.6213 0.612387 10.3641 3.43383 8.10695C6.25527 5.8498 7.94813 5.28551 9.07671 7.54267"
							stroke="black"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button className={`like-button ${liked ? "liked" : ""}`} onClick={handleLikeClick}>
					<svg
						width="22"
						height="19"
						viewBox="0 0 22 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M15.9922 0.153809C14.5848 0.154504 13.2282 0.674925 12.1872 1.6135C11.7915 1.96775 11.4483 2.37566 11.1678 2.82512C10.8872 2.3756 10.5441 1.96752 10.1485 1.61293C9.10725 0.674754 7.75075 0.154566 6.34352 0.153809C3.21395 0.153809 0.667847 2.67718 0.667847 5.77881C0.667847 7.87243 1.32509 9.52506 2.8649 11.3054C5.10225 13.8929 10.7649 17.8416 11.005 18.0087C11.0526 18.0422 11.1095 18.0601 11.1678 18.0601C11.2262 18.0601 11.2831 18.0422 11.3307 18.0087C11.5708 17.8416 17.2334 13.8929 19.4714 11.3054C21.0106 9.52506 21.6678 7.87243 21.6678 5.77881C21.6678 2.67718 19.1217 0.153809 15.9922 0.153809Z" />
					</svg>
				</button>
			</div>
		</article>
	);
};

export default ContentCard;
