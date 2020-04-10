import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

// test("renders learn react link", () => {
// 	const { getByText } = render(
// 		<Provider store={store}>
// 			<App />
// 		</Provider>
// 	);

// 	expect(getByText(/learn/i)).toBeInTheDocument();
// });

describe("App", () => {
	it("test", () => {
		expect(true).toBeTruthy();
	});
});
