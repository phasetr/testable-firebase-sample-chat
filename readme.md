# MEMO
- [Original Repository](https://github.com/SonicGarden/testable-firebase-sample-chat)
## Typo
- P.19, `vite.config.ts`で設定が足りない：オリジナルのソースコード参照
- P.30, `// test/firestore/index.test.ts` -> `// test/rules/firestore/index.test.ts`
- P.31, `// test/firestore/index.test.tsの一部` -> 同上
- P.41, `firestore.rules`
    - `isOwn`の定義で`isLoggedIn`がない
    - `isLoggedIn`の定義が消えている
- P.49, `return`中の`currentUser`でエラー
    - P.59の`if (!currentUser) return <LoginScreen />;`追加でエラー解消
- P.52, `src/lib/fierbase.ts` -> `src/lib/firebase.ts`
- P.57, `useAuth > 初めてのログインの場合、ユーザー情報が登録される`
    - `AssertionError: expected "spy" to be called with arguments:  [ { uid: 'test-uid', …(2) } ]expected "spy" to be called with arguments: [ { uid: 'test-uid', …(2) } ]`
- P.58, `describe(’AuthContext’, async () => {` -> `describe('AuthProvider', async () => {`?
- P.60, 最初のコード部分、`describe("AuthContext", async () => {` -> `describe("AuthProvider", async () => {`?
- P.64, ` import ’virtual:windi.css’;` ここまで`windi.css`の話は一度も出ていないはず.
