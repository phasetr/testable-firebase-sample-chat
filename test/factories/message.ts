import {Factory} from "fishery";
import {Message} from "@/types/messages";
import {Timestamp} from "firebase/firestore";

export const messageFactory = Factory.define<Message>(
  ({sequence}) => ({
    id: sequence.toString(),
    createdAt: Timestamp.fromDate(new Date()),
    content: "",
    senderId: ""
  })
);
