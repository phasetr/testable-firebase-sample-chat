import {Factory} from "fishery";
import {User} from "@/types/user";
import {Timestamp} from "firebase/firestore";

export const userFactory = Factory.define<User>(({sequence}) => ({
  id: sequence.toString(),
  createdAt: Timestamp.fromDate(new Date()),
  name: `テストユーザー${sequence}`,
  photoUrl: ""
}))