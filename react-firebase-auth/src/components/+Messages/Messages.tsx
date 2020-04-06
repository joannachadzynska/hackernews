import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../+Firebase";
import MessagesList from "./MessagesList";
import MessagesForm from "./MessagesForm";

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
				} else {
					setState({
						messages: [],
						loading: false
					});
				}
			});

		return () => messagesCollectionRef();
	}, []);

	const onRemoveItem = (uid: any) => {
		firebase.message(uid).delete();
	};

	const onEditMessage = (message: any, text: any) => {
		const { uid, data } = message;
		const date = new Date();

		firebase.message(uid).set({
			...data,
			text,
			editedAt: date
		});
	};

	return (
		<div>
			{loading && <div>Loading ...</div>}

			{messages.length > 0 ? (
				<MessagesList
					messages={messages}
					onRemoveMessage={onRemoveItem}
					onEditMessage={onEditMessage}
				/>
			) : (
				<div>There are no messages ... 😥</div>
			)}

			<MessagesForm />
		</div>
	);
};

export default Messages;
