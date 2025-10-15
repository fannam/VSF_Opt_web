import React from 'react';
import { X } from 'lucide-react';

const CreateJobModal = ({ 
  showCreateJobModal, 
  setShowCreateJobModal, 
  newJobPlanId, 
  setNewJobPlanId, 
  newJobConfigId, 
  setNewJobConfigId, 
  handleCreateJob,
  productionPlans,
  configurations
}) => {
  if (!showCreateJobModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Tạo Job Tối ưu hóa Mới</h3>
          <button onClick={() => setShowCreateJobModal(false)} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn Kế hoạch Sản xuất</label>
            <select
              value={newJobPlanId}
              onChange={(e) => setNewJobPlanId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">-- Chọn KHSX --</option>
              {productionPlans.map(plan => (
                <option key={plan.id} value={plan.id}>{plan.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn Cấu hình Ràng buộc</label>
            <select
              value={newJobConfigId}
              onChange={(e) => setNewJobConfigId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">-- Chọn Cấu hình --</option>
              {configurations.map(config => (
                <option key={config.id} value={config.id}>{config.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => setShowCreateJobModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Hủy bỏ</button>
          <button onClick={handleCreateJob} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Tạo Job</button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobModal;
