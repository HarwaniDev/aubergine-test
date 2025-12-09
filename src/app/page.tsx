import { Suspense } from "react";

import Result from "./result";
import { CountryForm, CountryProvider } from "~/context/country-context";
import { Skeleton } from "~/components/ui/skeleton";

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

      <CountryProvider initialCountry={country}>
        <CountryForm />
      </CountryProvider>

      <Suspense fallback={<ResultsSkeleton />}>
        <Result country={country} />
      </Suspense>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-lg border bg-card p-4 shadow-sm"
        >
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
