import { Comment } from './comment.entity';

export const commentProviders = [{ provide: 'CommentRepository', useValue: Comment }];
