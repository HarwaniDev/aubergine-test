import { db } from "./db";
import { universities } from "./data";
const CHUNK_SIZE = 1000;

async function seed() {

  for (let i = 0; i < universities.length; i += CHUNK_SIZE) {
    const slice = universities.slice(i, i + CHUNK_SIZE);
    await db.university.createMany({
      data: slice.map((u) => ({
        name: u.name,
        alphaTwoCode: u.alpha_two_code,
        country: u.country,
        stateProvince: u["state-province"],
        domains: u.domains,
        webPages: u.web_pages,
      })),
      skipDuplicates: true,
    });
    console.log(`Inserted ${Math.min(i + CHUNK_SIZE, universities.length)} of ${universities.length}`);
  }
}

seed()
  .then(() => console.log("Seeding completed."))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
