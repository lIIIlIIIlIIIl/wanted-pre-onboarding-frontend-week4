import { createContext, useContext } from "react";

export type SickName = string[];

interface SearchType {
  sickName: SickName;
}

interface SearchSerivceType {
  getSearch: (word: string) => Promise<SearchType | undefined>;
}

interface ProviderProps {
  children: React.ReactNode;
  searchService: SearchSerivceType;
}

const ApiContext = createContext<SearchSerivceType | null>(null);
export const useApi = () => useContext(ApiContext);

const ApiProvider = ({ children, searchService }: ProviderProps) => {
  const getSearch = searchService.getSearch.bind(searchService);

  return (
    <ApiContext.Provider value={{ getSearch }}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
