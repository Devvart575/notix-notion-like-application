import React, { useState, useEffect } from 'react';
import { AuthForm } from './auth/AuthForm.jsx';
import { PageEditor } from './editor/PageEditor.jsx';
import { Sidebar } from './layout/Sidebar.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { apiCall } from '../services/api.js';
import { COLORS } from '../utils/constant.js';

export const MainApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user) {
      loadPages();
    }
  }, [user]);

  const loadPages = async () => {
    try {
      const data = await apiCall('/pages');
      setPages(data);
    } catch (err) {
      console.error('Failed to load pages:', err);
    }
    setLoading(false);
  };

  const createPage = async () => {
    const title = prompt('Enter page title:');
    if (!title) return;

    try {
      const newPage = await apiCall('/pages', {
        method: 'POST',
        body: JSON.stringify({ title }),
      });
      setPages([...pages, newPage]);
    } catch (err) {
      console.error('Failed to create page:', err);
    }
  };

  const deletePage = async (pageId) => {
    if (!confirm('Are you sure you want to delete this page and all its children?')) return;

    try {
      await apiCall(`/pages/pages/${pageId}`, { method: 'DELETE' });
      setPages(pages.filter(page => page._id !== pageId));
      if (selectedPage?._id === pageId) {
        setSelectedPage(null);
      }
    } catch (err) {
      console.error('Failed to delete page:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <div className="text-lg" style={{ color: COLORS.primary }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: COLORS.background, fontFamily: 'Inter, sans-serif' }}>
      <Sidebar
        pages={pages}
        onSelectPage={setSelectedPage}
        onCreatePage={createPage}
        onDeletePage={deletePage}
        selectedPage={selectedPage}
      />
      
      <div className="flex-1 overflow-auto">
        {selectedPage ? (
          <PageEditor page={selectedPage} onBack={() => setSelectedPage(null)} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
                Welcome to Your Workspace
              </h2>
              <p className="text-gray-600 mb-6">
                Select a page from the sidebar or create a new one to get started.
              </p>
              <button
                onClick={createPage}
                className="px-6 py-3 text-black rounded-md transition-opacity hover:opacity-90"
                style={{ backgroundColor: COLORS.secondary }}
              >
                Create Your First Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};