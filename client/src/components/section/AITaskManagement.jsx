import React, { useState } from 'react';
import { Sparkles, Info, Plus, Clock, AlertTriangle, CheckSquare, FileText, Target, CheckCircle } from 'lucide-react';

const AITaskManagement = () => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  
  const [tasks, setTasks] = useState({
    'Backlog': [
      { id: 1, title: 'Setup project', subtitle: 'Initialize repository and install dependencies', priority: 'high', category: 'development' },
      { id: 2, title: 'Design UI mockups', subtitle: 'Create mockups for all pages in Figma', priority: 'medium', category: 'design' },
      { id: 3, title: 'Research competitors', subtitle: 'Analyze competitor features and pricing', priority: 'low', category: 'research' },
      { id: 4, title: 'Write documentation', subtitle: 'Document features and APIs', priority: 'low', category: 'documentation' }
    ],
    'To Do': [
      { id: 5, title: 'Design landing page', subtitle: 'Create wireframes and mockups', priority: 'high', category: 'design' },
      { id: 6, title: 'Develop hero section', subtitle: 'Code the main hero component', priority: 'medium', category: 'development' }
    ],
    'In Progress': [
      { id: 7, title: 'Implement task views', subtitle: 'Build Kanban, List, and Calendar views', priority: 'high', category: 'development' }
    ],
    'Done': [
      { id: 8, title: 'Setup project repository', subtitle: 'Initialize Git repo and basic structure', priority: 'high', category: 'development' }
    ]
  });

  const handleDragStart = (e, task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, column) => {
    e.preventDefault();
    setDragOverColumn(column);
  };

  const handleDragLeave = (e) => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    
    if (draggedTask && draggedTask.sourceColumn !== targetColumn) {
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        
        // Remove task from source column
        newTasks[draggedTask.sourceColumn] = newTasks[draggedTask.sourceColumn].filter(
          task => task.id !== draggedTask.task.id
        );
        
        // Add task to target column
        newTasks[targetColumn] = [...newTasks[targetColumn], draggedTask.task];
        
        return newTasks;
      });
    }
    
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const prioritizeWithAI = () => {
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      
      // Move high priority items from backlog to To Do
      const highPriorityItems = newTasks['Backlog'].filter(task => task.priority === 'high');
      const remainingBacklog = newTasks['Backlog'].filter(task => task.priority !== 'high');
      
      newTasks['Backlog'] = remainingBacklog;
      newTasks['To Do'] = [...newTasks['To Do'], ...highPriorityItems];
      
      return newTasks;
    });
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'development': return <CheckSquare className="w-3 h-3" />;
      case 'design': return <Target className="w-3 h-3" />;
      case 'research': return <FileText className="w-3 h-3" />;
      case 'documentation': return <FileText className="w-3 h-3" />;
      default: return <CheckSquare className="w-3 h-3" />;
    }
  };

  return (
    <section className="bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">AI-Powered Task Management</h2>
          <p className="text-blue-800 text-xl max-w-4xl mx-auto mb-8">
            Drag and drop tasks between columns. When you're ready, let our AI assistant analyze dependencies and deadlines to prioritize them intelligently.
          </p>
          
          <button 
            onClick={prioritizeWithAI}
            className="bg-yellow-400 hover:bg-yellow-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-blue-900 inline-flex items-center gap-3 mb-8"
          >
            <Sparkles className="w-5 h-5" />
            Prioritize with AI
          </button>

          {/* How it works banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12 text-left max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2 text-lg">How AI Prioritization Works</h4>
                <p className="text-blue-800 leading-relaxed">
                  Our AI analyzes task dependencies, deadlines, and priority levels to automatically organize your workflow. 
                  Simply drag tasks between columns and click "Prioritize with AI" to let our intelligent system optimize your task sequence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Drag & Drop Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(tasks).map(([column, taskList]) => (
            <div 
              key={column} 
              className={`bg-gray-100 rounded-xl p-6 min-h-96 transition-all duration-300 ${
                dragOverColumn === column ? 'bg-yellow-100 border-2 border-yellow-400 border-dashed' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, column)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column)}
            >
              <div className="flex items-center gap-2 mb-6">
                <h3 className="font-bold text-blue-900 text-lg">{column}</h3>
                <span className="bg-blue-900 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {taskList.length}
                </span>
              </div>
              
              <div className="space-y-4">
                {taskList.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, column)}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-move transform hover:scale-105 border-l-4 border-yellow-400"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-blue-900 text-sm">{task.title}</h4>
                      {getCategoryIcon(task.category)}
                    </div>
                    <p className="text-blue-700 text-xs mb-3 leading-relaxed">{task.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority === 'high' && <AlertTriangle className="w-3 h-3" />}
                        {task.priority === 'medium' && <Clock className="w-3 h-3" />}
                        {task.priority === 'low' && <CheckCircle className="w-3 h-3" />}
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
                
                {taskList.length === 0 && (
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-gray-500 text-sm font-medium">Drop tasks here</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AITaskManagement;