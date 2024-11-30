import React from 'react';
import OLCompass from '../components/OLCompass';
import Menu from '../components/Menu';
import { ReactComponent as LockIcon } from '../assets/icons/lock-icon.svg'; // Adjust the path as necessary

const IdeatePage = ({ colors, isExplanationPage }) => {
  return (
    <div>
      <OLCompass 
        colors={colors}
        mode="default"
        position={isExplanationPage ? "center" : "left"} 
      /> 
        <div className='text-container'>
            <p className='question'>
              What's it for?
            </p>
            <p className='headline'>
              Come up with new ideas for pursuing OL
            </p>
            <div className="not-available-container">
              <LockIcon 
                className="lock-icon"
              />
              <p className='not-available'>
                Not Available Yet
              </p>
            </div>
        </div>
        <Menu isExplanationPage={isExplanationPage} />
    </div>
  );
};

export default IdeatePage;
