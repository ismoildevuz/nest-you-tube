import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { v4 as uuidv4, v4 } from 'uuid';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.create({
      id: uuidv4(),
      ...createCommentDto,
    });
  }

  async findAll() {
    return this.commentRepository.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(id);
    const updatedComment = await this.commentRepository.update(
      updateCommentDto,
      {
        where: { id },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async remove(id: string) {
    const comment = await this.findOne(id);
    const deletedComment = await this.commentRepository.destroy({
      where: { id },
    });
    return { message: 'Comment deleted' };
  }
}
