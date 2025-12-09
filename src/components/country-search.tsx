"use client";

import { type FormEvent, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCountry } from "~/context/country-context";

export function CountrySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { country, setCountry } = useCountry();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = country.trim();

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("country", query);
      } else {
        params.delete("country");
      }

      router.replace(`/?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-lg flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
    >
      <Input
        placeholder="Enter country name"
        className="w-full sm:max-w-xs"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        aria-label="Country"
      />
      <Button className="w-full sm:w-auto" type="submit" disabled={isPending}>
        {isPending ? "Searching..." : "Filter"}
      </Button>
    </form>
  );
}

