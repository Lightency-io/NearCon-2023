import { OrganizationStatus } from '@energyweb/origin-backend-core';
import { Countries } from '@energyweb/utils-general';
import { useTranslation } from 'react-i18next';
import { FullOrganizationInfoDTO } from '@energyweb/origin-backend-react-query-client';
import {
  TableActionData,
  TableComponentProps,
  TableRowData,
} from '@energyweb/origin-ui-core';
import { useNavigate } from 'react-router';

export type TUseAllOrganizationsTableArgs = {
  allOrganizations: FullOrganizationInfoDTO[];
  actions: TableActionData<FullOrganizationInfoDTO['id']>[];
  isLoading: boolean;
};

export type TFormatAllOrgs = (
  props: Omit<TUseAllOrganizationsTableArgs, 'isLoading'>
) => TableRowData<FullOrganizationInfoDTO['id']>[];

export type TUseAllOrganizationsTableLogic = (
  props: TUseAllOrganizationsTableArgs
) => TableComponentProps<FullOrganizationInfoDTO['id']>;

const formatOrganizations: TFormatAllOrgs = ({ allOrganizations, actions }) => {
  return allOrganizations?.map((org) => ({
    id: org.id,
    name: org.name,
    country: Countries.find((country) => country.code === org.country)?.name,
    tradeRegistryNumber: org.tradeRegistryCompanyNumber,
    status: org.status,
    actions: org.status === OrganizationStatus.Submitted ? actions : undefined,
  }));
};

export const useAllOrganizationsTableLogic: TUseAllOrganizationsTableLogic = ({
  allOrganizations,
  actions,
  isLoading,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return {
    header: {
      name: t('organization.all.name'),
      country: t('organization.all.country'),
      tradeRegistryNumber: t('organization.all.tradeRegistryNumber'),
      status: t('organization.all.status'),
      actions: '',
    },
    onRowClick: (id) => navigate(`/admin/organization/${id}`),
    pageSize: 20,
    loading: isLoading,
    data: formatOrganizations({ allOrganizations, actions }) ?? [],
  };
};
