import { PartialType } from '@nestjs/mapped-types';
import { IsString,IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description?: string

    @IsString()
    tags?: string
}
