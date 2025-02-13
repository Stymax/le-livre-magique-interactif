import React from 'react';

const LibraryBackground: React.FC = () => (
  <div 
    className="fixed inset-0 bg-cover bg-center"
    style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
      filter: 'brightness(0.5)',
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-purple-900/50 to-blue-900/50 z-0" />
  </div>
);

export default LibraryBackground;