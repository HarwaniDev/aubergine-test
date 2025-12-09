import { db } from "~/server/db";

type ResultProps = {
  country?: string;
};

export default async function Result({ country }: ResultProps) {
  const filter = country?.trim();

  const universities = await db.university.findMany({
    where: filter
      ? {
          country: {
            contains: filter,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: [{ country: "asc" }, { name: "asc" }],
    take: 50,
  });

  if (!universities.length) {
    return (
      <div className="w-full max-w-3xl text-center text-muted-foreground">
        {filter ? "No universities match that country yet." : "Start typing a country to see results."}
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {universities.map((university) => {
        const primaryPage = university.webPages[0] ?? "";
        return (
          <div
            key={university.id}
            className="flex flex-col gap-2 rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="text-lg font-semibold">{university.name}</div>
            <div className="text-sm text-muted-foreground">{university.country}</div>
            {primaryPage ? (
              <a
                className="text-sm text-primary underline"
                href={primaryPage}
                target="_blank"
                rel="noreferrer"
              >
                {primaryPage}
              </a>
            ) : (
              <div className="text-sm text-muted-foreground">No website listed</div>
            )}
          </div>
        );
      })}
    </div>
  );
}