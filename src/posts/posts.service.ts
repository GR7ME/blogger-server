import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { domainToASCII } from 'url';
import { stringify } from 'querystring';
import { threadId } from 'worker_threads';


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
      console.log(post)

      return this.findAll()
    
    }catch(error){
      console.log(error)
    }
    //if different then create post
  }

  async findAll() {
    const post  = await this.prisma.post.findMany()

    return post;
  }

  async findOne(id: string) {
    //find  user by id
    const post = await this.prisma.post.findUnique({
      where:{
        id
      }
    })
    //if exists send otherwise throw error
    if(!post){
      throw new ForbiddenException("No post with such Id")
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    //find post by id
    const post = await this.prisma.post.findUnique({
      where:{
        id
      }
    })
    //if doesnt exists throw error
    if(!post){
      throw new ForbiddenException("No post with such Id")
    }

    return this.prisma.post.update({
      where:{
        id
      },data:{
        ...updatePostDto
      }
    })
 
  }

  async remove(id: string) {
    const post = await this.prisma.post.findUnique({
      where:{
        id
      }
    })
    //if doesnt exists throw error
    if(!post){
      throw new ForbiddenException("No post with such Id")
    }
    
    const del = await this.prisma.post.delete({
      where:{
        id
      }
    })
    console.log(del)
    return this.findAll()
  }
}
