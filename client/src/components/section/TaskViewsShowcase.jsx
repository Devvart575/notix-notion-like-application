import React, { useState } from 'react';
import { Kanban, List } from 'lucide-react';

const TaskViewsShowcase = () => {
  const [activeView, setActiveView] = useState('Kanban');

  return (
    <section className="bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">View Your Work, Your Way</h2>
          <p className="text-blue-800 text-xl max-w-3xl mx-auto">
            Switch between Kanban, List, and Calendar views to manage your tasks in a way that makes sense for you.
          </p>
        </div>
        
        {/* View Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {[
            { name: 'Kanban', icon: Kanban },
            { name: 'List', icon: List }
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveView(name)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeView === name 
                  ? 'bg-blue-900 text-white shadow-lg transform scale-105' 
                  : 'bg-gray-200 text-blue-800 hover:bg-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}
        </div>

        {/* Task View Content */}
        {activeView === 'Kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries({
              'To Do': ['Design landing page', 'Develop hero section'],
              'In Progress': ['Implement task views'],
              'Done': ['Setup project repository']
            }).map(([column, taskList]) => (
              <div key={column} className="bg-gray-100 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-blue-900 mb-6 text-lg">{column}</h3>
                <div className="space-y-4">
                  {taskList.map((task, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-yellow-400">
                      <p className="text-blue-800 font-medium">{task}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'List' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-900 text-white p-4">
                <h3 className="font-bold text-lg">Task List View</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { task: 'Design landing page', status: 'To Do', priority: 'High' },
                  { task: 'Develop hero section', status: 'To Do', priority: 'Medium' },
                  { task: 'Implement task views', status: 'In Progress', priority: 'High' },
                  { task: 'Setup project repository', status: 'Done', priority: 'High' }
                ].map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          item.status === 'Done' ? 'bg-green-500' :
                          item.status === 'In Progress' ? 'bg-yellow-400' :
                          'bg-gray-400'
                        }`}></div>
                        <span className="font-medium text-blue-900">{item.task}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'Done' ? 'bg-green-100 text-green-800' :
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.priority === 'High' ? 'bg-red-100 text-red-800' :
                          item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskViewsShowcase;