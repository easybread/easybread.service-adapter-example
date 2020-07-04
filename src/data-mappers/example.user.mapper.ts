import { BreadDataMapDefinition, BreadDataMapper } from '@easybread/core';
import { PersonSchema } from '@easybread/schemas';

import { ExampleUser } from '../interfaces';

export class ExampleUserMapper extends BreadDataMapper<
  ExampleUser,
  PersonSchema
> {
  protected readonly toRemoteMap: BreadDataMapDefinition<
    PersonSchema,
    ExampleUser
  > = {
    _id: 'identifier',
    firstName: 'givenName',
    lastName: 'familyName',
    middleName: 'additionalName',
    contacts: input => ({
      email: input.email,
      mobilePhone: input.telephone
    })
  };

  protected readonly toSchemaMap: BreadDataMapDefinition<
    ExampleUser,
    PersonSchema
  > = {
    '@type': _ => 'Person',
    identifier: '_id',
    givenName: 'firstName',
    familyName: 'lastName',
    additionalName: 'middleName',
    email: input => input?.contacts?.email,
    telephone: input => input?.contacts?.mobilePhone
  };
}
