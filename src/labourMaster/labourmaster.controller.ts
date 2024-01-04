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
import { LabourMaster } from './labourmaster.entity';
import { LabourService } from './labourmaster.service';
  
  @Controller('labour')
  export class LabourMasterController {
    constructor(private LabourService: LabourService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
      return this.LabourService.getLabour();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id) {
      return this.LabourService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post() create(@Body() Labour: LabourMaster) {
      return this.LabourService.createLabour(Labour);
    }
  
    @Patch(':id')
    async editNote(@Body() Labour: LabourMaster, @Param('id') id: number) {
      const noteEdited = await this.LabourService.editLabour(id, Labour);
      return noteEdited;
    }
  
    // @UseGuards(AuthGuard('jwt'))
    // @Delete(':UserId')
    // remove(@Param('UserId', ParseIntPipe) id) {
    //   this.userService.remove(id);
    // }
  }
  