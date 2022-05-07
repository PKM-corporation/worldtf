import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    const config = new DocumentBuilder()
        .setTitle('Projet 2 - Metaverse')
        .setDescription('The Projet 2 - Metaverse API description')
        .setVersion('1.0')
        .addTag('Metaverse')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT);
}
bootstrap();
