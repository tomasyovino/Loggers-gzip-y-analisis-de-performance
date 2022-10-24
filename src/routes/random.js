import { Router } from "express";
import cluster  from "cluster";
import http from "http";
import os from "os";

const randomRouter = Router();
const PORT = 8081;

const numCPUs = os.cpus().length;
const randomNum = Math.ceil(Math.random() * (10000 - 1) + 1);

const info = {
    num_random: randomNum,
    process: numCPUs,
}

randomRouter.get("/", (req, res) => {
    return res.redirect("http://localhost:8081/api/randoms");
});

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`${worker.process.pid} is finished`);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(JSON.stringify(info));
    })
    .listen(PORT);
}

export default randomRouter;