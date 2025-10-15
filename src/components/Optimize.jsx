import React from 'react';
import { Plus, PlayCircle } from 'lucide-react';
import { formatDateTime, getStatusBadge } from '../utils/helpers';

const Optimize = ({ 
  optimizationPlans,
  setShowCreateJobModal,
  filters,
  handleFilterChange,
  handleJobAction,
  handleStartAllJobs
}) => {
  const filteredJobs = optimizationPlans.filter(job => {
    return (
      job.planName.toLowerCase().includes(filters.planName.toLowerCase()) &&
      job.configName.toLowerCase().includes(filters.configName.toLowerCase()) &&
      job.createdBy.toLowerCase().includes(filters.createdBy.toLowerCase()) &&
      (filters.status === '' || job.status === filters.status)
    );
  });
  
  const notOptimizedCount = optimizationPlans.filter(p => p.status === 'Chưa Tối Ưu').length;
  const runningCount = optimizationPlans.filter(p => p.status === 'Đang Tối Ưu').length;
  const optimizedCount = optimizationPlans.filter(p => p.status === 'Đã Tối Ưu').length;
  const estimatedTime = (notOptimizedCount * 1.5).toFixed(1);

  const getActionButton = (plan) => {
    switch (plan.status) {
      case 'Chưa Tối Ưu':
        return <button onClick={() => handleJobAction(plan.id, 'start')} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Tính Toán</button>;
      case 'Đang Tối Ưu':
        return <button onClick={() => handleJobAction(plan.id, 'stop')} className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition">Dừng Tính Toán</button>;
      case 'Đã Tối Ưu':
        return <button onClick={() => handleJobAction(plan.id, 'view_results')} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">Xem Kết Quả</button>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản Lý Kế Hoạch Tối Ưu</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <div className="text-center mb-6">
          <PlayCircle className="w-24 h-24 mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sẵn sàng tối ưu hóa</h2>
          <p className="text-gray-600">Bắt đầu quá trình tối ưu hóa cho tất cả các job 'Chưa Tối Ưu'.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
            <p className="text-sm font-semibold text-red-700">Chưa tối ưu</p>
            <p className="text-3xl font-bold text-red-800 my-1">{notOptimizedCount}</p>
            <p className="text-xs text-gray-500">Ước tính: ~{estimatedTime} phút</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
            <p className="text-sm font-semibold text-yellow-700">Đang chạy</p>
            <p className="text-3xl font-bold text-yellow-800 my-1">{runningCount}</p>
            <p className="text-xs text-gray-500 invisible">Placeholder</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
            <p className="text-sm font-semibold text-green-700">Đã tối ưu</p>
            <p className="text-3xl font-bold text-green-800 my-1">{optimizedCount}</p>
            <p className="text-xs text-gray-500 invisible">Placeholder</p>
          </div>
        </div>
        <button onClick={handleStartAllJobs} className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold flex items-center justify-center gap-2">
          <PlayCircle size={24} />
          Bắt đầu tối ưu hóa tất cả
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Danh sách Job Tối ưu</h2>
            <button onClick={() => setShowCreateJobModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 text-sm">
              <Plus size={16} />
              Tạo Job mới
            </button>
          </div>
          
          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 border rounded-lg bg-gray-50">
            <input
              type="text"
              name="planName"
              value={filters.planName}
              onChange={handleFilterChange}
              placeholder="Lọc theo tên kế hoạch..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="configName"
              value={filters.configName}
              onChange={handleFilterChange}
              placeholder="Lọc theo tên cấu hình..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="createdBy"
              value={filters.createdBy}
              onChange={handleFilterChange}
              placeholder="Lọc theo người tạo..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Chưa Tối Ưu">Chưa Tối Ưu</option>
              <option value="Đang Tối Ưu">Đang Tối Ưu</option>
              <option value="Đã Tối Ưu">Đã Tối Ưu</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">ID Job</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Tên kế hoạch</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Tên cấu hình</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Thời gian tạo</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Người tạo</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Hoàn thành</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Trạng thái</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map(plan => (
                  <tr key={plan.id} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-3 text-sm">
                      <span className="font-mono bg-gray-100 text-gray-900 px-2 py-1 rounded-md">{plan.jobId}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{plan.planName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{plan.configName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatDateTime(plan.createdAt)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{plan.createdBy}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatDateTime(plan.completedAt)}</td>
                    <td className="px-4 py-3">{getStatusBadge(plan.status)}</td>
                    <td className="px-4 py-3">{getActionButton(plan)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optimize;
