import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import CardPage from '../modules/card/CardPage.tsx';
import CatalogPage from '../modules/catalog/CatalogPage.tsx';
import ErrorPage from '../modules/error/ErrorPage.tsx';
import { ROUTE } from './consts.ts';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE.CATALOG} element={<CatalogPage />} />
      <Route path={`${ROUTE.CARD}/:cardMode/:cardId`} element={<CardPage />} />
      <Route path={`${ROUTE.ERROR}`} element={<ErrorPage />} />
      <Route path="*" element={<Navigate to={ROUTE.CATALOG} replace />} />
    </Routes>
  );
};

export default AppRouter;
