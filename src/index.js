import app from "./app";
import "./database";

app.listen(app.get("port"));

console.log("Server on port", app.get("port"));
console.log("Enviroment", process.env.NODE_ENV);