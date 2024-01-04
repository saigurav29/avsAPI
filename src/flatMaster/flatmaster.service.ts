import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
 import { Connection, Repository } from 'typeorm';
import { FlatMaster } from './flatmaster.entity';
import { Flatlaboursitems } from '../entity/flatlabour.entity';
import { Flatworkitems } from '../entity/flatworkitem.entity';
import { LabourMaster } from '../labourMaster/labourmaster.entity';
import { WorkTypeMaster } from '../workType/workTypemaster.entity';

@Injectable()
export class FlatMasterService {
  private readonly logger =  new Logger(FlatMasterService.name); 
  constructor(
    @InjectRepository(FlatMaster) private flatRepository: Repository<FlatMaster>,
    @InjectConnection() private readonly dbconnection :Connection,
    @InjectRepository(Flatlaboursitems) private flatlabourRepository: Repository<Flatlaboursitems>,
    @InjectRepository(Flatworkitems) private flatworkRepository : Repository<Flatworkitems>,
    @InjectRepository(LabourMaster) private labourRepository: Repository<LabourMaster>,
    @InjectRepository(WorkTypeMaster) private worktypeRepository: Repository<WorkTypeMaster>,

  ) {}
  async getflat(): Promise<FlatMaster[]> {
    const rawQuery:any = "SELECT f.id,f.clientName,f.clientNumber,f.flatNo,f.startDate,f.ecompleteDate,s.statusname,fs.flatsize FROM avsdb.flat_master f, avsdb.flat_size_master fs, avsdb.status_master s where f.flatsize=fs.flatsizecode and f.status =s.id order by 1;";
    const dd :any =await this.doSomeRaQuery(rawQuery);
    return dd;
    // await this.flatRepository.find();
  }
  async doSomeRaQuery(query:any){
    return this.dbconnection.query(query);
  }

  findOne(id: string): Promise<FlatMaster> {
    return this.flatRepository.findOne({
      where:{id:id}
    });
  }

  async createflat(flat: FlatMaster) {
    const exists = await this.flatRepository.findOne({
      where:{clientNumber:flat.clientNumber}
    });
    if(exists){
      this.logger.error("Client Number already exists");
      throw new InternalServerErrorException("Number already exists");
    }

   const resultset = await this.flatRepository.save(flat);
   if(resultset){
    let resultMessage= "Client Flat added Successfully";
    // if(flat.workerRequired!=""){
       await this.deleteallWorkerReq(resultset.id);
       await this.deletealllabourReq(resultset.id);
       await this.InsertWorkerReq(resultset,flat);
       await this.InsertlabourReq(resultset,flat);
       
      // const wrklist :any = flat.workerRequired.split("||");
      //   for (let i = 0; i <= wrklist.length-1; i++) {
      //     let flatworktyp :Flatworkitems = new Flatworkitems();
      //     flatworktyp.flatid = resultset.id;
      //     flatworktyp.workid = wrklist[i];
      //     flatworktyp.startdate = new Date();
      //     flatworktyp.enddate = new Date();
      //     flatworktyp.status = "To Start";
      //     flatworktyp.comments="Added while creating new flat entry";
      //     const fltwrkty :any = await this.flatworkRepository.save(flatworktyp);
      //   }
    // }
      // if(flat.labours!=""){
      //   const lbrlist :any = flat.labours.split("||");
      //     for (let i = 0; i <= lbrlist.length-1; i++) {
      //       let flatlbgtyp :Flatlaboursitems = new Flatlaboursitems();
      //       flatlbgtyp.flatid = resultset.id;
      //       flatlbgtyp.labourid = lbrlist[i];
      //       flatlbgtyp.startdate= new Date();
      //       flatlbgtyp.enddate=new Date();
      //       flatlbgtyp.leavestaken = 0;
      //       flatlbgtyp.comments="Added while creating new flat entry";
      //       const fltwrkty :any = await this.flatlabourRepository.save(flatlbgtyp);
      //     }
      // }

    return {
      id:resultset.id,
      message:resultMessage
    }
   }else{
    this.logger.error("Error happened while adding client");
    throw new InternalServerErrorException("Error happened while adding client");
   }
  }
async InsertWorkerReq(resultset:any,flat: FlatMaster){
  const wrklist :any = flat.workerRequired.split("||");
  for (let i = 0; i <= wrklist.length-1; i++) {
    let flatworktyp :Flatworkitems = new Flatworkitems();
    flatworktyp.flatid = resultset.id;
    flatworktyp.workid = wrklist[i];
    flatworktyp.startdate = new Date();
    flatworktyp.enddate = new Date();
    flatworktyp.status = "To Start";
    flatworktyp.comments="Added while creating or updating flat";
    const fltwrkty :any = await this.flatworkRepository.save(flatworktyp);
  }
}
async InsertlabourReq(resultset:any,flat: FlatMaster){
  const lbrlist :any = flat.labours.split("||");
  for (let i = 0; i <= lbrlist.length-1; i++) {
    let flatlbgtyp :Flatlaboursitems = new Flatlaboursitems();
    flatlbgtyp.flatid = resultset.id;
    flatlbgtyp.labourid = lbrlist[i];
    flatlbgtyp.startdate= new Date();
    flatlbgtyp.enddate=new Date();
    flatlbgtyp.leavestaken = 0;
    flatlbgtyp.comments="Added while creating or updating flat";
    const fltwrkty :any = await this.flatlabourRepository.save(flatlbgtyp);
  }
}

  async deleteallWorkerReq(id:any){
    const rawQuery:any = "delete from avsdb.flatworkitems  where flatid= "+id+"";
    const dd :any =await this.doSomeRaQuery(rawQuery);
  }
  async deletealllabourReq(id:any){
    const rawQuery:any = "delete from avsdb.flatlaboursitems  where flatid= "+id+"";
    const dd :any =await this.doSomeRaQuery(rawQuery);
  }

  async remove(id: string): Promise<void> {
    await this.flatRepository.delete(id);
  }

  async editflat(id: number, flat: FlatMaster) {
    const editflat = await this.flatRepository.findOne({
        where:{id:id}
      });
    if (!editflat) {
      throw new NotFoundException('flat is not found');
    }
    editflat.clientName = flat.clientName;
    editflat.clientNumber = flat.clientNumber;
    editflat.clientEmail = flat.clientEmail;
    editflat.clientAddress = flat.clientAddress;
    editflat.labours = flat.labours;
    editflat.workerRequired = flat.workerRequired;
    editflat.city = flat.city;
    editflat.flatNo = flat.flatNo;
    editflat.flatsize = flat.flatsize;
    editflat.startDate = flat.startDate;
    editflat.ecompleteDate = flat.ecompleteDate;
    editflat.acompleteDate = flat.acompleteDate;
    editflat.status = flat.status;


   const resultset:any = await editflat.save();
   if(resultset){
    let resultMessage= "Client Flat Updated Successfully";
    // if(flat.workerRequired!=""){
       await this.deleteallWorkerReq(resultset.id);
       await this.deletealllabourReq(resultset.id);
       await this.InsertWorkerReq(resultset,flat);
       await this.InsertlabourReq(resultset,flat);
       return {
        id:resultset.id,
        message:resultMessage
      }
     }else{
      this.logger.error("Error happened while adding client");
      throw new InternalServerErrorException("Error happened while adding client");
     }
  }

}
