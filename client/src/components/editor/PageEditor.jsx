import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Plus, Trash2, Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, AlignLeft } from 'lucide-react';
import { apiCall } from '../../services/api.js';
import { COLORS } from '../../utils/constant.js';

export const PageEditor = ({ page, onBack, onUpdateTitle }) => {
  const [title, setTitle] = useState(page?.title || '');
  const [content, setContent] = useState(page?.content || '');
  const [tasks, setTasks] = useState(page?.tasks || []);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  
  const titleInputRef = useRef(null);
  const editorRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setTitle(page?.title || '');
    const initialContent = page?.content || '';
    setContent(initialContent);
    if (editorRef.current && editorRef.current.innerHTML !== initialContent) {
      editorRef.current.innerHTML = initialContent;
    }
    setTasks(page?.tasks || []);
    setIsEditingTitle(false);
  }, [page?._id]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  const savePageData = async (updatedData) => {
    try {
      await apiCall(`/pages/${page._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      });
      // If title changed, update parent immediately
      if (updatedData.title && updatedData.title !== page.title) {
        onUpdateTitle(page._id, updatedData.title);
      }
    } catch (err) {
      console.error('Failed to save page:', err);
    }
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (title !== page.title) {
      savePageData({ title });
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  const handleContentInput = () => {
    if (!editorRef.current) return;
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    
    // Debounce save
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      savePageData({ content: newContent });
    }, 1000);
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleEditorKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          formatText('bold');
          break;
        case 'i':
          e.preventDefault();
          formatText('italic');
          break;
        case 'u':
          e.preventDefault();
          formatText('underline');
          break;
        default:
          break;
      }
    }
  };

  // Task Management
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = { text: newTaskText.trim(), completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setNewTaskText('');
    savePageData({ tasks: updatedTasks });
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    savePageData({ tasks: updatedTasks });
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    savePageData({ tasks: updatedTasks });
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="px-8 py-4 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="p-2 mr-4 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              className="text-3xl font-bold w-full outline-none bg-transparent border-b-2 border-blue-400 focus:border-blue-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
            />
          ) : (
            <h1 
              className="text-3xl font-bold cursor-text hover:bg-gray-50 p-1 rounded transition-colors -ml-1 border-b-2 border-transparent"
              onClick={() => setIsEditingTitle(true)}
              style={{ color: COLORS.primary }}
            >
              {title || 'Untitled'}
            </h1>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
        
        {/* Task Management Section */}
        <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 text-blue-500" />
            Tasks Tracker
          </h2>

          {/* Progress Bar */}
          {tasks.length > 0 && (
            <div className="mb-6 group">
              <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
                <span>Overall Progress</span>
                <span className={`transition-colors ${progressPercent === 100 ? 'text-green-500' : ''}`}>{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ease-out rounded-full ${
                    progressPercent === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-2 mb-4">
            {tasks.map((task, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 group/task ${
                  task.completed 
                    ? 'bg-gray-100/50 border-gray-100 opacity-70' 
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1 overflow-hidden">
                  <button onClick={() => toggleTask(idx)} className="focus:outline-none flex-shrink-0">
                    {task.completed ? (
                       <CheckCircle2 className="w-5 h-5 text-green-500 transition-transform transform scale-100 group-hover/task:scale-110" />
                    ) : (
                       <Circle className="w-5 h-5 text-gray-300 hover:text-blue-500 transition-colors" />
                    )}
                  </button>
                  <span className={`text-base truncate transition-all duration-300 ${
                    task.completed ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'
                  }`}>
                    {task.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTask(idx)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover/task:opacity-100 transition-all focus:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-sm italic border-2 border-dashed border-gray-200 rounded-lg bg-white">
                No tasks yet. Add one below to kick off your productivity!
              </div>
            )}
          </div>

          {/* Add Task Input */}
          <form onSubmit={handleAddTask} className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a new task and press Enter..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
              style={{ fontSize: '0.95rem' }}
            />
            <button 
              type="submit"
              disabled={!newTaskText.trim()}
              className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center shadow-blue-500/30"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Rich Text Editor Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center flex-wrap space-x-1 border-b border-gray-200 bg-gray-50 p-2 sticky top-0 z-10">
            <button onClick={() => formatText('bold')} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bold (Ctrl+B)">
              <Bold className="w-4 h-4" />
            </button>
            <button onClick={() => formatText('italic')} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Italic (Ctrl+I)">
              <Italic className="w-4 h-4" />
            </button>
            <button onClick={() => formatText('underline')} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Underline (Ctrl+U)">
              <Underline className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <button onClick={() => formatText('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bullet List">
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => formatText('insertOrderedList')} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Numbered List">
              <ListOrdered className="w-4 h-4" />
            </button>
            <button onClick={() => formatText('outdent')} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Align Left / Outdent">
              <AlignLeft className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-gray-300 mx-2"></div>
            <button onClick={() => formatText('formatBlock', 'H1')} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Heading 1">
              <Heading1 className="w-4 h-4" />
            </button>
            <button onClick={() => formatText('formatBlock', 'H2')} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Heading 2">
              <Heading2 className="w-4 h-4" />
            </button>
          </div>

          <style>
            {`
              .editor-content:empty:before {
                content: attr(placeholder);
                color: #d1d5db;
                pointer-events: none;
                display: block; 
              }
              .editor-content ul {
                list-style-type: disc;
                padding-left: 2.5rem;
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
              }
              .editor-content ol {
                list-style-type: decimal;
                padding-left: 2.5rem;
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
              }
              .editor-content h1 {
                font-size: 2.25rem;
                font-weight: bold;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                line-height: 1.2;
              }
              .editor-content h2 {
                font-size: 1.5rem;
                font-weight: bold;
                margin-top: 1.25rem;
                margin-bottom: 0.75rem;
                line-height: 1.3;
              }
              .editor-content b, .editor-content strong {
                font-weight: bold;
              }
              .editor-content i, .editor-content em {
                font-style: italic;
              }
              .editor-content u {
                text-decoration: underline;
              }
              .editor-content li {
                margin-bottom: 0.25rem;
              }
            `}
          </style>

          {/* Content Area */}
          <div 
            className="flex-1 p-6 cursor-text" 
            onClick={() => editorRef.current?.focus()}
          >
            <div
              ref={editorRef}
              className="editor-content w-full min-h-[500px] outline-none text-lg text-gray-800 leading-relaxed"
              contentEditable
              onInput={handleContentInput}
              onKeyDown={handleEditorKeyDown}
              suppressContentEditableWarning
              placeholder="Click here and start typing your content directly..."
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
