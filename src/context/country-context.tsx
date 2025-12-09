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
  initialCountry,
  children,
}: {
  initialCountry?: string;
  children: React.ReactNode;
}) {
  const [country, setCountry] = useState(initialCountry ?? "");
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
 
export function CountryForm() {
  const { country, setCountry } = useCountry();

  return (
    <form
      method="get"
      action="/"
      className="flex w-full max-w-lg flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
    >
      <input
        name="country"
        aria-label="Country"
        placeholder="Enter country name"
        className="w-full rounded-md border px-3 py-2 text-sm shadow-sm sm:max-w-xs"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      />
      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground sm:w-auto"
      >
        Filter
      </button>
    </form>
  );
}

