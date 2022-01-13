import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Overview from "./pages/Tours/Overview";
import { useState } from "react";
function App() {
	const [user, setUser] = useState({});

	return (
		<Routes>
			<Route
				path="/"
				exact
				element={<Overview user={user} setUser={setUser} />}
			/>
			<Route
				path="/login"
				exact
				element={<Login user={user} setUser={setUser} />}
			/>
			<Route path="/signup" exact element={<Signup />} />
		</Routes>
	);
}

export default App;
