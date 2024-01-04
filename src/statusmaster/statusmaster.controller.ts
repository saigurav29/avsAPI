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
import { StatusService } from './statusmaster.service';
import { StatusMaster } from './statusmaster.entity';
  
  @Controller('status')
  export class StatusMasterController {
    constructor(private statusService: StatusService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
      return this.statusService.getStatus();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id) {
      return this.statusService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post() create(@Body() status: StatusMaster) {
      return this.statusService.createStatus(status);
    }
  
    @Patch(':id')
    async editNote(@Body() status: StatusMaster, @Param('id') id: number): Promise<StatusMaster> {
      const noteEdited = await this.statusService.editStatus(id, status);
      return noteEdited;
    }
  
    // @UseGuards(AuthGuard('jwt'))
    // @Delete(':UserId')
    // remove(@Param('UserId', ParseIntPipe) id) {
    //   this.userService.remove(id);
    // }
  }
  