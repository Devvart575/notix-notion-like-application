import React, { useState, useEffect } from 'react';
import { AuthForm } from './auth/AuthForm.jsx';
import { PageEditor } from './editor/PageEditor.jsx';
import { HomeDashboard } from './home/HomeDashboard.jsx';
import { Sidebar } from './layout/Sidebar.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { apiCall } from '../services/api.js';
import { COLORS } from '../utils/constant.js';

export const MainApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPageIds, setRecentPageIds] = useState(() => {
    const saved = localStorage.getItem('recentPages');
    return saved ? JSON.parse(saved) : [];
  });
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (selectedPage) {
      setRecentPageIds(prev => {
        const updated = [selectedPage._id, ...prev.filter(id => id !== selectedPage._id)].slice(0, 6); // Top 6
        localStorage.setItem('recentPages', JSON.stringify(updated));
        return updated;
      });
    }
  }, [selectedPage]);

  useEffect(() => {
    if (user) {
      loadPages();
    }
  }, [user]);

  const loadPages = async () => {
    try {
      const data = await apiCall('/pages');
      data.sort((a, b) => (a.position || 0) - (b.position || 0));
      setPages(data);
    } catch (err) {
      console.error('Failed to load pages:', err);
    }
    setLoading(false);
  };

  const createPage = async () => {
    try {
      const newPage = await apiCall('/pages', {
        method: 'POST',
        body: JSON.stringify({ title: 'Untitled' }),
      });
      setPages([...pages, newPage]);
      setSelectedPage(newPage);
    } catch (err) {
      console.error('Failed to create page:', err);
    }
  };

  const handleUpdateTitle = (pageId, newTitle) => {
    setPages(pages.map(p => p._id === pageId ? { ...p, title: newTitle } : p));
    if (selectedPage && selectedPage._id === pageId) {
      setSelectedPage({ ...selectedPage, title: newTitle });
    }
  };

  const handleReorderPages = async (reorderedPages) => {
    setPages(reorderedPages);
    try {
      const pagesPayload = reorderedPages.map((p, index) => ({ id: p._id, position: index }));
      await apiCall('/pages/reorder', {
        method: 'PUT',
        body: JSON.stringify({ pages: pagesPayload })
      });
    } catch (err) {
      console.error('Failed to save page order:', err);
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
        onReorderPages={handleReorderPages}
      />

      <div className="flex-1 overflow-auto">
        {selectedPage ? (
          <PageEditor
            page={selectedPage}
            onBack={() => setSelectedPage(null)}
            onUpdateTitle={handleUpdateTitle}
          />
        ) : (
          <HomeDashboard 
            user={user} 
            recentPageIds={recentPageIds} 
            pages={pages} 
            onSelectPage={setSelectedPage} 
          />
        )}
      </div>
    </div>
  );
};