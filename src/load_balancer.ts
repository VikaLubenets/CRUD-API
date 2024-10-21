import 'dotenv/config'
import http from 'node:http';
import cluster from 'node:cluster';
import os from 'node:os';
import { createServerInstance } from './server';


const numCPUs = os.cpus().length - 1;
const PORT = Number(process.env.PORT) || 4000;
const BASE_URL = 'http://localhost/'

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  const workers = cluster.workers ? Object.values(cluster.workers) : [];

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} has died. Starting a new one.`);
    const newWorker = cluster.fork();
    workers[worker.id] = newWorker;
  });

  let currentIndex = 0;
  const server = http.createServer((req, res) => {
      const redirectTo = new URL(BASE_URL)
      redirectTo.pathname = req.url || ''
      redirectTo.port = String(PORT + (currentIndex++ % numCPUs))
      res.writeHead(307, { Location: redirectTo.href })
      res.end()
    });

  server.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });

} else {
  const workerId = cluster.worker?.id;

  if (workerId) {
    const port = PORT + workerId;
    const workerServer = createServerInstance();

    workerServer.listen(port, () => {
      console.log(`Worker with id ${workerId} and pid ${process.pid} started on port ${port}`);
    });

    workerServer.on('request', (req) => {
      console.log(
          `Worker:${port} received request: ${req.method}:${req.url}`,
      )
  });
  }
}






// import http from 'node:http';
// import cluster from 'node:cluster';
// import os from 'node:os';
// import * as dotenv from 'dotenv';
// import {createServerInstance} from './server';

// dotenv.config();

// const numCPUs = os.cpus().length - 1;
// const PORT = Number(process.env.PORT) || 4000;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker) => {
//     console.log(`Worker ${worker.process.pid} has died. Starting a new one.`);
//     cluster.fork();
//   });

//   let currentIndex = 0;
//   const workers = cluster.workers ? Object.values(cluster.workers) : [];

//   const loadBalancer = http.createServer((req, res) => {
//     const worker = workers[currentIndex];
//     if (worker) {
      
    
//     }
//     currentIndex = (currentIndex + 1) % workers.length;
//   });

//   loadBalancer.listen(PORT, () => {
//     console.log(`Load balancer listening on port ${PORT}`);
//   });

// } else {
//   const workerId = cluster.worker?.id;
//   if (workerId) {
//     const workerServer = createServerInstance();

//     workerServer.listen(PORT + workerId, () => {
//       console.log(`Worker with id ${workerId} and pid ${process.pid} started on port ${PORT + workerId}`);
//     });
//   }
// }


