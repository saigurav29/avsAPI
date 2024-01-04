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
  import { usermaster } from './usermaster.entity';
  import { UserService } from './usermaster.service';
import { AuthGuard } from '@nestjs/passport';
  
  @Controller('usermaster')
  export class UserMasterController {
    constructor(private userService: UserService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
      return this.userService.getUser();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get(':UserId')
    findOne(@Param('UserId', ParseIntPipe) id) {
      return this.userService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post() create(@Body() note: usermaster) {
      return this.userService.createUser(note);
    }
  
    @Patch(':UserId')
    async editNote(@Body() note: usermaster, @Param('UserId') id: number): Promise<usermaster> {
      const noteEdited = await this.userService.editUser(id, note);
      return noteEdited;
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Delete(':UserId')
    remove(@Param('UserId', ParseIntPipe) id) {
      this.userService.remove(id);
    }
  }
  