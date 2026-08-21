import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { GeneralFilter } from './filters/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GeneralFilter(app.get(HttpAdapterHost)));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
