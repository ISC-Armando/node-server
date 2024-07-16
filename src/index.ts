import server from "./server";
// import colors from "colors"
const port = process.env.PORT || 4002

server.listen(port,  () => {
  console.log(`Server is running on http://localhost:${port}`)
})