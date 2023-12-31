import { ExtendedBaseEntity } from '@energyweb/origin-backend-utils';
import BN from 'bn.js';
import { Transform, Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BNTransformer } from '../../utils/valueTransformers';
import { Bundle } from './bundle.entity';
import { BundleTradeItemDTO } from './bundle-trade-item.dto';

import { DB_TABLE_PREFIX } from '../../utils/tablePrefix';

@Entity({ name: `${DB_TABLE_PREFIX}_bundle_trade` })
export class BundleTrade extends ExtendedBaseEntity {
    constructor(trade: Partial<BundleTrade>) {
        super();
        Object.assign(this, trade);
    }

    @ApiProperty({
        type: String,
        description: 'UUID string identifier',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ type: String })
    @Column()
    buyerId: string;

    @ApiProperty({ type: String, example: '500' })
    @Column('varchar', { transformer: BNTransformer })
    @Transform((v: BN) => v.toString(10), { toPlainOnly: true })
    volume: BN;

    @ApiProperty({ type: () => Bundle })
    @ManyToOne(() => Bundle, { eager: true })
    bundle: Bundle;

    @ApiProperty({ type: [BundleTradeItemDTO] })
    @Expose()
    get items(): BundleTradeItemDTO[] {
        return this.bundle.items.map(
            (item) =>
                new BundleTradeItemDTO(
                    item.asset,
                    item.startVolume.mul(this.volume).div(this.bundle.volume)
                )
        );
    }
}
