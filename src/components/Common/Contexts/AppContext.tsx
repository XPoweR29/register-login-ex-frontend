
import { createContext } from 'react';
import { User } from 'types';

type AppContextType = {
    userData: Partial<User>;
    setUserData: (val: Partial<User>) => void;

    loggedIn: boolean;
    setLoggedIn: (val: boolean) => void;
}

export const AppContext = createContext<AppContextType | null>(null);