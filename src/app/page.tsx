import Result from "./result";
import { CountryProvider } from "~/context/country-context";
import { CountrySearch } from "~/components/country-search";

export default function HomePage({
  searchParams,
}: {
  searchParams: { country?: string };
}) {
  const country = searchParams?.country ?? "";

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 px-4 py-12">
      <div className="text-center text-3xl font-semibold sm:text-4xl">
        Search Universities by Country
      </div>

      <CountryProvider>
        <CountrySearch />
      </CountryProvider>

      <Result country={country} />
    </div>
  );
}
