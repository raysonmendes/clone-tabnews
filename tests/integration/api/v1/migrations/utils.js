import database from "infra/database";

beforeAll(cleanDatabase)

 export async function cleanDatabase() {
  
  await database.query({
    text: "drop schema public cascade; create schema public;"
  })
}

