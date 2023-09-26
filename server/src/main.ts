import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder().setTitle('Aplicación ACTOS')
						.setDescription('Aplicación de gestión de eventos')
						.setVersion('v1')
						.addTag('events')
						.build();

	const document = SwaggerModule.createDocument(app, config);						
	SwaggerModule.setup('docs', app, document);
	
	app.enableCors();
	app.setGlobalPrefix('api');

	await app.listen(8000);
}
bootstrap();
