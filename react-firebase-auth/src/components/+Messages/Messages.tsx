import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../+Firebase";
import { AuthUserContext } from "../+Session";
import MessagesList from "./MessagesList";
import MessagesForm from "./MessagesForm";
import { Button } from "../shared";

export interface MessagesProps {}

const Messages: React.SFC<MessagesProps> = () => {
	const firebase = useContext(FirebaseContext);
	const authUser = useContext(AuthUserContext);
	const [state, setState] = useState({
		loading: false,
		messages: [],
		limit: 5
	});
	const { loading, messages, limit } = state;

	const onListenForMessages = (limit: any) => {
		setState({
			...state,
			loading: true
		});

		firebase
			.messages()
			.orderBy("createdAt")
			.limit(limit)
			.onSnapshot((snapshot: any) => {
				const messagesObject: any = firebase.convertCollectionsSnapshotToMap(
					snapshot
				);

				if (messagesObject) {
					setState({
						...state,
						messages: messagesObject,
						loading: false
					});
				} else {
					setState({
						...state,
						messages: [],
						loading: false
					});
				}
			});
	};

	useEffect(() => {
		onListenForMessages(state.limit);
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

	const nextPage = () => {
		setState({
			...state,
			limit: limit + 5
		});

		onListenForMessages(limit + 5);
	};

	return (
		<div>
			{loading && <div>Loading ...</div>}

			{messages.length > 0 ? (
				<MessagesList
					authUser={authUser}
					messages={messages}
					onRemoveMessage={onRemoveItem}
					onEditMessage={onEditMessage}
				/>
			) : (
				<div>
					There are no messages ...
					<span role='img' aria-label='sad emoji'>
						😥
					</span>
				</div>
			)}

			{!loading && messages && (
				<Button type='button' onClick={nextPage}>
					More
				</Button>
			)}
			<MessagesForm />
		</div>
	);
};

export default Messages;
