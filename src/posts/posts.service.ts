import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { domainToASCII } from 'url';


@Injectable()
export class PostsService {
  constructor(private prisma:PrismaService){}
  async create(createPostDto: CreatePostDto) {
    //check for same title
    const alreadypost  = await this.prisma.post.findUnique({
      where:{
        title:createPostDto.title,
      }
    })
    console.log(alreadypost)
    if (alreadypost){
      throw new ForbiddenException("Post is already created")
    }

    try{
      const post  = await this.prisma.post.create({
        data:{
          title: createPostDto.title,
          description:createPostDto.description,
          tags:createPostDto.tags
        }
      })

      return post
    
    }catch(error){
      console.log(error)
    }
    //if different then create post
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
