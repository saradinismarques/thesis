import React from 'react';
import OLCompass from '../components/OLCompass';

const ContextualizePage = ({colors}) => {
  return (
    <div>
      <OLCompass colors={colors} action="compare" />
        <div className='text-container'>
            <p className='question'>
              What's it for?
            </p>
            <p className='headline'>
              See how OL applies to your specific context
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className='instruction'>
                Search the name of any body of water
            </p>
        </div>
    </div>
  );
};

export default ContextualizePage;
