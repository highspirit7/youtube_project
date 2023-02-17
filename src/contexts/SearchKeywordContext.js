import React, { createContext, useContext, useState } from "react";

const SearchKeywordContext = createContext();

export function SearchKeywordContextProvider({ children }) {
  const [keyword, setKeyword] = useState("");

  return (
    <SearchKeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchKeywordContext.Provider>
  );
}

export const useSearchKeyword = () => useContext(SearchKeywordContext);
