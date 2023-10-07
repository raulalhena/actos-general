import { IsNotEmpty } from 'class-validator';


export class UpdateEventDto {
    @IsNotEmpty()
    visibility: boolean

    @IsNotEmpty()
    status: boolean
}
