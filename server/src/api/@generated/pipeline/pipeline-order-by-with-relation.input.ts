import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { PipelineStageOrderByRelationAggregateInput } from '../pipeline-stage/pipeline-stage-order-by-relation-aggregate.input';
import { PipelineAssociationOrderByRelationAggregateInput } from '../pipeline-association/pipeline-association-order-by-relation-aggregate.input';
import { WorkspaceOrderByWithRelationInput } from '../workspace/workspace-order-by-with-relation.input';

@InputType()
export class PipelineOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  deletedAt?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  icon?: keyof typeof SortOrder;

  @HideField()
  workspaceId?: keyof typeof SortOrder;

  @Field(() => PipelineStageOrderByRelationAggregateInput, { nullable: true })
  pipelineStages?: PipelineStageOrderByRelationAggregateInput;

  @Field(() => PipelineAssociationOrderByRelationAggregateInput, {
    nullable: true,
  })
  pipelineAssociations?: PipelineAssociationOrderByRelationAggregateInput;

  @HideField()
  workspace?: WorkspaceOrderByWithRelationInput;
}
