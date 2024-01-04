import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";


@Injectable()
export class sqlRawQueryService {
    private readonly logger =  new Logger(sqlRawQueryService.name); 
  constructor(@InjectConnection() private readonly dbconnection :Connection,){
    
  }
  async ExecuteRawQuery(query:any){
    return this.dbconnection.query(query);
  }
}