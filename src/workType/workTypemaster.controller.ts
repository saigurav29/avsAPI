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
import { WorkTypeMaster } from './workTypemaster.entity';
import { WorkTypeService } from './workTypemaster.service';
  
  @Controller('worktype')
  export class WorkTypeMasterController {
    constructor(private worktypeService: WorkTypeService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
      return this.worktypeService.getworktype();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id) {
      return this.worktypeService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post() create(@Body() worktype: WorkTypeMaster) {
      return this.worktypeService.createworktype(worktype);
    }
  
    @Patch(':id')
    async editNote(@Body() worktype: WorkTypeMaster, @Param('id') id: number): Promise<WorkTypeMaster> {
      const noteEdited = await this.worktypeService.editworktype(id, worktype);
      return noteEdited;
    }
  
    // @UseGuards(AuthGuard('jwt'))
    // @Delete(':UserId')
    // remove(@Param('UserId', ParseIntPipe) id) {
    //   this.userService.remove(id);
    // }
  }
  