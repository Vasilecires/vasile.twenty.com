import { faUser, faList } from '@fortawesome/pro-regular-svg-icons';
import WithTopBarContainer from '../../layout/containers/WithTopBarContainer';
import Table from '../../components/table/Table';
import styled from '@emotion/styled';
import { peopleColumns } from './people-table';
import { gql, useQuery } from '@apollo/client';
import { GraphqlPerson, mapPerson } from '../../interfaces/person.interface';
import { useState } from 'react';
import { SortType } from '../../components/table/table-header/SortAndFilterBar';

const StyledPeopleContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const GET_PEOPLE = gql`
  query GetPeople($orderBy: [person_order_by!]) {
    person(order_by: $orderBy) {
      id
      phone
      email
      city
      firstname
      lastname
      created_at
      company {
        company_name
        company_domain
      }
    }
  }
`;

// @TODO get those types from generated-code person-order-by
type OrderBy = Record<string, 'asc' | 'desc'>;

const defaultOrderBy = [
  {
    created_at: 'desc',
  },
];

const reduceSortsToOrderBy = (sorts: Array<SortType>): OrderBy[] => {
  const mappedSorts = sorts.reduce((acc, sort) => {
    acc[sort.id] = sort.order;
    return acc;
  }, {} as OrderBy);
  return [mappedSorts];
};

function People() {
  const [sorts, setSorts] = useState([] as Array<SortType>);
  const orderBy = sorts.length ? reduceSortsToOrderBy(sorts) : defaultOrderBy;
  const { data } = useQuery<{ person: GraphqlPerson[] }>(GET_PEOPLE, {
    variables: { orderBy: orderBy },
  });

  return (
    <WithTopBarContainer title="People" icon={faUser}>
      <StyledPeopleContainer>
        {data && (
          <Table
            data={data.person.map(mapPerson)}
            columns={peopleColumns}
            viewName="All People"
            viewIcon={faList}
            onSortsUpdate={setSorts}
          />
        )}
      </StyledPeopleContainer>
    </WithTopBarContainer>
  );
}

export default People;
