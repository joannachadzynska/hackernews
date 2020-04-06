import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../+Firebase";
import MessagesList from "./MessagesList";

export interface MessagesProps {}

const Messages: React.SFC<MessagesProps> = () => {
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState({
		loading: false,
		messages: []
	});
	const { loading, messages } = state;

	useEffect(() => {
		setState({
			...state,
			loading: true
		});

		const messagesCollectionRef = firebase
			.messages()
			.onSnapshot((snapshot: any) => {
				const messagesObject = firebase.convertCollectionsSnapshotToMap(
					snapshot
				);

				if (messagesObject) {
					// convert messages list from snapshot

					const messagesList: any = Object.keys(messagesObject).map(
						(key: any) => ({
							...messagesObject[key],
							uid: key
						})
					);
					setState({
						messages: messagesList,
						loading: false
					});
				} else {
					setState({
						messages: [],
						loading: false
					});
				}
				// setState({
				// 	messages: messagesObject,
				// 	loading: false
				// });
			});

		return () => messagesCollectionRef();
	}, []);
	return (
		<div>
			{loading && <div>Loading ...</div>}
			<p>lorem10</p>

			{messages ? (
				<MessagesList messages={messages} />
			) : (
				<div>There are no messages ... 😥</div>
			)}
		</div>
	);
};

export default Messages;
