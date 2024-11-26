import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OLCompass from '../components/OLCompass';
import '../styles/InitialPage.css';

const colors = {
    Principle: "#41ffc9",
    Perspective: "#41e092",
    Dimension: "#41c4e0"
};

const InitialPage = () => {
    const [frame, setFrame] = useState(0);
    const navigate = useNavigate(); // Initialize the navigate function

    const initialCounters = {
        Principle: 0,
        Perspective: 0,
        Dimension: 0
    }

    const [opacityCounter, setOpacityCounter] = useState(initialCounters);

    // useCallback ensures handleKeyPress doesn't change unless its dependencies do
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') 
            setFrame((prevState) => (prevState + 1 <= 8 ? prevState + 1 : 8));
        else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') 
            setFrame((prevState) => (prevState - 1 >= 0 ? prevState - 1 : 0));
    }, []);

    // useCallback ensures handleClick doesn't change unless its dependencies do
    const handleClick = useCallback((e) => {
        const screenWidth = window.innerWidth;
        const clickPositionX = e.clientX;

        if (clickPositionX > screenWidth / 2) {
            setFrame((prevState) => (prevState + 1 <= 8 ? prevState + 1 : 8));
        } else {
            setFrame((prevState) => (prevState - 1 >= 0 ? prevState - 1 : 0));
        }
    }, []);

    useEffect(() => {
        // Add the event listener when the component mounts
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);

        };
    }, [handleKeyDown, handleClick]); // Add handleKeyPress to the dependency array

    useEffect(() => {
        if (frame === 8) {
            navigate('/home');
        }
    }, [frame, navigate]); // Trigger navigation when state changes to 6

    // Define the action based on the current state
    const actionMap = {
        0: 'initial-0',
        1: 'initial-1',
        2: 'initial-2',
        3: 'initial-3',
        4: 'initial-4',
        5: 'initial-5',
        6: 'initial-6',
        7: 'initial-7',
        8: 'initial-8',
    };

    // Determine the action based on the current state
    const mode = actionMap[frame];

    // Function to sequentially light up "Principle" buttons
    function startOpacityCounter(type) {
        if ((type === 'Principle' && opacityCounter[type] >= 6) ||
        (type === 'Perspective' && opacityCounter[type] >= 6) ||
        (type === 'Dimension' && opacityCounter[type] >= 9)) 
            return;
        
        setTimeout(() => {
            setOpacityCounter({
                ...opacityCounter,
                [type]: opacityCounter[type]+1
            });
        }, 200); // Delay for each button (3 seconds between each)
    }

    const getOpacityCounter = () => {
        if(frame === 2 || frame === 3) 
            return opacityCounter['Principle'];
        else if(frame === 4 || frame === 5)
            return opacityCounter['Perspective'] + 7;
        else if(frame === 6 || frame === 7)
            return opacityCounter['Dimension'] + 14;
    }

    // Determine the text to display based on the current state
    const getDisplayText = () => {
        if (frame === 0) {
            return (
                <>
                <div className='i-title-container'>
                    <p className='i-welcome'>WELCOME TO THE</p>
                    <p className='i-title'>OL-in-One Compass</p>
                </div>
                </>
            );
        } else if (frame === 1) {
            return (
                <>
                <div className='i-explanation-container'>
                    <p className='i-explanation'>
                        Ocean Literacy (OL) 
                        <br></br>
                        is the understating of
                        <br></br>
                        the Ocean-humanity 
                        <br></br>
                        mutual influence.
                    </p>
                </div>
                </>
            );
        } else if (frame === 2) {
            startOpacityCounter('Principle');
            return (
                <>
                <div className='i-text-container'>
                    <span className='i-text'>Ocean Literacy is based on </span>
                    <span className='i-text colored' style={{color: colors.Principle}}>
                        {opacityCounter['Principle']+1} scientific Principles
                    </span>
                    <span className='i-text'>
                    .
                    </span>
                </div>
                </>
            );
        } else if (frame === 3) {
                startOpacityCounter('Principle');

                return (
                    <>
                    <div className='i-text-container'>
                        <span className='i-text'>See Principles as the Ocean's 7 </span>
                        <span className='i-text colored' style={{color: colors.Principle}}>
                            key traits
                        </span>
                        <span className='i-text'>, and associated </span>
                        <span className='i-text colored' style={{color: colors.Principle}}>
                            challenges
                        </span>
                        <span className='i-text'> due to the climate crysis.</span>
                    </div>
                    </>
                );
        } else if(frame === 4) {
            startOpacityCounter('Perspective');
            
            return (
                <>
                <div className='i-text-container'>
                    <span className='i-text'>OL Principles can be understood  through </span>
                    <span className='i-text colored' style={{color: colors.Perspective}}>
                        {opacityCounter['Perspective']+1} Perspectives
                    </span>
                    <span className='i-text'>
                    .
                    </span>
                </div>
                </>
            );
        } else if(frame === 5) {
            startOpacityCounter('Perspective');

            return (
                <>
                <div className='i-text-container'>
                    <span className='i-text'>See Perspectives as the 7 </span>
                    <span className='i-text colored' style={{color: colors.Perspective}}>
                        points of view
                    </span>
                    <span className='i-text'> from which the Ocean's features and associated challenges can be understood.</span>

                </div>
                </>
            );
        } else if(frame === 6) {
            startOpacityCounter('Dimension');
            
            return (
                <>
                <div className='i-text-container'>
                    <span className='i-text'>OL Principles and relative Perspectives can be transfered and appropriated according to </span>
                    <span className='i-text colored' style={{color: colors.Dimension}}>
                        {opacityCounter['Dimension']+1} Dimensions
                    </span>
                    <span className='i-text'>
                    .
                    </span>
                </div>
                </>
            );
        } else if(frame === 7) {
            startOpacityCounter('Dimension');

            return (
                <>
                <div className='i-text-container'>
                    <span className='i-text'>See Dimensions as the 10 </span>
                    <span className='i-text colored' style={{color: colors.Dimension}}>
                        approaches
                    </span>
                    <span className='i-text'> that can be adopted to convey the Ocean's key features and relative viewpoints.</span>

                </div>
                </>
            );
        } 
    };

    return (
        <div>
            <OLCompass 
                mode={mode} 
                position="center"
                opacityCounter={getOpacityCounter()}
            /> 
            {getDisplayText()}    
        </div>
    );
};

export default InitialPage;