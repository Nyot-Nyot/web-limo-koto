import React, { memo } from 'react';

const BackgroundLayer = memo(() => (
  <>
    {/* Fixed Background */}
    <div 
      className="fixed inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ zIndex: -2 }}
    />
    
    {/* Overlay */}
    <div className="fixed inset-0 bg-black/70" style={{ zIndex: -1 }} />
  </>
));

BackgroundLayer.displayName = 'BackgroundLayer';

export default BackgroundLayer;
