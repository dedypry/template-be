import { Table } from '@/decorators/objections';
import { Model } from '.';

@Table('users')
export class UserModel extends Model {}
