import React from 'react';
import { FileText, CheckSquare, Target } from 'lucide-react';

const NoteTakingSection = () => {
  return (
    <section className="bg-gray-300 px-6 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-blue-900">Integrated Note-Taking</h2>
          <p className="text-blue-800 text-xl leading-relaxed">
            Seamlessly connect your tasks with your notes. Create rich, detailed documents and link them to your projects for a unified workflow.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-900" />
            </div>
            <p className="text-blue-800 font-medium">Rich text editing with task integration</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-blue-900 text-lg">Project Alpha - Meeting Notes</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-6 text-left">
              <div>
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Action Items:
                </h4>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    Sarah to finalize the design mockups
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    Tom to research competitor APIs
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    Team to review the Q4 roadmap
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Key Decisions:
                </h4>
                <p className="text-blue-800 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                  We'll proceed with the blue color palette for the new branding and identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoteTakingSection;