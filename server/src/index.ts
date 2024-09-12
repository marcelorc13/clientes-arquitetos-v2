import { configDotenv } from "dotenv";
import { app } from "./app";

configDotenv()
const port = process.env.PORT

app.listen(port, () => console.log(`O app está rodando em http://localhost:${port}`))