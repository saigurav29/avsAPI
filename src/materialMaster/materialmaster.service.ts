import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
import { MaterialMaster } from './materialmaster.entity';
import { Flatmaterial } from '../entity/flatmaterial.entity';
import { sqlRawQueryService } from '../shared/service/sqlRawQuery.service';


@Injectable()
export class MaterialService {
  private readonly logger =  new Logger(MaterialService.name); 

  constructor(
    @InjectRepository(MaterialMaster) private MaterialRepository: Repository<MaterialMaster>,
    @InjectRepository(Flatmaterial) private FlatMaterialRepository: Repository<Flatmaterial>,
    private executeRAWQuery:sqlRawQueryService
    ) {}
  async getmaterial(): Promise<MaterialMaster[]> {
    return await this.MaterialRepository.find();
  }

  findOne(id: string): Promise<MaterialMaster> {
    return this.MaterialRepository.findOne({
      where:{id:id}
    });
  }

  async creatematerial(material: MaterialMaster) {
    // const exists = await this.MaterialRepository.findOne({
    //   where:{materialNumber:material.materialNumber}
    // });
    // if(exists){
    //   this.logger.error("material Number already exists");
    //   throw new InternalServerErrorException("Number already exists");
    // }
    const resultset = await this.MaterialRepository.save(material);
    if(resultset){
      let resultMessage= "Material Added Successfully";
      return {
        id:resultset.id,
        message:resultMessage
      }
    }else{
      this.logger.error("Error happened while adding material");
      throw new InternalServerErrorException("Error happened while adding material");
     }
    
  }

  async createFlatmaterial(flatmaterial: Flatmaterial) {
    const resultset = await this.FlatMaterialRepository.save(flatmaterial);
    if(resultset){
      let resultMessage= "Material Added Successfully To Flat.";
      return {
        id:resultset.id,
        message:resultMessage
      }
    }else{
      this.logger.error("Error happened while adding material to flat");
      throw new InternalServerErrorException("Error happened while adding material to flat");
     }
    
  }

  async removeflatmetiral(id: string) {
    const exists = await this.FlatMaterialRepository.findOne({
      where:{id:id}
    });
    if(exists){
       await this.FlatMaterialRepository.delete(id);
       let resultMessage= "Flat Material Deleted Successfully";
       return {
         id:id,
         message:resultMessage
       }
    }else{
      this.logger.error("Error happened while deleting material of flat");
      throw new InternalServerErrorException("Error happened while deleting material of flat");
    }
  }

  async editflatmaterial(id: number, material: Flatmaterial) {
    const editflatmaterial = await this.FlatMaterialRepository.findOne({
        where:{id:id}
      });
    if (!editflatmaterial) {
      throw new NotFoundException('material is not found');
    }
    editflatmaterial.flatid = material.flatid;
    editflatmaterial.materialId = material.materialId;
    editflatmaterial.materialQty = material.materialQty;
    editflatmaterial.materialprice = material.materialprice;
    editflatmaterial.city = material.city;
    editflatmaterial.desc = material.desc;

    const resultset = await editflatmaterial.save();
    if(resultset){
      let resultMessage= "Flat Material Upadted Successfully";
      return {
        id:resultset.id,
        message:resultMessage,
        data:resultset
      }
    }else{
      this.logger.error("Error happened while updating material");
      throw new InternalServerErrorException("Error happened while updating material");
     }
  }

  async remove(id: string) {
    const exists = await this.MaterialRepository.findOne({
      where:{id:id}
    });
    if(exists){
       await this.MaterialRepository.delete(id);
       let resultMessage= "Material Deleted Successfully";
       return {
         id:id,
         message:resultMessage
       }
    }else{
      this.logger.error("Error happened while deleting material");
      throw new InternalServerErrorException("Error happened while deleting material");
    }
  }

  async editmaterial(id: number, material: MaterialMaster) {
    const editmaterial = await this.MaterialRepository.findOne({
        where:{id:id}
      });
    if (!editmaterial) {
      throw new NotFoundException('material is not found');
    }
    editmaterial.materialName = material.materialName;
    editmaterial.materialType = material.materialType;
    editmaterial.materialDes = material.materialDes;
    const resultset = await editmaterial.save();
    if(resultset){
      let resultMessage= "Material Upadted Successfully";
      return {
        id:resultset.id,
        message:resultMessage,
        data:resultset
      }
    }else{
      this.logger.error("Error happened while updating material");
      throw new InternalServerErrorException("Error happened while updating material");
     }
  }

  async getFlatMaterialList(id:any){
    const query:any ="select fm.id, fm.flatid,f.flatNo, fm.materialId,m.materialName,fm.materialQty,fm.materialprice,m.materialType,fm.desc,m.materialDes from avsdb.flatmaterial fm left join avsdb.flat_master f on fm.flatid=f.id left join avsdb.material_master m on fm.materialId = m.id where fm.flatid="+ id + " order by fm.flatid;"
    const result = await this.executeRAWQuery.ExecuteRawQuery(query);
    return result;
  }
}
