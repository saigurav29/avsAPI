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
import { FlatMasterService } from './flatmaster.service';
import { FlatMaster } from './flatmaster.entity';
import { ApiResponse } from '@nestjs/swagger';
import { CommonResponseDto } from "../shared/dto/commonResponseDto";
  
  @Controller('flat')
  export class FlatMasterController {
    constructor(private flatService: FlatMasterService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
      return this.flatService.getflat();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id) {
      return this.flatService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post() 
    @ApiResponse({
      status:201,
      type:CommonResponseDto
    })
    // @ModelsApiException()
    async create(@Body() flat: FlatMaster) {
      return this.flatService.createflat(flat);
    }
  
    @Patch(':id')
    async editNote(@Body() flat: FlatMaster, @Param('id') id: number) {
      const noteEdited = await this.flatService.editflat(id, flat);
      return noteEdited;
    }
  
    // @UseGuards(AuthGuard('jwt'))
    // @Delete(':UserId')
    // remove(@Param('UserId', ParseIntPipe) id) {
    //   this.userService.remove(id);
    // }
  }
  