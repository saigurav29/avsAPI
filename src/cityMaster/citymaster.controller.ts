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
import { CityService } from './citymaster.service';
import { Citymaster } from './citymaster.entity';
  
  @Controller('city')
  export class CityMasterController {
    constructor(private cityService: CityService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
      return this.cityService.getCity();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id) {
      return this.cityService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post() create(@Body() note: Citymaster) {
      return this.cityService.createCity(note);
    }
  
    @Patch(':id')
    async editNote(@Body() city: Citymaster, @Param('id') id: number): Promise<Citymaster> {
      const noteEdited = await this.cityService.editCity(id, city);
      return noteEdited;
    }
  
    // @UseGuards(AuthGuard('jwt'))
    // @Delete(':UserId')
    // remove(@Param('UserId', ParseIntPipe) id) {
    //   this.userService.remove(id);
    // }
  }
  