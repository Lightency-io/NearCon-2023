import {
  InvitationDTO,
  UserDTO,
} from '@energyweb/origin-backend-react-query-client';
import { UserModalsActionsEnum } from './reducer';

export interface IUserModalsStore {
  userRegistered: boolean;
  loginRegisterOrg: boolean;
  pendingInvitation: {
    open: boolean;
    invitation: InvitationDTO;
    user: UserDTO;
  };
  createExchangeAddress: boolean;
  roleChanged: {
    open: boolean;
    user: UserDTO;
  };
}

interface IShowUserRegisteredAction {
  type: UserModalsActionsEnum.SHOW_USER_REGISTERED;
  payload: boolean;
}

interface IShowLoginRegisterOrgAction {
  type: UserModalsActionsEnum.SHOW_LOGIN_REGISTER_ORG;
  payload: boolean;
}

interface IShowPendingInvitationActions {
  type: UserModalsActionsEnum.SHOW_PENDING_INVITATION;
  payload: {
    open: boolean;
    invitation: InvitationDTO;
    user: UserDTO;
  };
}

interface IShowCreateExchangeAddressAction {
  type: UserModalsActionsEnum.SHOW_CREATE_EXCHANGE_ADDRESS;
  payload: boolean;
}

interface IShowRoleChangeAction {
  type: UserModalsActionsEnum.SHOW_ROLE_CHANGED;
  payload: {
    open: boolean;
    user: UserDTO;
  };
}

export type TUserModalsAction =
  | IShowUserRegisteredAction
  | IShowLoginRegisterOrgAction
  | IShowPendingInvitationActions
  | IShowCreateExchangeAddressAction
  | IShowRoleChangeAction;
