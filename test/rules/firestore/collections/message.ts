import {messageFactory} from "@/../test/factories/message";
import {userFactory} from "@/../test/factories/user";
import {assertFails, assertSucceeds, RulesTestEnvironment} from "@firebase/rules-unit-testing";
import {beforeEach, describe} from "vitest";
import {getTestEnv, setCollection} from "../utils";
import firebase from "firebase/compat/app";
import {MESSAGES} from "@/constants/dbnames";

const user = userFactory.build({id: "user-id"});
const other = userFactory.build({id: "other-id"});
const users = [user, other];
const userMessage = messageFactory.build({
  id: "user-message-id",
  senderId: user.id
});
const otherMessage = messageFactory.build({
  id: "other-message-id",
  senderId: other.id
});
const messages = [userMessage, otherMessage];

export const messageTest = () => {
  let env: RulesTestEnvironment;

  beforeEach(async () => {
    env = getTestEnv();
    await env.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();
      await setCollection(adminDb.collection("users"), users);
      await setCollection(adminDb.collection("messages"), messages);
    });
  });

  describe("未認証の場合", () => {
    let db: firebase.firestore.Firestore;

    beforeEach(() => {
      db = env.unauthenticatedContext().firestore();
    });

    it("読み込みできない(get)", async () => {
      const ref = db.collection("messages").doc(otherMessage.id);
      await assertFails(ref.get());
    });

    it("読み込みできない(list)", async () => {
      const ref = db.collection("messages").doc(otherMessage.id);
      await assertFails(ref.get());
    });

    it("作成できない", async () => {
      const newMessage = messageFactory.build();
      const ref = db.collection("messages");
      await assertFails(ref.add(newMessage));
    });

    it("更新できない", async () => {
      const ref = db.collection(MESSAGES).doc(otherMessage.id);
      await assertFails(ref.update({content: "違う内容"}));
    });

    it("削除できない", async () => {
      const ref = db.collection(MESSAGES).doc(otherMessage.id);
      await assertFails(ref.delete());
    });
  });

  describe("authenticated", () => {
    it("can read a list", async () => {
      const db = env.authenticatedContext(user.id).firestore();
      const ref = db.collection(MESSAGES);
      await assertSucceeds(ref.get());
    });

    describe("for the case: self data", () => {
      let db: firebase.firestore.Firestore;

      beforeEach(() => {
        db = env.authenticatedContext(user.id).firestore();
      });

      it("can read by get", async () => {
        const ref = db.collection(MESSAGES).doc(userMessage.id);
        await assertSucceeds(ref.get());
      });

      it("can create", async () => {
        const newMessage = messageFactory.build({senderId: user.id});
        const ref = db.collection(MESSAGES);
        await assertSucceeds(ref.doc(newMessage.id).set(newMessage));
      });

      it("can update", async () => {
        const ref = db.collection(MESSAGES).doc(userMessage.id);
        await assertSucceeds(ref.update({content: "other content"}));
      });

      it("can delete", async () => {
        const ref = db.collection(MESSAGES).doc(userMessage.id);
        await assertSucceeds(ref.delete());
      });
    });
  });

  describe("data other than my own", async () => {
    let db: firebase.firestore.Firestore;

    beforeEach(() => {
      db = env.authenticatedContext(user.id).firestore();
    });

    it("can read by get", async () => {
      const ref = db.collection(MESSAGES).doc(otherMessage.id);
      await assertSucceeds(ref.get());
    });

    it("cannot create", async () => {
      const newMessage = messageFactory.build({senderId: other.id});
      const ref = db.collection(MESSAGES);
      await assertFails(ref.doc(newMessage.id).set(newMessage));
    });

    it("cannot update", async () => {
      const ref = db.collection(MESSAGES).doc(otherMessage.id);
      await assertFails(ref.update({content: "other content"}));
    });

    it("cannot delete", async () => {
      const ref = db.collection(MESSAGES).doc(otherMessage.id);
      await assertFails(ref.delete());
    });
  });
};
