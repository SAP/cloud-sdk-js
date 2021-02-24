import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { serviceHandler } from 'src/catalogue/catalogue-service-handler';
import cds = require('@sap/cds');

@Module({})
export class CatalogueModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    const service: any = await cds
      .connect()
      .serve('CatalogService')
      .with(serviceHandler);

    consumer.apply(service).forRoutes('catalog');
  }
}
