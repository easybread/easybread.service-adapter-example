import { ExamplePaginationData } from './example.pagination-data';
import { ExampleUser } from './example.user';

export interface ExampleUsers extends ExamplePaginationData {
  users: ExampleUser[];
}
