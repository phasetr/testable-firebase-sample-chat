import {describe, vi} from "vitest";
import {cleanup, render, screen, waitFor} from "@testing-library/react";
import type {User} from "firebase/auth";

const useAuthStateMock = vi.fn();
vi.mock("@/hooks/useAuthState", () => {
  return {useAuthState: useAuthStateMock};
});

describe("AuthProvider", async () => {
  const {useAuth, AuthProvider} = await import("@/contexts/AuthContext");
  const AuthedScreen = () => {
    const {currentUser} = useAuth();
    return <div>`${currentUser?.displayName}でログインできました`</div>;
  };
  const TestComponent = () => (<AuthProvider><AuthedScreen/></AuthProvider>);

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it("can get a context data", async () => {
    useAuthStateMock.mockReturnValue([{uid: "test-user-uid", displayName: "てすたろう"} as User,
      true, undefined]);
  });
  render(<TestComponent/>);
  waitFor(() => expect(screen.getByText("てすたろうでログインできました")).toBeTruthy());
});
