import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const Socket: any = io("http://localhost:3001");

export type SktMsgContextItf = {
    sendMessage: (message: string) => void;
    updateMessage: (time: string) => void;
    deleteMessage: (time: string) => void;
    login: (user: string) => void;
    logout: () => void;
    messages: [{
        message: string,
        username: string,
        time: string
    }];
    updatingMessage: {
        message: string,
        username: string,
        time: string
    }
    isConnected: boolean;
    isLoggedin: boolean;
    username: string;
    isUpdating: boolean;
    editMessage: (message: {
        message: string, username: string, time: string
    }) => void;
}

const InitialState: SktMsgContextItf = {
    sendMessage: (message: string) => { },
    updateMessage: (time: string) => { },
    deleteMessage: (message: string) => { },
    username: "",
    login: (user: string) => { },
    logout: () => { },
    messages: [{
        message: '',
        username: '',
        time: ''
    }],
    isConnected: false,
    isLoggedin: false,
    isUpdating: false,
    updatingMessage: {
        message: '',
        username: '',
        time: ''
    },
    editMessage: (message: {
        message: string, username: string, time: string
    }) => { }
}

export const SktMsgContext = createContext<SktMsgContextItf>(InitialState);

export default function SocketCtxProvider({ children }: { children: JSX.Element }) {
    const [username, setUsername] = useState<string>(window.sessionStorage.getItem('login') || "");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [updatingMessage, setUpdatingMessage] = useState<{
        message: string, username: string, time: string
    }>({
        message: '',
        username: '',
        time: ''
    });
    const [isLoggedin, setIsLoggedIn] = useState<boolean>(username.length > 2 ? true : false);
    const [messages, setMessage] = useState<[{
        message: string, username: string, time: string
    }]>([{
        message: '',
        username: '',
        time: ''
    }]);

    useEffect(() => {
        Socket.emit("getmessage_paylaod");
    }, [username]);

    const login = (user: string) => {
        window.sessionStorage.setItem('login', user);
        setIsLoggedIn(true);
        setUsername(user);
    }
    const logout = () => {
        Socket.emit("user_logout", username);
        setUsername("");
        setIsLoggedIn(false);
        window.sessionStorage.removeItem('login');
    }

    const [isConnected, setIsConnected] = useState(false);

    Socket.on("connect", (socket: any) => {
        setIsConnected(true);

        Socket.on("message_payload", (...args: any) => {
            setMessage(args);
        });

    });
    Socket.on("receive_message", async (args: any, messagePayload: [{
        message: string,
        username: string,
        time: string
    }]) => {

        setMessage(messagePayload);
    });
    const editMessage = (message: {
        message: string, username: string, time: string
    }) => {

        setIsUpdating(true);
        setUpdatingMessage(message);
    }
    const sendMessage = (message: string) => {
        Socket.emit("send_message", { message, username });
    }
    const updateMessage = (message: string) => {
        setIsUpdating(false);
        Socket.emit("update_message", { time: updatingMessage.time, message });
        updatingMessage.time = "";
        updatingMessage.username = "";
        updatingMessage.message = "";
    }

    const deleteMessage = (time: string) => {
        Socket.emit("delete_message", { time })
    }

    return (
        <SktMsgContext.Provider value={{ ...InitialState, sendMessage, messages, login, logout, isLoggedin, username, updateMessage, deleteMessage, isUpdating, updatingMessage, editMessage, isConnected }}>
            {children}
        </SktMsgContext.Provider>
    )
}