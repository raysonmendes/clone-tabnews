import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum");
  console.log("quere result: ", result.rows);

  response.status(200).json({ chave: "valor" });
}

export default status;
