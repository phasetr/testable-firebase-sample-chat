import { usersRef } from "@/lib/user";
import { User } from "@/types/user";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useCollectionData } from "@/hooks/useCollectionData";
import { keyBy } from "lodash-es";

type UsersContextValue = {
  users: User[];
  usersById: { [id: string]: User };
  loading: boolean;
};

export const UsersContext = createContext<UsersContextValue>({
  users: [],
  usersById: {},
  loading: true,
});

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, loading] = useCollectionData<User>(usersRef());
  const usersById = useMemo(() => keyBy(users, "id"), [users]);
  return (
    <UsersContext.Provider value={{ users: users || [], usersById, loading }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const { users, usersById, loading } = useContext(UsersContext);
  return { users, usersById, loading };
};
