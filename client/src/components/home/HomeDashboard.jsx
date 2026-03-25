import React, { useState, useEffect } from 'react';
import { Clock, FileText, Sun, Moon, Plus } from 'lucide-react';

export const HomeDashboard = ({ user, recentPageIds, pages, onSelectPage }) => {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      
      let greet = 'Good evening';
      if (hour >= 5 && hour < 12) greet = 'Good morning';
      else if (hour >= 12 && hour < 18) greet = 'Good afternoon';
      setGreeting(greet);

      setCurrentDate(now.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); 
    return () => clearInterval(interval);
  }, []);

  const recentPages = recentPageIds
    .map(id => pages.find(p => p._id === id))
    .filter(Boolean);

  return (
    <div className="h-full bg-gray-50 p-10 overflow-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-blue-100/50 shadow-sm border border-blue-100">
            {greeting.includes('morning') || greeting.includes('afternoon') ? (
              <Sun className="w-10 h-10 text-yellow-500" />
            ) : (
              <Moon className="w-10 h-10 text-indigo-500" />
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              {greeting}, {user?.username}
            </h1>
            <p className="text-gray-500 mt-2 font-medium text-lg">{currentDate}</p>
          </div>
        </div>

        {/* Recent Pages Section */}
        <div>
          <div className="flex items-center mb-6 text-gray-700">
            <Clock className="w-6 h-6 mr-3 text-blue-500" />
            <h2 className="text-2xl font-bold tracking-tight">Recently Opened</h2>
          </div>
          
          {recentPages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPages.map((page) => (
                <div 
                  key={page._id}
                  onClick={() => onSelectPage(page)}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col group h-44"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-3 bg-blue-50/80 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1 overflow-hidden pt-1">
                      <h3 className="font-semibold text-lg text-gray-800 truncate" title={page.title}>
                        {page.title || 'Untitled'}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 truncate">
                        {page.parentPage ? 'Nested Document' : 'Top Level Document'}
                      </p>
                    </div>
                  </div>
                  
                  {page.tasks && page.tasks.length > 0 ? (
                     <div className="mt-auto pt-4 border-t border-gray-50 group-hover:border-blue-50 transition-colors">
                        <div className="flex justify-between text-xs text-gray-500 font-medium mb-2">
                          <span>{page.tasks.filter(t => t.completed).length}/{page.tasks.length} tasks</span>
                          <span>{Math.round((page.tasks.filter(t => t.completed).length / page.tasks.length) * 100)}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              page.tasks.every(t => t.completed) ? 'bg-green-500' : 'bg-blue-400 group-hover:bg-blue-500'
                            }`}
                            style={{ width: `${(page.tasks.filter(t => t.completed).length / page.tasks.length) * 100}%` }}
                          />
                        </div>
                     </div>
                  ) : (
                     <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-sm text-gray-400 group-hover:text-blue-500 transition-colors">
                        <Plus className="w-4 h-4 mr-1 opacity-60" /> Add your first task
                     </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
             <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                   <FileText className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No recent documents</h3>
                <p className="text-gray-500 max-w-sm">
                   Get started by creating a new page or selecting one from the sidebar navigation.
                </p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};
