import CardPage from '../modules/card/CardPage.tsx';
import CatalogPage from '../modules/catalog/CatalogPage.tsx';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/card/edit/:id" element={<CardPage />} />
      <Route path="/card/view/:id" element={<CardPage />} />
      <Route path="*" element={<Navigate to="/catalog" replace />} />
    </Routes>
  );
};

export default AppRouter;
