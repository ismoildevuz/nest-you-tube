import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { v4 as uuidv4, v4 } from 'uuid';
import { VideoService } from '../video/video.service';
import { User } from '../user/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(User) private userRepository: typeof User,
    private readonly videoService: VideoService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { user_id, video_id, body } = createCommentDto;
    const user = await this.userRepository.findOne({
      where: { id: user_id, is_active: true },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const video = await this.videoService.findOne(video_id);
    return this.commentRepository.create({
      id: uuidv4(),
      ...createCommentDto,
    });
  }

  async findAll() {
    return this.commentRepository.findAll({
      where: { is_active: true },
      include: { all: true },
    });
  }

  async findOne(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id, is_active: true },
      include: { all: true },
    });
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    return comment;
  }

  async update(
    id: string,
    refreshToken: string,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.findOne(id);
    const user = await this.isOwner(comment.user_id, refreshToken);
    const updatedComment = await this.commentRepository.update(
      updateCommentDto,
      {
        where: { id, is_active: true },
        returning: true,
      },
    );
    return this.findOne(id);
  }

  async remove(id: string, refreshToken: string) {
    const comment = await this.findOne(id);
    const user = await this.isOwner(comment.user_id, refreshToken);
    const deletedComment = await this.commentRepository.destroy({
      where: { id, is_active: true },
    });
    return { message: 'Comment deleted' };
  }

  async isOwner(user_id: string, refreshToken: string) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const userExist = await this.findUser(user.id);
    if (userExist.id != user_id) {
      throw new HttpException(
        'You do not have permission to do this',
        HttpStatus.BAD_REQUEST,
      );
    }
    return userExist;
  }

  async findUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, is_active: true },
      include: { all: true },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getCommentById(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    return comment;
  }

  async updateIsActive(id: string, is_active: boolean) {
    const comment = await this.getCommentById(id);
    const updatedComment = await this.commentRepository.update(
      { is_active },
      {
        where: { id },
        returning: true,
      },
    );
    return this.getCommentById(id);
  }
}
