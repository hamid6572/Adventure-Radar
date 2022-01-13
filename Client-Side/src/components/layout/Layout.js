import MainNav from "./MainNav";
import Footer from "./Footer";
function Layout(props) {
	return (
		<div>
			<MainNav user={props.user} />
			<main>
				{
					props.children //routing tags inside
				}
			</main>
			<Footer />
		</div>
	);
}
export default Layout;
