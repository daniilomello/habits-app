import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';

const app = Fastify();

app.register(cors, {origin: true});
app.register(appRoutes);

app.listen({
  port: 3001,
  host: '0.0.0.0',
}).then(() => console.log('🚀 Running on http://localhost:3001/'));
