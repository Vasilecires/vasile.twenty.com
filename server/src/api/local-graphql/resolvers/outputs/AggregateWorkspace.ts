import * as TypeGraphQL from '@nestjs/graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '@prisma/client';
import { DecimalJSScalar } from '../../scalars';
import { WorkspaceCountAggregate } from './WorkspaceCountAggregate';
import { WorkspaceMaxAggregate } from './WorkspaceMaxAggregate';
import { WorkspaceMinAggregate } from './WorkspaceMinAggregate';

@TypeGraphQL.ObjectType('AggregateWorkspace', {
  isAbstract: true,
})
export class AggregateWorkspace {
  @TypeGraphQL.Field((_type) => WorkspaceCountAggregate, {
    nullable: true,
  })
  _count!: WorkspaceCountAggregate | null;

  @TypeGraphQL.Field((_type) => WorkspaceMinAggregate, {
    nullable: true,
  })
  _min!: WorkspaceMinAggregate | null;

  @TypeGraphQL.Field((_type) => WorkspaceMaxAggregate, {
    nullable: true,
  })
  _max!: WorkspaceMaxAggregate | null;
}
