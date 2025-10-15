import React from 'react';
import { FileText, Gauge, TrendingUp, Settings } from 'lucide-react';

const Dashboard = ({ optimizationPlans }) => {
  const totalPlans = optimizationPlans.length;
  const optimizedPlans = optimizationPlans.filter(p => p.status === 'Đã Tối Ưu').length;
  const runningPlans = optimizationPlans.filter(p => p.status === 'Đang Tối Ưu').length;
  const notOptimizedPlans = optimizationPlans.filter(p => p.status === 'Chưa Tối Ưu').length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Tổng Quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Tất cả kế hoạch</p>
              <p className="text-4xl font-bold mt-2">{totalPlans}</p>
            </div>
            <FileText className="w-12 h-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Kế hoạch đã tối ưu</p>
              <p className="text-4xl font-bold mt-2">{optimizedPlans}</p>
            </div>
            <Gauge className="w-12 h-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Kế hoạch đang chạy</p>
              <p className="text-4xl font-bold mt-2">{runningPlans}</p>
            </div>
            <TrendingUp className="w-12 h-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Kế hoạch chưa tối ưu</p>
              <p className="text-4xl font-bold mt-2">{notOptimizedPlans}</p>
            </div>
            <Settings className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="w-full">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Trạng thái xưởng</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium text-gray-700">Xưởng GA</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Hoạt động</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium text-gray-700">Xưởng Body</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Hoạt động</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium text-gray-700">Xưởng Paint</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Hoạt động</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
