import {Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger("bootstrap");
  logger.log("Node_env");
  const app = await NestFactory.create(AppModule);
  app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Method","GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Accept");
    res.header("Access-Control-Allow-Headers","X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MDS, Content-Type, Date X-Api-Version");
    next();
  });
  app.enableCors(
    {allowedHeaders:"*",
  origin:"*",}
  );
app.useGlobalPipes(new ValidationPipe());


  const config = new DocumentBuilder()
  .setTitle('AVsinterios Swagger')
  .setDescription('API description')
  .setVersion('1.0')
  .addTag('app')
  .addBearerAuth()
  .build();
 

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api', app, document);
logger.log('Swagger docs {/api-explorer}');

await app.listen(3001);
logger.log('Auth Service running on port ');
console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
