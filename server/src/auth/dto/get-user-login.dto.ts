import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetUserLoginDto {
	@ApiProperty({ example: 'jhon@connors.com' })
	@IsNotEmpty()
	@IsEmail()
		email: string;

	@ApiProperty({ example: '1234' })
	@IsNotEmpty()
	@IsString()
		password: string;
}
