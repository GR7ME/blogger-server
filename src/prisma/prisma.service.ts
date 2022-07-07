import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources:{
                db:{
                    url: 'mongodb://root:prisma@localhost:27017/db_name?authSource=admin&retryWrites=false'
                }
            }
        })
    }
}
