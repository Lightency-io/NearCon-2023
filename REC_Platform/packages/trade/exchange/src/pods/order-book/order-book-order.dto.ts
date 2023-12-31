/* eslint-disable @typescript-eslint/no-shadow */
import { IMatchableOrder } from '@energyweb/exchange-core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class OrderBookOrderDTO<TProduct> {
    @ApiProperty({
        type: String,
        description: 'UUID string identifier',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiProperty({ type: Number })
    @IsNumber()
    price: number;

    @ApiProperty({ type: String, example: '500' })
    @IsString()
    volume: string;

    product: TProduct;

    @ApiProperty({ type: String })
    @IsString()
    userId: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    assetId?: string;

    public static fromOrder<TProduct, TProductFilter>(
        order: IMatchableOrder<TProduct, TProductFilter>,
        userId?: string
    ): OrderBookOrderDTO<TProduct> {
        return {
            id: order.id,
            price: order.price,
            product: order.product,
            assetId: order.assetId,
            volume: order.volume.toString(10),
            userId: order.userId === userId ? order.userId : undefined
        };
    }
}
