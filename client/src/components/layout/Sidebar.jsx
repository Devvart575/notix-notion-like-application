import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  FileText, 
  Trash2, 
  LogOut,
  User,
  Menu
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { COLORS } from '../../utils/constant.js';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ pages, onSelectPage, onCreatePage, onDeletePage, selectedPage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) {
    navigate('/');
  }
}, [user, navigate]); //  Stable deps

 const handleLogout = () => {
  logout();             // Clears token and user
  navigate('/', { replace: true });  //  Redirect to /
};
  const renderPageTree = (pages, parentId = null, level = 0) => {
    return pages
      .filter(page => page.parentPage?._id === parentId || (!page.parentPage && !parentId))
      .map(page => (
        <div key={page._id} style={{ marginLeft: `${level * 20}px` }}>
          <div
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors group ${
              selectedPage?._id === page._id ? 'bg-gray-100' : ''
            }`}
            onClick={() => onSelectPage(page)}
          >
            <div className="flex items-center space-x-2 flex-1">
              <FileText className="w-4 h-4" style={{ color: COLORS.primary }} />
              <span className="text-sm truncate" style={{ color: COLORS.primary }}>
                {page.title}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeletePage(page._id);
              }}
              className="p-1 rounded hover:bg-red-100 opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-3 h-3 text-red-500" />
            </button>
          </div>
          {renderPageTree(pages, page._id, level + 1)}
        </div>
      ));
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-24' : 'w-64'
      }`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.secondary }}>
              <User className="w-4 h-4" style={{ color: COLORS.primary }} />
            </div>
            {!isCollapsed && (
              <div>
                <div className="text-sm font-medium" style={{ color: COLORS.primary }}>
                  {user?.username}
                </div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Menu className="w-4 h-4" style={{ color: COLORS.primary }} />
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4">
          <button
            onClick={onCreatePage}
            className="flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-md text-black transition-opacity hover:opacity-90 mb-4"
            style={{ backgroundColor: COLORS.secondary }}
          >
            <Plus className="w-4 h-4" />
            <span>New Page</span>
          </button>

          <div className="space-y-1 max-h-96 overflow-y-auto">
            {renderPageTree(pages)}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-2 right-4">
        <button
          onClick={handleLogout}
          className={`flex items-center space-x-2 w-24 px-3 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4" style={{ color: COLORS.primary }} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};