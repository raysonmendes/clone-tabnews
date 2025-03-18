import migrationRunner from 'node-pg-migrate'
import {join} from "node:path"
import database from 'infra/database';

export default async function migrations(request, response) {
const dbClient = await database.getNewClient()
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations"
  }

  if(request.method === 'GET') {
    console.log("Entrou no GET");
    
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions) 
    await dbClient.end()
    return response.status(200).json(pendingMigrations)
  }

  if(request.method === 'POST') {
    console.log("Entrou no POST");
    try {
      const createdMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      })

      await dbClient.end()

      if (createdMigrations.length > 0) return response.status(201).json(createdMigrations)

      return response.status(200).json(createdMigrations)
    } catch (error) {
      throw error
    }
  }

  return response.status(405).end()
}


