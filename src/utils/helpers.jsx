export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return '—';
  const date = new Date(dateTimeString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date);
};

export const getStatusBadge = (status) => {
  switch (status) {
    case 'Chưa Tối Ưu':
      return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">{status}</span>;
    case 'Đang Tối Ưu':
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">{status}</span>;
    case 'Đã Tối Ưu':
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{status}</span>;
    default:
      return null;
  }
};

export const renderCustomLegend = (props) => {
  const { payload } = props;

  return (
    <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-4">
      {payload.map((entry, index) => {
        const { color, value, payload: itemPayload } = entry;
        const isDashed = itemPayload.strokeDasharray;

        return (
          <div key={`item-${index}`} className="flex items-center text-sm text-gray-700 cursor-pointer">
            {entry.type === 'line' ? (
              <svg width="24" height="12" className="mr-2">
                <line
                  x1="0" y1="6" x2="24" y2="6"
                  stroke={color}
                  strokeWidth={itemPayload.strokeWidth || 2}
                  strokeDasharray={isDashed ? itemPayload.strokeDasharray : "0"}
                />
              </svg>
            ) : (
              <svg width="14" height="14" className="mr-2">
                <rect width="14" height="14" fill={color} opacity={itemPayload.fillOpacity || 1} />
              </svg>
            )}
            <span>{value}</span>
          </div>
        );
      })}
    </div>
  );
};
