import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import helmet from 'helmet';

config();

console.log('Environment Variables:');
console.log(`PORT: ${process.env.PORT}`);
console.log(`PG_PORT: ${process.env.PG_PORT}`);
console.log(`PG_HOST: ${process.env.PG_HOST}`);
console.log(`PG_DB: ${process.env.PG_DB}`);
console.log(`PG_USER: ${process.env.PG_USER}`);
console.log(`PG_PASS: ${process.env.PG_PASS}`);

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (_, callback) => callback(null, true),
  });

  app.use(helmet());

  await app.listen(port);
}

bootstrap().then(() => {
  console.log('App is running on 4000 port');
});
