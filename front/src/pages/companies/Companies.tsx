import { useCallback, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';

import {
  Company,
  mapToCompany,
} from '@/companies/interfaces/company.interface';
import {
  CompaniesSelectedSortType,
  defaultOrderBy,
  insertCompany,
  useCompaniesQuery,
} from '@/companies/services';
import {
  reduceFiltersToWhere,
  reduceSortsToOrderBy,
} from '@/filters-and-sorts/helpers';
import { SelectedFilterType } from '@/filters-and-sorts/interfaces/filters/interface';
import { EntityTableActionBar } from '@/ui/components/table/action-bar/EntityTableActionBar';
import { EntityTable } from '@/ui/components/table/EntityTable';
import { IconBuildingSkyscraper } from '@/ui/icons/index';
import { IconList } from '@/ui/icons/index';
import { WithTopBarContainer } from '@/ui/layout/containers/WithTopBarContainer';
import { BoolExpType } from '@/utils/interfaces/generic.interface';
import { CompanyOrderByWithRelationInput as Companies_Order_By } from '~/generated/graphql';

import { TableActionBarButtonCreateCommentThreadCompany } from './table/TableActionBarButtonCreateCommentThreadCompany';
import { TableActionBarButtonDeleteCompanies } from './table/TableActionBarButtonDeleteCompanies';
import { useCompaniesColumns } from './companies-columns';
import { availableFilters } from './companies-filters';
import { availableSorts } from './companies-sorts';

const StyledCompaniesContainer = styled.div`
  display: flex;
  width: 100%;
`;

export function Companies() {
  const [orderBy, setOrderBy] = useState<Companies_Order_By[]>(defaultOrderBy);
  const [where, setWhere] = useState<BoolExpType<Company>>({});

  const updateSorts = useCallback((sorts: Array<CompaniesSelectedSortType>) => {
    setOrderBy(sorts.length ? reduceSortsToOrderBy(sorts) : defaultOrderBy);
  }, []);

  const updateFilters = useCallback(
    (filters: Array<SelectedFilterType<Company>>) => {
      setWhere(reduceFiltersToWhere(filters));
    },
    [],
  );

  const { data } = useCompaniesQuery(orderBy, where);

  const companies = data?.companies.map(mapToCompany) ?? [];

  async function handleAddButtonClick() {
    const newCompany: Company = {
      id: uuidv4(),
      name: '',
      domainName: '',
      employees: null,
      address: '',
      pipes: [],
      createdAt: new Date(),
      accountOwner: null,
      __typename: 'Company',
    };

    await insertCompany(newCompany);
  }

  const companiesColumns = useCompaniesColumns();
  const theme = useTheme();
  return (
    <WithTopBarContainer
      title="Companies"
      icon={<IconBuildingSkyscraper size={theme.iconSizeMedium} />}
      onAddButtonClick={handleAddButtonClick}
    >
      <>
        <StyledCompaniesContainer>
          <EntityTable
            data={companies}
            columns={companiesColumns}
            viewName="All Companies"
            viewIcon={<IconList size={16} />}
            availableSorts={availableSorts}
            availableFilters={availableFilters}
            onSortsUpdate={updateSorts}
            onFiltersUpdate={updateFilters}
          />
        </StyledCompaniesContainer>
        <EntityTableActionBar>
          <TableActionBarButtonCreateCommentThreadCompany />
          <TableActionBarButtonDeleteCompanies />
        </EntityTableActionBar>
      </>
    </WithTopBarContainer>
  );
}
