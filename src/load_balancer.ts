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

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new one...`);
    cluster.fork();
  });

  let currentIndex = 0;
  const workers = Object.values(cluster.workers ?? {});

  const loadBalancer = http.createServer((req, res) => {
    const worker = workers[currentIndex];
    if (worker) {
        const { method, headers, url } = req;
        let body: any = '';
  
        req.on('data', (chunk) => {
          body += chunk;
        });
  
        req.on('end', () => {
          worker.send({ method, headers, url, body }, (err) => {
            if (err) {
              console.error('Error sending request to worker:', err);
              res.writeHead(500);
              res.end('Internal Server Error');
            }
          });
        
          console.log(`Request received on load balancer, forwarding to worker id ${worker.id}`);
          
          worker.once('message', (message) => {
            const { statusCode, headers, responseBody } = message;
            res.writeHead(statusCode, headers);
            res.end(responseBody);
          });
        });
      }
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
          console.log(`Worker ${workerId} started on port ${workerPort}`);
        });
    }
}
