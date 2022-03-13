import { NestFactory } from '@nestjs/core';
// import { WsAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`${process.env.MDB_DSN}`);
  // app.useWebSocketAdapter(new WsAdapter(app))
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
