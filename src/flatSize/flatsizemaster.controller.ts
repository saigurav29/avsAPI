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
import { FlatSizeService } from './flatsizemaster.service';
import { FlatSizeMaster } from './flatsizemaster.entity';
  
  @Controller('flatsize')
  export class FlatSizeMasterController {
    constructor(private flatsizeService: FlatSizeService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
      return this.flatsizeService.getflatsize();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id) {
      return this.flatsizeService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post() create(@Body() flatsize: FlatSizeMaster) {
      return this.flatsizeService.createflatsize(flatsize);
    }
  
    @Patch(':id')
    async editNote(@Body() flatsize: FlatSizeMaster, @Param('id') id: number): Promise<FlatSizeMaster> {
      const noteEdited = await this.flatsizeService.editflatsize(id, flatsize);
      return noteEdited;
    }
  
    // @UseGuards(AuthGuard('jwt'))
    // @Delete(':UserId')
    // remove(@Param('UserId', ParseIntPipe) id) {
    //   this.userService.remove(id);
    // }
  }
  