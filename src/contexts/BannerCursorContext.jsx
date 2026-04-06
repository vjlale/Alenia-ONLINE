import { createContext, useContext, useState, useCallback } from 'react';

const BannerCursorContext = createContext(null);

export function BannerCursorProvider({ children }) {
  const [isPointerOverBanner, setIsPointerOverBanner] = useState(false);

  const setPointerOverBanner = useCallback((value) => {
    setIsPointerOverBanner(Boolean(value));
  }, []);

  return (
    <BannerCursorContext.Provider
      value={{ isPointerOverBanner, setPointerOverBanner }}
    >
      {children}
    </BannerCursorContext.Provider>
  );
}

export function useBannerCursorContext() {
  const ctx = useContext(BannerCursorContext);
  if (!ctx) {
    return { isPointerOverBanner: false, setPointerOverBanner: () => {} };
  }
  return ctx;
}
