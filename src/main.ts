import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

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
