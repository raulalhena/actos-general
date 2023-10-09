import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { HttpExceptionFilter } from './filters/http-exceptions.filter';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder().setTitle('ACTOS App')
						.setDescription('Events management application.')
						.setVersion('v1')
						.addTag('events')
						.build();

	const document = SwaggerModule.createDocument(app, config);						
	SwaggerModule.setup('docs', app, document);

	app.use(bodyParser.json({limit: '50mb'}));
  	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
	
	app.useGlobalFilters(new HttpExceptionFilter());
	app.enableCors();
	app.setGlobalPrefix('api');

	await app.listen(process.env.PORT);
}
bootstrap();
