import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { WorkspaceMemberCreateNestedManyWithoutWorkspaceInput } from '../workspace-member/workspace-member-create-nested-many-without-workspace.input';
import { CompanyCreateNestedManyWithoutWorkspaceInput } from '../company/company-create-nested-many-without-workspace.input';
import { PersonCreateNestedManyWithoutWorkspaceInput } from '../person/person-create-nested-many-without-workspace.input';
import { CommentCreateNestedManyWithoutWorkspaceInput } from '../comment/comment-create-nested-many-without-workspace.input';

@InputType()
export class WorkspaceCreateWithoutCommentThreadsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date | string;

  @Field(() => String, { nullable: false })
  domainName!: string;

  @Field(() => String, { nullable: false })
  displayName!: string;

  @Field(() => String, { nullable: true })
  logo?: string;

  @Field(() => WorkspaceMemberCreateNestedManyWithoutWorkspaceInput, {
    nullable: true,
  })
  workspaceMember?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput;

  @Field(() => CompanyCreateNestedManyWithoutWorkspaceInput, { nullable: true })
  companies?: CompanyCreateNestedManyWithoutWorkspaceInput;

  @Field(() => PersonCreateNestedManyWithoutWorkspaceInput, { nullable: true })
  people?: PersonCreateNestedManyWithoutWorkspaceInput;

  @Field(() => CommentCreateNestedManyWithoutWorkspaceInput, { nullable: true })
  comments?: CommentCreateNestedManyWithoutWorkspaceInput;
}
