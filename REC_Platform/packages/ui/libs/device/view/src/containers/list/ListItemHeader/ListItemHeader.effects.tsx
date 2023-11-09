import { CodeNameDTO } from '@energyweb/origin-device-registry-irec-local-api-react-query-client';
import {
  getEnergyTypeImage,
  getMainFuelType,
} from '@energyweb/origin-ui-device-logic';
import { EnergyTypeEnum } from '@energyweb/origin-ui-utils';

export const useListItemHeaderEffects = (
  allFuelTypes: CodeNameDTO[],
  fuelType: string
) => {
  const { mainType } = getMainFuelType(fuelType, allFuelTypes);
  const icon = getEnergyTypeImage(mainType as EnergyTypeEnum, true);
  return icon;
};
