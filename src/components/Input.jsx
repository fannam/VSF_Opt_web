import React from 'react';
import { Upload, Trash2, Search, ChevronsUpDown, FileText } from 'lucide-react';

const Input = ({ 
  productionPlans, 
  selectedPlan, 
  setSelectedPlan, 
  setShowUploadModal,
  handleDeletePlan,
  planFilters,
  setPlanFilters,
  planSortOrder,
  setPlanSortOrder
}) => {
  return (
    <div className="flex h-full bg-gray-100">
      <div className="w-[400px] border-r bg-white flex flex-col shadow-sm">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">Danh sách KHSX</h2>
          <button onClick={() => setShowUploadModal(true)} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm shadow-sm hover:shadow-md">
            <Upload size={16} /> Tải lên
          </button>
        </div>
        <div className="p-3 border-b bg-gray-50">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Lọc theo tên KHSX..."
              value={planFilters.name}
              onChange={(e) => setPlanFilters({...planFilters, name: e.target.value})}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Lọc theo người tạo..."
              value={planFilters.createdBy}
              onChange={(e) => setPlanFilters({...planFilters, createdBy: e.target.value})}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mt-2 text-right">
            <button onClick={() => setPlanSortOrder(planSortOrder === 'asc' ? 'desc' : 'asc')} className="text-xs text-blue-600 hover:underline font-medium flex items-center justify-end">
              Sắp xếp theo ngày tạo 
              <ChevronsUpDown size={14} className="ml-1" />
              ({planSortOrder === 'asc' ? 'Cũ nhất' : 'Mới nhất'})
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {productionPlans
            .filter(plan => 
              plan.name.toLowerCase().includes(planFilters.name.toLowerCase()) &&
              plan.createdBy.toLowerCase().includes(planFilters.createdBy.toLowerCase())
            )
            .sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return planSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            })
            .map(plan => (
              <div 
                key={plan.id} 
                onClick={() => setSelectedPlan(plan)}
                className={`p-4 cursor-pointer border-l-4 group transition-colors duration-200 ${selectedPlan?.id === plan.id ? 'bg-blue-50 border-blue-600' : 'border-transparent hover:bg-gray-100'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-semibold ${selectedPlan?.id === plan.id ? 'text-blue-700' : 'text-gray-800'}`}>{plan.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Tạo bởi: {plan.createdBy}</p>
                    <p className="text-xs text-gray-500">Ngày tạo: {plan.createdAt}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); handleDeletePlan(plan.id); }} className="text-gray-400 hover:text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        {selectedPlan ? (
          <>
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <h1 className="text-3xl font-bold text-gray-800">{selectedPlan.name}</h1>
              <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5">
                Lưu thay đổi
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1">
              <div className="overflow-auto h-full">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200/70 border-b-2 border-gray-300 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Ngày SX</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Item Code</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Model</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Màu</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">LHD/RHD</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Số lượng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedPlan.data.map((row) => (
                      <tr key={row.id} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-4 py-2"><input type="text" defaultValue={row.date} className="w-full p-1 bg-transparent rounded focus:bg-white focus:ring-1 focus:ring-blue-500" /></td>
                        <td className="px-4 py-2"><input type="text" defaultValue={row.itemCode} className="w-full p-1 bg-transparent rounded focus:bg-white focus:ring-1 focus:ring-blue-500" /></td>
                        <td className="px-4 py-2"><input type="text" defaultValue={row.model} className="w-full p-1 bg-transparent rounded focus:bg-white focus:ring-1 focus:ring-blue-500" /></td>
                        <td className="px-4 py-2"><input type="text" defaultValue={row.color} className="w-full p-1 bg-transparent rounded focus:bg-white focus:ring-1 focus:ring-blue-500" /></td>
                        <td className="px-4 py-2"><input type="text" defaultValue={row.type} className="w-full p-1 bg-transparent rounded focus:bg-white focus:ring-1 focus:ring-blue-500" /></td>
                        <td className="px-4 py-2"><input type="number" defaultValue={row.quantity} className="w-full p-1 bg-transparent rounded focus:bg-white focus:ring-1 focus:ring-blue-500" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <FileText size={48} className="mx-auto text-gray-300" />
              <p className="mt-4 text-gray-500">Chọn một kế hoạch để xem chi tiết hoặc tải lên một kế hoạch mới.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
