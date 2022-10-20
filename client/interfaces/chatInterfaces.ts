import { UserI } from "./userInterface";

export interface chatI {
    _id?: string;
    chatName: string;
    isGroupChat: boolean;
    users: UserI[];
    createdAt: string;
    updatedAt: string;
}

export interface messageI {
    _id? : string;
    sender: UserI;
    content: string;
    chat: chatI;
    readBy: UserI[];
    createdAt: string;
    updatedAt: string;
}