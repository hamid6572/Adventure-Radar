import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup(props) {
	const usernameRef = useRef(); //reference to the form input of username
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	let err = new Error();

	function signupHandeler(event) {
		event.preventDefault();
		const userData = {
			username: usernameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		console.log(userData);
		fetch("http://localhost:8000/auth/signup", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				err.status = res.status;
				return res.json();
			})
			.then((data) => {
				if (err.status !== 200) {
					console.log(data.message);
					throw new Error("Failed to fetch user status.");
				}
				console.log("success");
				navigate("/login");
			})
			.catch((err) => {
				toast.error("Validation failed", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	}
	return (
		<main className="main">
			<div className="singup-form">
				<h2 className="heading-secondary ma-bt-lg">create your account!</h2>
				<form className="form form--signup" onSubmit={signupHandeler}>
					<div className="form__group">
						<label className="form__label" for="name">
							Your name
						</label>
						<input
							className="form__input"
							id="name"
							type="text"
							placeholder=""
							required=""
							ref={usernameRef}
						/>
					</div>
					<div className="form__group">
						<label className="form__label" for="email">
							Email address
						</label>
						<input
							className="form__input"
							id="email"
							type="email"
							placeholder="you@example.com"
							required=""
							ref={emailRef}
						/>
					</div>
					<div className="form__group ma-bt-md">
						<label className="form__label" for="password">
							Password
							<input
								className="form__input"
								id="password"
								type="password"
								placeholder="••••••••"
								required=""
								minLength="8"
								ref={passwordRef}
							/>
						</label>
					</div>
					<div className="form__group ma-bt-md">
						<label className="form__label" for="passwordConfirm">
							Confirm password
							<input
								className="form__input"
								id="passwordConfirm"
								type="password"
								placeholder="••••••••"
								required=""
								minlength="8"
							/>
						</label>
					</div>
					<div className="form__group">
						<button className="btn btn--green">Sign up</button>
						<ToastContainer
							position="top-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					</div>
				</form>
			</div>
		</main>
	);
}
export default Signup;
