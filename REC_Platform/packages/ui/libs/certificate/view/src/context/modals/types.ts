import { IrecAccountItemDto } from '@energyweb/exchange-irec-react-query-client';
import { CertificateModalsActionsEnum } from './reducer';

export interface ICertificateModalsStore {
  confirmImport: {
    open: boolean;
    certificate: IrecAccountItemDto;
  };
}

export interface IConfirmImportAction {
  type: CertificateModalsActionsEnum.SHOW_CONFIRM_IMPORT;
  payload: {
    open: boolean;
    certificate: IrecAccountItemDto;
  };
}

export type TCertificateModalsAction = IConfirmImportAction;
