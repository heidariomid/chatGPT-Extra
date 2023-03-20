import React, {createContext, useContext, useState} from 'react';

export const StateContext = createContext();

export const StateProvider = ({children}) => {
	const [chats, setChats] = useState([]);
	const [errMessage, setErrMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [chatKey, setChatKey] = useState('');
	return (
		<StateContext.Provider
			value={{
				chats,
				setChats,
				errMessage,
				setErrMessage,
				isLoading,
				setIsLoading,
				chatKey,
				setChatKey,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStore = () => useContext(StateContext);
