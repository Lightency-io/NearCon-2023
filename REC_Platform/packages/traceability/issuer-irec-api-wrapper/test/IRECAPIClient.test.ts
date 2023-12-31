/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

import { AccountType, DeviceType, FuelType, IRECAPIClient, ReservationItem } from '../src';

import { credentials, getClient, validateCodeName, validateOrganization } from './helpers';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

describe('IREC API', () => {
    let participantClient: IRECAPIClient;
    let issuerClient: IRECAPIClient;
    let registrantClient: IRECAPIClient;

    const tradeAccount = 'ACCOUNTTRADE001';
    const issueAccount = 'ACCOUNTISSUE001';
    const redemptionAccount = 'ACCOUNTREDEMPTION001';

    before(async () => {
        participantClient = await getClient(credentials.participant);
        issuerClient = await getClient(credentials.issuer);
        registrantClient = await getClient(credentials.registrant);
    });

    describe('Account', () => {
        it(`should throw correct HTTP exception`, async () => {
            const e = await registrantClient.account.getAll().catch((e) => e);
            expect(e instanceof HttpException).to.equal(true);
            expect(e.getStatus()).to.equal(403);
        });

        it(`should fetch all accounts`, async () => {
            const [firstAccount] = await participantClient.account.getAll();

            expect(firstAccount.details).to.exist;
            expect(firstAccount.type).to.exist;
        });

        it(`should create an account`, async () => {
            const code = `test${Date.now()}`.toUpperCase();
            await participantClient.account.create({
                code: `test${Date.now()}`,
                type: AccountType.Trade,
                name: 'test account',
                private: false,
                restricted: false,
                active: true,
                countryCode: 'GB',
                notes: ''
            });
            const accounts = await participantClient.account.getAll();
            const account = accounts.find((a) => a.code === code);

            expect(account).to.exist;
        });

        it('should fetch account by code', async () => {
            const [firstAccount] = await participantClient.account.getAll();
            const account = await participantClient.account.get(firstAccount.code);

            expect(account.code).to.equal(firstAccount.code);
            expect(account.details).to.exist;
            expect(account.details.name).to.exist;
            expect(account.details.active).to.be.equal(true);
            expect(account.type).to.exist;
        });

        it('should fetch balance by code', async () => {
            const [firstAccount] = await participantClient.account.getAll();
            const [accountBalance] = await participantClient.account.getBalance(firstAccount.code);

            expect(accountBalance.balance).to.be.a('number');
            expect(accountBalance.code).to.equal(firstAccount.code);
            expect(accountBalance.product.code).to.be.a('string');
            expect(accountBalance.product.name).to.be.a('string');
            expect(accountBalance.product.unit).to.be.a('string');
        });

        it('should fetch items by code', async () => {
            const accountItems = await participantClient.account.getItems(tradeAccount);
            accountItems.forEach((accountItem) => {
                expect(accountItem).to.exist;
                expect(accountItem.co2Produced).to.be.a('number');
                expect(accountItem.product).to.be.a('string');
                expect(accountItem.country).to.be.a('string');
                expect(accountItem.device.code).to.be.a('string');
                expect(accountItem.device.name).to.be.a('string');
                expect(accountItem.deviceSupported).to.be.a('boolean');
                expect(accountItem.tagged).to.be.a('boolean');
                expect(accountItem.startDate).to.be.a('string');
                expect(accountItem.endDate).to.be.a('string');
                expect(accountItem.fuelType.code).to.be.a('string');
                expect(accountItem.fuelType.description).to.be.a('string');
                expect(accountItem.deviceType.code).to.be.a('string');
                expect(accountItem.deviceType.description).to.be.a('string');
                expect(accountItem.asset).to.be.a('string');
            });
        });
    });

    it('should be able to redeem the certificate', async () => {
        const accountItems = await participantClient.account.getItems(tradeAccount);

        const reservationItem = new ReservationItem();
        reservationItem.code = accountItems[0].code;
        reservationItem.amount = 1;

        await participantClient.redeem({
            sender: tradeAccount,
            recipient: redemptionAccount,
            approver: issueAccount,
            items: [reservationItem],
            notes: 'notes',
            beneficiary: 1,
            start: new Date('2020-01-01'),
            end: new Date('2020-02-01'),
            purpose: 'Purpose',
            volume: 1
        });
    });

    describe('Organization', () => {
        it('should return own organization info', async () => {
            const org = await registrantClient.organisation.get();
            validateOrganization(org);
        });

        it('should return registrant organizations', async () => {
            const org: unknown[] = await issuerClient.organisation.getRegistrants();
            org.forEach(validateCodeName);
        });

        it('should return issuer organizations', async () => {
            const org: unknown[] = await registrantClient.organisation.getIssuers();
            org.forEach(validateCodeName);
        });
    });

    describe('Fuel', () => {
        it('should return all fuels', async () => {
            const fuels: FuelType[] = await registrantClient.fuel.getFuelTypes();

            expect(fuels).to.be.an('array');
            fuels.forEach((fuel) => {
                expect(fuel.code).to.be.a('string');
                expect(fuel.name).to.be.a('string');
            });
        });

        it('should return all fuel types', async () => {
            const types: DeviceType[] = await registrantClient.fuel.getDeviceTypes();

            expect(types).to.be.an('array');
            types.forEach((type) => {
                expect(type.code).to.be.a('string');
                expect(type.name).to.be.a('string');
            });
        });
    });
});
