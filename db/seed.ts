import "dotenv/config";
import { db } from "./index";
import { departments, PERU_DEPARTMENTS } from "./schema/departments";

async function seed(): Promise<void> {
  console.log("Seeding departamentos del Perú...");

  await db
    .insert(departments)
    .values([...PERU_DEPARTMENTS])
    .onConflictDoNothing();

  console.log(`✅ ${PERU_DEPARTMENTS.length} departamentos insertados.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error en seed:", error);
  process.exit(1);
});
