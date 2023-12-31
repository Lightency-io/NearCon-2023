import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ExtendedBaseEntity } from '@energyweb/origin-backend-utils';
import { IsOptional } from 'class-validator';

@Entity({ name: 'irec_beneficiary' })
export class Beneficiary extends ExtendedBaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    irecBeneficiaryId: number;

    @Column()
    @IsOptional()
    organizationId?: number;

    @Column({ nullable: true, type: 'integer' })
    @IsOptional()
    ownerId?: number | null;

    @Column()
    name: string;

    @Column()
    countryCode: string;

    @Column()
    active: boolean;

    @Column()
    location: string;
}
