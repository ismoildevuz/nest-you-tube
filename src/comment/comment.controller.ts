import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './models/comment.model';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, type: Comment })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiResponse({ status: 200, type: Comment })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 200, type: Comment })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
