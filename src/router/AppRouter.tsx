import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import CardPage from '../modules/card/CardPage.tsx';
import CatalogPage from '../modules/catalog/CatalogPage.tsx';
import ErrorPage from '../modules/error/ErrorPage.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/catalog/:page?&:pageSize?" element={<CatalogPage />} />
      <Route path="/card/edit/:cardId" element={<CardPage />} />
      <Route path="/card/view/:cardId" element={<CardPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/catalog" replace />} />
    </Routes>
  );
};

export default AppRouter;
