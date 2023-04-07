import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './models/comment.model';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, type: Comment })
  @UseGuards(JwtAuthActiveGuard)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: [Comment] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(
    @CookieGetter('refresh_token') refreshToken: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, refreshToken, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(
    @CookieGetter('refresh_token') refreshToken: string,
    @Param('id') id: string,
  ) {
    return this.commentService.remove(id, refreshToken);
  }
}
