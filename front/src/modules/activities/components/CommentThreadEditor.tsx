import React, { useCallback, useState } from 'react';
import { getOperationName } from '@apollo/client/utilities';
import styled from '@emotion/styled';

import { CommentThreadBodyEditor } from '@/activities/components/CommentThreadBodyEditor';
import { CommentThreadComments } from '@/activities/components/CommentThreadComments';
import { CommentThreadRelationPicker } from '@/activities/components/CommentThreadRelationPicker';
import { CommentThreadTypeDropdown } from '@/activities/components/CommentThreadTypeDropdown';
import { GET_COMMENT_THREADS_BY_TARGETS } from '@/activities/queries';
import { PropertyBox } from '@/ui/editable-field/property-box/components/PropertyBox';
import { PropertyBoxItem } from '@/ui/editable-field/property-box/components/PropertyBoxItem';
import { useIsMobile } from '@/ui/hooks/useIsMobile';
import { IconArrowUpRight } from '@/ui/icon/index';
import {
  CommentThread,
  CommentThreadTarget,
  useUpdateCommentThreadMutation,
} from '~/generated/graphql';
import { debounce } from '~/utils/debounce';

import { CommentThreadActionBar } from '../right-drawer/components/CommentThreadActionBar';
import { CommentForDrawer } from '../types/CommentForDrawer';

import '@blocknote/core/style.css';

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow-y: auto;
`;

const StyledUpperPartContainer = styled.div`
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing(4)};
  justify-content: flex-start;
`;

const StyledTopContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  background: ${({ theme }) => theme.background.secondary};
  border-bottom: ${({ theme }) =>
    useIsMobile() ? 'none' : `1px solid ${theme.border.color.medium}`};
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 24px 24px 48px;
`;

const StyledEditableTitleInput = styled.input`
  background: transparent;

  border: none;
  color: ${({ theme }) => theme.font.color.primary};
  display: flex;
  flex: 1 0 0;

  flex-direction: column;
  font-family: Inter;
  font-size: ${({ theme }) => theme.font.size.xl};
  font-style: normal;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  justify-content: center;

  line-height: ${({ theme }) => theme.text.lineHeight.md};
  outline: none;
  width: calc(100% - ${({ theme }) => theme.spacing(2)});
  &::placeholder {
    color: ${({ theme }) => theme.font.color.light};
  }
`;

const StyledTopActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

type OwnProps = {
  commentThread: Pick<CommentThread, 'id' | 'title' | 'body' | 'type'> & {
    comments?: Array<CommentForDrawer> | null;
  } & {
    commentThreadTargets?: Array<
      Pick<CommentThreadTarget, 'id' | 'commentableId' | 'commentableType'>
    > | null;
  };
  showComment?: boolean;
  autoFillTitle?: boolean;
};

export function CommentThreadEditor({
  commentThread,
  showComment = true,
  autoFillTitle = false,
}: OwnProps) {
  const [hasUserManuallySetTitle, setHasUserManuallySetTitle] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string | null>(commentThread.title ?? '');

  const [updateCommentThreadMutation] = useUpdateCommentThreadMutation();

  const updateTitle = useCallback(
    (newTitle: string) => {
      updateCommentThreadMutation({
        variables: {
          id: commentThread.id,
          title: newTitle ?? '',
        },
        refetchQueries: [
          getOperationName(GET_COMMENT_THREADS_BY_TARGETS) ?? '',
        ],
      });
    },
    [commentThread, updateCommentThreadMutation],
  );
  const debouncedUpdateTitle = debounce(updateTitle, 200);

  function updateTitleFromBody(body: string) {
    const parsedTitle = JSON.parse(body)[0]?.content[0]?.text;
    if (!hasUserManuallySetTitle && autoFillTitle) {
      setTitle(parsedTitle);
      debouncedUpdateTitle(parsedTitle);
    }
  }

  if (!commentThread) {
    return <></>;
  }

  return (
    <StyledContainer>
      <StyledUpperPartContainer>
        <StyledTopContainer>
          <StyledTopActionsContainer>
            <CommentThreadTypeDropdown commentThread={commentThread} />
            <CommentThreadActionBar commentThreadId={commentThread?.id ?? ''} />
          </StyledTopActionsContainer>
          <StyledEditableTitleInput
            autoComplete="off"
            autoFocus
            placeholder={`${commentThread.type} title (optional)`}
            onChange={(event) => {
              setHasUserManuallySetTitle(true);
              setTitle(event.target.value);
              debouncedUpdateTitle(event.target.value);
            }}
            value={title ?? ''}
          />
          <PropertyBox>
            <PropertyBoxItem
              icon={<IconArrowUpRight />}
              value={
                <CommentThreadRelationPicker
                  commentThread={{
                    id: commentThread.id,
                    commentThreadTargets:
                      commentThread.commentThreadTargets ?? [],
                  }}
                />
              }
              label="Relations"
            />
          </PropertyBox>
        </StyledTopContainer>
        <CommentThreadBodyEditor
          commentThread={commentThread}
          onChange={updateTitleFromBody}
        />
      </StyledUpperPartContainer>
      {showComment && (
        <CommentThreadComments
          commentThread={{
            id: commentThread.id,
            comments: commentThread.comments ?? [],
          }}
        />
      )}
    </StyledContainer>
  );
}
