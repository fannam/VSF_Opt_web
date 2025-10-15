import React from 'react';
import { X, File } from 'lucide-react';

const UploadModal = ({ showUploadModal, setShowUploadModal, newPlanName, setNewPlanName, handleUploadPlan }) => {
  if (!showUploadModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Tải lên Kế hoạch Sản xuất mới</h3>
          <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên Kế hoạch Sản xuất</label>
            <input 
              type="text" 
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              placeholder="Ví dụ: KHSX Tháng 7/2025"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File Excel</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <File className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Tải lên một file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">hoặc kéo và thả</p>
                </div>
                <p className="text-xs text-gray-500">XLSX, XLS up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Hủy bỏ</button>
          <button onClick={handleUploadPlan} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Tạo và Tải lên</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
