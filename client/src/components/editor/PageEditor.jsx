import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Type, 
  Image 
} from 'lucide-react';
import { Block } from '../blocks/Block.jsx';
import { apiCall } from '../../services/api.js';
import { COLORS } from '../../utils/constant.js';

export const PageEditor = ({ page, onBack }) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlocks();
  }, [page._id]);

  const loadBlocks = async () => {
    try {
      const data = await apiCall(`/blocks/page/${page._id}`);
      setBlocks(data);
    } catch (err) {
      console.error('Failed to load blocks:', err);
    }
    setLoading(false);
  };

  const createBlock = async (type) => {
    try {
      const newBlock = await apiCall('/blocks', {
        method: 'POST',
        body: JSON.stringify({
          page: page._id,
          type,
          content: '',
          position: blocks.length,
        }),
      });
      setBlocks([...blocks, newBlock]);
    } catch (err) {
      console.error('Failed to create block:', err);
    }
  };

  const updateBlock = async (blockId, updates) => {
    try {
      await apiCall(`/blocks/${blockId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      setBlocks(blocks.map(block => 
        block._id === blockId ? { ...block, ...updates } : block
      ));
    } catch (err) {
      console.error('Failed to update block:', err);
    }
  };

  const deleteBlock = async (blockId) => {
    try {
      await apiCall(`/blocks/${blockId}`, { method: 'DELETE' });
      setBlocks(blocks.filter(block => block._id !== blockId));
    } catch (err) {
      console.error('Failed to delete block:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg" style={{ color: COLORS.primary }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
        >
          ← Back to Pages
        </button>
        <h1 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>
          {page.title}
        </h1>
      </div>

      <div className="space-y-1 mb-6">
        {blocks.map((block) => (
          <Block
            key={block._id}
            block={block}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => createBlock('text')}
          className="flex items-center space-x-2 px-4 py-2 text-sm rounded-md text-black transition-opacity hover:opacity-90"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <FileText className="w-4 h-4" />
          <span>Add Text</span>
        </button>
        
        <button
          onClick={() => createBlock('heading')}
          className="flex items-center space-x-2 px-4 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
        >
          <Type className="w-4 h-4" />
          <span>Add Heading</span>
        </button>
        
        <button
          onClick={() => createBlock('todo')}
          className="flex items-center space-x-2 px-4 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
        >
          <CheckSquare className="w-4 h-4" />
          <span>Add Todo</span>
        </button>
        
        <button
          onClick={() => createBlock('image')}
          className="flex items-center space-x-2 px-4 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
        >
          <Image className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>
    </div>
  );
};