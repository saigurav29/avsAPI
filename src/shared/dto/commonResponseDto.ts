import { ApiProperty } from "@nestjs/swagger";

export class CommonResponseDto{
    @ApiProperty()
    id:number;
    @ApiProperty()
    message:string;
}