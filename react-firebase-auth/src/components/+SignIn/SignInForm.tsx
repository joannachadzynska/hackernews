import * as React from "react";
import { InputWithLabel, Button } from "../shared";
import * as ROUTES from "../../constants/routes";
import { StyledForm } from "./style";

export interface SignInFormProps {
	firebase: any;
	history: any;
}

const initialState = {
	email: "",
	password: "",
	error: null
};

const SignInForm: React.SFC<SignInFormProps> = ({ firebase, history }) => {
	const [state, setState] = React.useState(initialState);
	const { email, password, error } = state;

	const isInvalid = password === "" || email === "";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await firebase.doSignInWithEmailAndPassword(email, password);

			setState({ ...initialState });
			history.push(ROUTES.HOME);
		} catch (error) {
			setState({
				...state,
				error: error.message
			});
		}
		// .then((authUser: any) => {
		// 	setState({ ...initialState });
		// 	console.log(authUser);

		// 	history.push(ROUTES.HOME);
		// })
		// .catch((error: any) => {
		// 	setState({
		// 		...state,
		// 		error
		// 	});
		// });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value
		});
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			<InputWithLabel
				name='email'
				value={email}
				id={email}
				onInputChange={handleChange}>
				Email Address
			</InputWithLabel>

			<InputWithLabel
				type='password'
				name='password'
				value={password}
				id={password}
				onInputChange={handleChange}>
				Password
			</InputWithLabel>

			<Button type='submit' disabled={isInvalid}>
				Sign In
			</Button>

			{error && <p>{error}</p>}
		</StyledForm>
	);
};

export default SignInForm;
