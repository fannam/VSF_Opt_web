import React from 'react';
import { Home, Upload, Settings, PlayCircle, BarChart3, User, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'input', icon: Upload, label: 'Quản lý Kế hoạch Sản xuất' },
    { id: 'config', icon: Settings, label: 'Quản lý Cấu hình Ràng buộc' },
    { id: 'optimize', icon: PlayCircle, label: 'Quản lý Kế hoạch Tối ưu' },
    { id: 'results', icon: BarChart3, label: 'Đánh giá Kết quả' },
    { id: 'account', icon: User, label: 'Tài khoản' },
  ];

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col shadow-xl`}>
      <div className="p-4 flex items-center justify-between border-b border-blue-700">
        {!collapsed && <h1 className="text-xl font-bold">Industrial OPT</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-blue-700 rounded-lg transition">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition ${currentPage === item.id ? 'bg-blue-700 border-r-4 border-white' : ''}`}
              title={collapsed ? item.label : ''} >
              <Icon size={20} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-blue-700">
        {!collapsed && (
          <div className="text-xs text-blue-200">
            <p>Version 1.2.0</p>
            <p>© 2025 VinFast</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
