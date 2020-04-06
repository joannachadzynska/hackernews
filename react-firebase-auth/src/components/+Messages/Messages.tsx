import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../+Firebase";
import MessagesList from "./MessagesList";
import MessagesForm from "./MessagesForm";

export interface MessagesProps {}

const Messages: React.SFC<MessagesProps> = () => {
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState({
		loading: false,
		messages: null
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
				const messagesObject: any = firebase.convertCollectionsSnapshotToMap(
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
						messages: messagesObject,
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

	const onRemoveItem = (uid: any) => {
		firebase.message(uid).delete();
	};

	return (
		<div>
			{loading && <div>Loading ...</div>}

			{messages ? (
				<MessagesList messages={messages} onRemoveMessage={onRemoveItem} />
			) : (
				<div>There are no messages ... 😥</div>
			)}

			<MessagesForm />
		</div>
	);
};

export default Messages;
