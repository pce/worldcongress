import { NestFactory } from '@nestjs/core';
// import { WsAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useWebSocketAdapter(new WsAdapter(app))
  await app.listen(8080);
}
bootstrap();
