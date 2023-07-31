import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Key } from 'ts-key-enum';

import { IconChevronDown } from '@/ui/icon/index';
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';

import { FiltersHotkeyScope } from '../types/FiltersHotkeyScope';

import { DropdownMenuContainer } from './DropdownMenuContainer';

type OwnProps = {
  label: string;
  isActive: boolean;
  children?: ReactNode;
  isUnfolded?: boolean;
  onIsUnfoldedChange?: (newIsUnfolded: boolean) => void;
  resetState?: () => void;
  HotkeyScope: FiltersHotkeyScope;
};

const StyledDropdownButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

type StyledDropdownButtonProps = {
  isUnfolded: boolean;
  isActive: boolean;
};

const StyledDropdownButton = styled.div<StyledDropdownButtonProps>`
  background: ${({ theme }) => theme.background.primary};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${(props) => (props.isActive ? props.theme.color.blue : 'none')};
  cursor: pointer;
  display: flex;
  filter: ${(props) => (props.isUnfolded ? 'brightness(0.95)' : 'none')};

  padding: ${({ theme }) => theme.spacing(1)};
  padding-left: ${({ theme }) => theme.spacing(2)};

  padding-right: ${({ theme }) => theme.spacing(2)};
  user-select: none;

  &:hover {
    filter: brightness(0.95);
  }
`;

const StyledDropdownTopOption = styled.li`
  color: ${({ theme }) => theme.font.color.primary};
  cursor: pointer;
  display: flex;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  justify-content: space-between;

  padding: calc(${({ theme }) => theme.spacing(2)})
    calc(${({ theme }) => theme.spacing(2)});
  &:hover {
    background: ${({ theme }) => theme.background.transparent.light};
  }
  user-select: none;
`;

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing(1)};
  min-width: ${({ theme }) => theme.spacing(4)};
`;

function DropdownButton({
  label,
  isActive,
  children,
  isUnfolded = false,
  onIsUnfoldedChange,
  HotkeyScope,
}: OwnProps) {
  useScopedHotkeys(
    [Key.Enter, Key.Escape],
    () => {
      onIsUnfoldedChange?.(false);
    },
    HotkeyScope,
    [onIsUnfoldedChange],
  );

  const onButtonClick = () => {
    onIsUnfoldedChange?.(!isUnfolded);
  };

  const onOutsideClick = () => {
    onIsUnfoldedChange?.(false);
  };

  return (
    <StyledDropdownButtonContainer>
      <StyledDropdownButton
        isUnfolded={isUnfolded}
        onClick={onButtonClick}
        isActive={isActive}
        aria-selected={isActive}
      >
        {label}
      </StyledDropdownButton>
      {isUnfolded && (
        <DropdownMenuContainer onClose={onOutsideClick}>
          {children}
        </DropdownMenuContainer>
      )}
    </StyledDropdownButtonContainer>
  );
}

const StyleAngleDownContainer = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  display: flex;
  height: 100%;
  justify-content: center;
  margin-left: auto;
`;

function DropdownTopOptionAngleDown() {
  return (
    <StyleAngleDownContainer>
      <IconChevronDown size={16} />
    </StyleAngleDownContainer>
  );
}
DropdownButton.StyledDropdownTopOption = StyledDropdownTopOption;
DropdownButton.StyledDropdownTopOptionAngleDown = DropdownTopOptionAngleDown;
DropdownButton.StyledIcon = StyledIcon;

export default DropdownButton;
