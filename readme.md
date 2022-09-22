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
- P.51, `vi.fn()`: インポートある？
