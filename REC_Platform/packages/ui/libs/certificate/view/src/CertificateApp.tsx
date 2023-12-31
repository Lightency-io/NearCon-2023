import { PageNotFound } from '@energyweb/origin-ui-core';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CertificateModalsCenter } from './containers';
import {
  CertificateAppEnvProvider,
  CertificateEnvVariables,
  CertificateModalsProvider,
  TransactionPendingProvider,
} from './context';
import {
  ApprovedPage,
  BlockchainInboxPage,
  CertificatesImportPage,
  ClaimsReportPage,
  DetailViewPage,
  ExchangeInboxPage,
  PendingPage,
  RequestsPage,
} from './pages';

export interface CertificateAppProps {
  routesConfig: {
    showExchangeInbox: boolean;
    showBlockchainInbox: boolean;
    showClaimsReport: boolean;
    showRequests: boolean;
    showPending: boolean;
    showApproved: boolean;
    showImport: boolean;
  };
  envVariables: CertificateEnvVariables;
}

export const CertificateApp: FC<CertificateAppProps> = ({
  routesConfig,
  envVariables,
}) => {
  const {
    showExchangeInbox,
    showBlockchainInbox,
    showClaimsReport,
    showRequests,
    showPending,
    showApproved,
    showImport,
  } = routesConfig;

  return (
    <CertificateAppEnvProvider variables={envVariables}>
      <CertificateModalsProvider>
        <Routes>
          {showExchangeInbox && (
            <Route
              path="exchange-inbox"
              element={
                <TransactionPendingProvider>
                  <ExchangeInboxPage />
                </TransactionPendingProvider>
              }
            />
          )}
          {showBlockchainInbox && (
            <Route
              path="blockchain-inbox"
              element={
                <TransactionPendingProvider>
                  <BlockchainInboxPage />
                </TransactionPendingProvider>
              }
            />
          )}
          {showClaimsReport && (
            <Route path="claims-report" element={<ClaimsReportPage />} />
          )}
          {showRequests && <Route path="requests" element={<RequestsPage />} />}
          {showPending && <Route path="pending" element={<PendingPage />} />}
          {showApproved && <Route path="approved" element={<ApprovedPage />} />}
          {showImport && (
            <Route path="import" element={<CertificatesImportPage />} />
          )}
          <Route path="detail-view/:id" element={<DetailViewPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <CertificateModalsCenter />
      </CertificateModalsProvider>
    </CertificateAppEnvProvider>
  );
};
