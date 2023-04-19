import styled from '@emotion/styled';
import * as React from 'react';
import { Link } from 'react-router-dom';

type OwnProps = {
  href: string;
  children?: React.ReactNode;
};

const Container = styled.span`
  margin-left: 4px;
`;

function ClickableCell({ href, children }: OwnProps) {
  return (
    <Link to={href}>
      <Container>{children}</Container>
    </Link>
  );
}

export default ClickableCell;
