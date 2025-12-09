"use client";

import { createContext, useContext, useMemo, useState } from "react";

type CountryContextValue = {
  country: string;
  setCountry: (value: string) => void;
};

const CountryContext = createContext<CountryContextValue | undefined>(
  undefined,
);

export function CountryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [country, setCountry] = useState("");
  const value = useMemo(
    () => ({
      country,
      setCountry,
    }),
    [country],
  );

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }

  return context;
}

