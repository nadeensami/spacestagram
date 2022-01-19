// Import icons
import logo from "../assets/logo.svg";
import github_icon from "../assets/icons/github.svg";
import nasa_icon from "../assets/icons/nasa.svg";

const Header = () => {
	return (
		<header className="header">
			<a href="#main" className="skip-links">
				Skip to content
			</a>
			<nav>
				<a id="logo" href="/">
					<img src={logo} alt="Spacestagram logo" />
				</a>

				<ul className="navigation-links">
					<li className="navigation-links" key="nasa-api-link">
						<a href="https://api.nasa.gov/">
							<img src={nasa_icon} alt="NASA logo" />
						</a>
					</li>

					<li className="navigation-links" key="github-repo-link">
						<a href="https://github.com/nadeensami/spacestagram">
							<img src={github_icon} alt="GitHub logo" />
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
