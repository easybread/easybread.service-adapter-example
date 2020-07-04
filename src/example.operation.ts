import {
  ExampleSetupBasicAuthOperation,
  ExampleUserByIdOperation,
  ExampleUserCreateOperation,
  ExampleUserSearchOperation,
  ExampleUserUpdateOperation
} from './operations';

export type ExampleOperation =
  | ExampleSetupBasicAuthOperation
  | ExampleUserByIdOperation
  | ExampleUserCreateOperation
  | ExampleUserSearchOperation
  | ExampleUserUpdateOperation;
