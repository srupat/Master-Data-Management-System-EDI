import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataProvision from './global/dataProvision/DataProvision';
import AnalyticsService from './global/analytics/AnalyticsService';
import Sidebar from './global/sidebar'
import Header from './global/Header'
import ExpressionEval from './global/expressionEval/ExpressionEval';
import PayrollCheck from './global/payrollCheck/PayrollCheck';
import Operations from './global/Operations/Operations';
import CustomAnalytics from './global/analytics/CustomAnalytics';

const MainPage = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Header />
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/data-provision" element={<DataProvision />} />
            <Route path="/analytics" element={<CustomAnalytics />} />
            <Route path="/expression-eval" element={<ExpressionEval />} />
            <Route path="/payroll-check" element={<PayrollCheck />} />
            <Route path="/operations" element={<Operations />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MainPage;