import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { HideField } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCommentsInput } from '../user/user-create-nested-one-without-comments.input';
import { CommentThreadCreateNestedOneWithoutCommentsInput } from '../comment-thread/comment-thread-create-nested-one-without-comments.input';

@InputType()
export class CommentCreateWithoutWorkspaceInput {

    @Field(() => String, {nullable:true})
    @Validator.IsString()
    @Validator.IsOptional()
    id?: string;

    @Field(() => String, {nullable:false})
    @Validator.IsString()
    body!: string;

    @HideField()
    deletedAt?: Date | string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutCommentsInput, {nullable:false})
    author!: UserCreateNestedOneWithoutCommentsInput;

    @Field(() => CommentThreadCreateNestedOneWithoutCommentsInput, {nullable:false})
    commentThread!: CommentThreadCreateNestedOneWithoutCommentsInput;
}
