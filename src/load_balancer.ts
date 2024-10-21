import http from 'node:http';
import cluster from 'node:cluster';
import os from 'node:os';
import * as dotenv from 'dotenv';
import { createServerInstance } from './server';

dotenv.config();

const numCPUs = os.cpus().length - 1;
const PORT = Number(process.env.PORT) || 4000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  let currentIndex = 0;
  const workers = Object.values(cluster.workers ?? {});

  const loadBalancer = http.createServer((req, res) => {
    const worker = workers[currentIndex % workers.length];
    worker?.send({ req, res }, (err) => {
      if (err) {
        console.error('Error handling request:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
    console.log(`Request received on load balancer, forwarding to worker ${worker?.id}`);
    currentIndex = (currentIndex + 1) % workers.length;
  });

  loadBalancer.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });

} else {
    const workerId = cluster.worker?.id;
    if (workerId) {
        const workerPort = PORT + workerId;
        const workerServer = http.createServer((req, res) => {
          createServerInstance();
        });
        
        workerServer.listen(workerPort, () => {
          console.log(`Worker ${process.pid} started on port ${workerPort}`);
        });
    }
}
