import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { AuthGuard } from '@nestjs/passport';
import { MaterialService } from './materialmaster.service';
import { MaterialMaster } from './materialmaster.entity';
import { Flatmaterial } from '../entity/flatmaterial.entity';
  
  @Controller('material')
  export class MaterialMasterController {
    constructor(private materialService: MaterialService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
      return this.materialService.getmaterial();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id) {
      return this.materialService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post() create(@Body() material: MaterialMaster) {
      return this.materialService.creatematerial(material);
    }
  
    @Patch(':id')
    async editNote(@Body() material: MaterialMaster, @Param('id') id: number) {
      const noteEdited = await this.materialService.editmaterial(id, material);
      return noteEdited;
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id) {
      this.materialService.remove(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('addflatmaterial') 
    createflatmaterial(@Body() material: Flatmaterial) {
      return this.materialService.createFlatmaterial(material);
    }
  
    @Patch('editflatmaterial/:id')
    async editflatmaterial(@Body() material: Flatmaterial, @Param('id') id: number) {
      const noteEdited = await this.materialService.editflatmaterial(id, material);
      return noteEdited;
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Delete('deleteflatmaterial/:id')
    flatmaterialremove(@Param('id', ParseIntPipe) id) {
      this.materialService.removeflatmetiral(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getflatmaterialList/:id')
    getFlatmetrialList(@Param('id') id) {
      return this.materialService.getFlatMaterialList(id);
    }
    
  }
  