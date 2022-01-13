import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../popup/Modal";
import Backdrop from "../popup/Backdrop";
import Layout from "../layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login(props) {
	const emailRef = useRef(); //reference to the form input of email
	const passwordRef = useRef();
	const navigate = useNavigate(); //auto navigate on login click

	console.log(props.user);

	function loginHandler(event) {
		let err = new Error();
		event.preventDefault();

		const userData = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};

		console.log(userData);
		fetch("http://localhost:8000/auth/login", {
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
				console.log(data);
				localStorage.setItem("Username", data.userName);
				console.log("success");
				navigate("/");
			})
			.catch((err) => {
				toast.error("Incorrect email/password !", {
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
		<div class="login-form">
			<h2 class="heading-secondary ma-bt-lg">Log into your account</h2>
			<form class="form form--login">
				<div class="form__group">
					<label class="form__label" for="email">
						Email address
					</label>
					<input
						class="form__input"
						id="email"
						type="email"
						placeholder="you@example.com"
						required="required"
						ref={emailRef}
					/>
				</div>
				<div class="form__group ma-bt-md">
					<label class="form__label" for="password">
						Password
					</label>
					<input
						class="form__input"
						id="password"
						type="password"
						placeholder="••••••••"
						required="required"
						minlength="8"
						ref={passwordRef}
					/>
				</div>
				<div class="form__group">
					<button class="btn btn--green" onClick={loginHandler}>
						Login
					</button>
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
	);
}
export default Login;
