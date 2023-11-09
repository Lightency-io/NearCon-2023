import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { GetAllCertificationRequestsQuery } from '@energyweb/issuer-api';
import { IREC_SERVICE, IrecService } from '@energyweb/origin-organization-irec-api';
import { DeviceRegistryService } from '@energyweb/origin-device-registry-api';
import { DeviceService } from '@energyweb/origin-device-registry-irec-local-api';
import { FullCertificationRequestDTO } from '@energyweb/issuer-irec-api';

import { GetIrecCertificatesToImportCommand } from '../command';
import { IrecAccountItemDto } from '../dto';

@CommandHandler(GetIrecCertificatesToImportCommand)
export class GetIrecCertificatesToImportHandler
    implements ICommandHandler<GetIrecCertificatesToImportCommand>
{
    constructor(
        private readonly queryBus: QueryBus,
        @Inject(IREC_SERVICE)
        private readonly irecService: IrecService,
        private readonly deviceRegistryService: DeviceRegistryService,
        private readonly irecDeviceService: DeviceService
    ) {}

    async execute({ user }: GetIrecCertificatesToImportCommand): Promise<IrecAccountItemDto[]> {
        const irecCertificates = await this.irecService.getCertificates(user.ownerId);
        const devices = await this.deviceRegistryService.find({ where: { owner: user.ownerId } });
        const irecDevices = await this.irecDeviceService.findAll({
            where: { ownerId: user.ownerId }
        });

        const certificationRequests = await this.queryBus.execute<
            GetAllCertificationRequestsQuery,
            FullCertificationRequestDTO[]
        >(new GetAllCertificationRequestsQuery({ deviceIds: devices.map((d) => d.id) }));

        return irecCertificates
            .filter((issue) => {
                return !certificationRequests.some((cr) => issue.asset === cr.irecAssetId);
            })
            .map((issue) => {
                return {
                    ...issue,
                    isDeviceImported: irecDevices.some((d) => d.code === issue.device.code)
                };
            });
    }
}
