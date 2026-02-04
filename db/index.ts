// TODO: Configurar conexión a la base de datos con Drizzle
// Ejemplo de configuración con PostgreSQL (usando postgres.js):
//
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import * as schema from "./schema";
//
// const connectionString = process.env.DATABASE_URL!;
// const client = postgres(connectionString);
//
// export const db = drizzle(client, { schema });

import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type * as schema from "./schema";

// Placeholder export hasta que se configure la base de datos
export const db = null as unknown as PostgresJsDatabase<typeof schema>;
