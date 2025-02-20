import React from 'react';
import Image from 'next/image';

interface ArticleModalProps {
  article: {
    id: number;
    title: string;
    image: string;
    category: string;
    content: string;
  };
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Article Image */}
        <div className="w-full h-72 relative">
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-900">
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 whitespace-pre-line">{article.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 