// Import libraries
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import components
import Header from "./components/header";
import ContentGrid from "./components/contentGrid";
import Post from "./components/post";
import Loader from "./components/loader";

// Import assets
import rocket from "./assets/icons/rocket.svg";

const App = () => {
	// Initalize app states
	const [loading, setLoading] = useState(true);
	const [loadingTransition, setLoadingTransition] = useState("in");
	const [error, setError] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({ top: 0 });
	};

	return (
		<Router>
			<Header />

			<Switch>
				<Route path="/:date">
					<Post
						visible={!loading}
						setLoading={setLoading}
						setLoadingTransition={setLoadingTransition}
						setError={setError}
					/>
				</Route>

				<Route path="/">
					<ContentGrid
						visible={!loading}
						setLoading={setLoading}
						setLoadingTransition={setLoadingTransition}
						setError={setError}
					/>
				</Route>
			</Switch>

			<Loader transition={loadingTransition} error={error} visible={loading} />

			<button
				className={loading ? "none" : "back-to-top"}
				aria-label="back to top button"
				onClick={scrollToTop}
			>
				<img src={rocket} alt="rocket flying back to top icon" />
			</button>
		</Router>
	);
};

export default App;
