import React, { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Type, 
  Image, 
  Trash2, 
  Edit3, 
  Save, 
  X 
} from 'lucide-react';
import { COLORS } from '../../utils/constant';

export const Block = ({ block, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const [checked, setChecked] = useState(block.checked || false);

  const handleSave = async () => {
    try {
      await onUpdate(block._id, { content, checked });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update block:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const getBlockIcon = () => {
    switch (block.type) {
      case 'heading':
        return <Type className="w-4 h-4" style={{ color: COLORS.primary }} />;
      case 'todo':
        return <CheckSquare className="w-4 h-4" style={{ color: COLORS.primary }} />;
      case 'image':
        return <Image className="w-4 h-4" style={{ color: COLORS.primary }} />;
      default:
        return <FileText className="w-4 h-4" style={{ color: COLORS.primary }} />;
    }
  };

  return (
    <div className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 mt-1">
        {getBlockIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        {block.type === 'todo' && (
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                onUpdate(block._id, { content, checked: e.target.checked });
              }}
              className="w-4 h-4 rounded"
              style={{ accentColor: COLORS.secondary }}
            />
            <span className={`text-sm ${checked ? 'line-through text-gray-500' : ''}`}>
              Todo Item
            </span>
          </div>
        )}
        
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': COLORS.primary }}
              placeholder={`Enter ${block.type} content...`}
              rows={block.type === 'heading' ? 1 : 3}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 px-3 py-1 text-sm rounded-md text-black transition-opacity hover:opacity-90"
                style={{ backgroundColor: COLORS.secondary }}
              >
                <Save className="w-3 h-3" />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setContent(block.content);
                }}
                className="flex items-center space-x-1 px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
              >
                <X className="w-3 h-3" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className={`cursor-text p-2 rounded border-2 border-transparent hover:border-gray-200 transition-colors ${
              block.type === 'heading' ? 'text-xl font-semibold' : 'text-sm'
            }`}
            style={{ color: COLORS.primary }}
          >
            {content || `Click to add ${block.type} content...`}
          </div>
        )}
      </div>
      
      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 rounded hover:bg-gray-200"
        >
          <Edit3 className="w-3 h-3" style={{ color: COLORS.primary }} />
        </button>
        <button
          onClick={() => onDelete(block._id)}
          className="p-1 rounded hover:bg-red-100"
        >
          <Trash2 className="w-3 h-3 text-red-500" />
        </button>
      </div>
    </div>
  );
};