import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Createtour(props) {
	const nameRef = useRef(); 
	const priceRef = useRef(); 
	const locationRef = useRef(); 
	const durationRef = useRef(); 
	const maxGroupSizeRef = useRef(); 
	const navigate = useNavigate();
	let err = new Error();
	let tourData;
	function tourHandeler(event) {
		event.preventDefault();
		tourData = {
			name: nameRef.current.value,
			price: priceRef.current.value,
			location: locationRef.current.value,
			duration: durationRef.current.value,
			maxGroupSize: maxGroupSizeRef.current.value,
		};
		fetch("http://localhost:8000/tour", {
			method: "POST",
			body: JSON.stringify(tourData),
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
					throw new Error("Failed to fetch tour status.");
				}
				console.log("success");
				navigate("/");
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
		<Layout>
			<main className="main">
				<div className="singup-form">
					<h2 className="heading-secondary ma-bt-lg">create your custom tour!</h2>
					<form className="form form--signup" onSubmit={tourHandeler}>
						<div className="form__group">
							<label className="form__label" for="name">
								Tour name
							</label>
							<input
								className="form__input"
								id="name"
								type="text"
								placeholder=""
								required=""
								ref={nameRef}
							/>
						</div>
						<div className="form__group">
							<label className="form__label" for="price">
								Price
							</label>
							<input
								className="form__input"
								id="price"
								type="text"
								placeholder=""
								required=""
								ref={priceRef}
							/>
						</div>
						<div className="form__group ma-bt-md">
							<label className="form__label" for="location">
								Location
								<input
									className="form__input"
									id="location"
									type="text"
									placeholder=""
									required=""
									ref={locationRef}
								/>
							</label>
						</div>
						<div className="form__group ma-bt-md">
							<label className="form__label" for="duration">
								Duration
								<input
									className="form__input"
									id="duration"
									type="text"
									placeholder=""
									required=""
									ref={durationRef}

								/>
							</label>
						</div>
						<div className="form__group ma-bt-md">
							<label className="form__label" for="maxGroupSize">
								Group Maximum size 
								<input
									className="form__input"
									id="maxGroupSize"
									type="text"
									placeholder=""
									required=""
									ref={maxGroupSizeRef}

								/>
							</label>
						</div>
						<div className="form__group">
							<button className="btn btn--green">Create Tour</button>
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
		</Layout>
	);
}
export default Createtour;
