import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../styles/LearnPage.css';
import OLCompass from '../components/OLCompass';
import Menu from '../components/Menu';
import P1Image from '../images/P1.png';
import P2Image from '../images/P2.png';
import P3Image from '../images/P3.png';
import P4Image from '../images/P4.png';
import P5Image from '../images/P5.png';
import P6Image from '../images/P6.png';
import P7Image from '../images/P7.png';

const LearnPage = ({colors, savedComponents, setSavedComponents}) => {
  // Memoize the initialState object
  const initialState = useMemo(() => ({
    title: '',
    headline: '',
    paragraph: '',
    showMoreText: '',
    designPrompt: '',
    concepts: [],
    type: null,
    initialState: true,
    firstClick: true,
    showMessage: false,
    showMore: false,
    gradientColor: null,
    bookmark: false,
    showDesignPrompt: false
  }), []);

  const initialConcept = useMemo(() => ({
    code: '',
    label: '',
    paragraph: '',
    linkedTo: '',
    index: null,
  }), []);

  const [state, setState] = useState(initialState);
  const [concept, setConcept] = useState(initialConcept);

  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  const handleCompassClick = (code, title, headline, paragraph, showMoreText, designPrompt, type, concepts) => {
    if(state.firstClick) {
      setState((prevState) => ({
        ...prevState,
        firstClick: false,
        showMessage: true
      }));
    }


    setState((prevState) => ({
      ...prevState,
      code,
      title,
      headline,
      paragraph,
      showMoreText,
      designPrompt,
      concepts,
      type,
      initialState: false,
      showMore: false,
      showDesignPrompt: false,
      gradientColor: colors[type]
    }));

    if(concepts !== null) {
      setConcept((prevState) => ({
        ...prevState,
        code: concepts[0].Code,
        label: concepts[0].Label,
        paragraph: concepts[0].Paragraph,
        linkedTo: concepts[0].LinkedTo,
        index: 0,
      }));
    }
  };

  const toggleShowDesignPrompt = () => {
    setState((prevState) => ({
      ...prevState,
      showDesignPrompt: true,
    }));
  };

  const toggleBookmark = () => {
    setSavedComponents((prevSavedComponents) => {
      // If the current title is already in the array, remove it
      if (prevSavedComponents.includes(state.code)) {
        return prevSavedComponents.filter(item => item !== state.code);
      }
      // Otherwise, add it to the array
      return [...prevSavedComponents, state.code];
    });
  };

  const showMessage = () => {
    setState((prevState) => ({
      ...prevState,
      showMessage: true,
    }));
  };

  const removeMessage = () => {
    setState((prevState) => ({
      ...prevState,
      showMessage: false,
    }));
  };

  const handleNext = () => {
    if (concept.index < state.concepts.length - 1) {
      const nextIndex = concept.index + 1;
      
      setConcept((prevState) => ({
        ...prevState,
        code: state.concepts[nextIndex].Code,
        label: state.concepts[nextIndex].Label,
        paragraph: state.concepts[nextIndex].Paragraph,
        linkedTo: state.concepts[nextIndex].LinkedTo,
        index: nextIndex,
      }));
    }
  };

  const replaceUnderlinesWithButtons = (text, currentConcept) => {
    // Create a temporary container element to manipulate the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text.trim(); // Trim any unwanted white space
  
    // Find all <u> elements inside the text
    const underlines = tempDiv.querySelectorAll('u');

    // Replace each <u> with a <button>
    underlines.forEach((underline, index) => {
      const button = document.createElement('button');

      button.textContent = underline.textContent;
    
      // Make the button bold if it matches the current concept
      if (currentConcept.linkedTo.toLowerCase().includes(button.textContent.toLowerCase())) {
        button.style.fontWeight = 500; // Apply bold style
      }

      // Add a data attribute for identifying buttons later
      button.setAttribute('data-index', index);
        // Replace the <u> tag with the <button>
        underline.replaceWith(button);
      });

    // Return the modified HTML as a string
    return tempDiv.innerHTML;
  };

  const DynamicText = ({ text, currentConcept }) => {
    // Use `useEffect` to add event listeners after the component is mounted
    
    useEffect(() => {
      // Find all buttons added by `replaceUnderlinesWithButtons`
      const buttons = document.querySelectorAll('.l-text button');
  
      const handleButtonClick = (buttonText) => {

        const matchingIndex = state.concepts.findIndex(concept => concept.LinkedTo.toLowerCase().includes(buttonText.toLowerCase()));
        // Check if a matching concept was found
        if (matchingIndex !== -1) {
          const matchingConcept = state.concepts[matchingIndex];
          setConcept({
            code: matchingConcept.Code,
            label: matchingConcept.Label,
            paragraph: matchingConcept.Paragraph,
            linkedTo: matchingConcept.LinkedTo,
            index: matchingIndex, // Set the index of the found concept
          });
        } else {
          setConcept(initialConcept); // Reset to initial concept if no match found
        }
      };

      // Attach click event to each button
      buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
          const buttonText = e.target.textContent;
          handleButtonClick(buttonText);
        });
      });

  
      // Cleanup event listeners on component unmount (good practice)
      return () => {
        buttons.forEach((button) => {
          button.removeEventListener('click', () => {});
        });
      };
    }, [text]); // Run this effect when `text` changes
    return (
      <div className="l-text">
        <p dangerouslySetInnerHTML={{ __html: replaceUnderlinesWithButtons(text, currentConcept) }}></p>
      </div>
    );
  };
  
  // Dynamically choose image source based on state.code
  const imageSrc = state.code === 'P1' ? P1Image 
                : state.code === 'P2' ? P2Image 
                : state.code === 'P3' ? P3Image 
                : state.code === 'P4' ? P4Image 
                : state.code === 'P5' ? P5Image 
                : state.code === 'P6' ? P6Image 
                : state.code === 'P7' ? P7Image 
                : null;

  return (
    <div>
    <div className={`container ${state.showMessage ? "blur-background" : ""}`}>
      <div className='l-gradient-background'
        style={{
          background: state.initialState
            ? 'none'
            : `linear-gradient(to right, transparent 30%, ${state.gradientColor} 70%)`
        }}
      >
        <OLCompass 
          colors={colors} 
          action="learn" 
          onButtonClick={handleCompassClick} 
          resetState={resetState}  // Passing resetState to OLCompass
          savedComponents={savedComponents}
        />

        {state.initialState && (
            <>
            <div className="text-container">
                <p className='question'>
                  What's it for?
                </p>
                <p className='headline'>
                  Explore the OL fundamentals, one by one
                  </p>
                <p className='text'>
                  Are you new to Ocean Literacy, or need a refresher?
                  <br></br>
                  In the LEARN mode the Compass lets you familiarize with each OL Principle, Perspective and Dimension, with basic definitions, additional information and hints for reflection.
                  <p className='instruction'>
                  Start by clicking on any wave (
                    <svg 
                      className='text-icon'
                      fill="currentcolor"
                      stroke="currentcolor"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="-1.5 -4 35 10"  >
                      <path d="m32.54,8.56l-11.43,7.13c-3.07,1.92-6.61,1.92-9.68,0L0,8.56,11.43,1.44c3.07-1.92,6.61-1.92,9.68,0l11.43,7.13Z"/>
                    </svg>
                  ).
                  </p>
                </p>
              </div>
            </>
          )}

          {!state.initialState && (
            <>
            <button onClick={showMessage} className="question-button">
              <svg 
                className="question-icon" 
                fill="currentcolor" 
                stroke="currentcolor" /* Adds stroke color */
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="-1 109 35 35"  
                >
                <path d="m14.01,133.19c0-1.09.05-2.04.16-2.87.1-.83.38-1.66.82-2.5.42-.79.93-1.45,1.55-1.97.61-.52,1.25-1.02,1.92-1.48.67-.47,1.3-1.02,1.9-1.66.54-.63.91-1.26,1.09-1.9s.27-1.32.27-2.03-.09-1.34-.26-1.9c-.17-.56-.44-1.04-.8-1.44-.56-.68-1.24-1.15-2.05-1.4s-1.65-.38-2.53-.38-1.67.12-2.41.37c-.75.24-1.36.62-1.85,1.12-.47.45-.82.98-1.03,1.61-.22.63-.32,1.29-.32,1.98h-3.17c.06-1.1.3-2.18.72-3.23.42-1.05,1.05-1.93,1.87-2.64.82-.75,1.78-1.3,2.87-1.64,1.09-.34,2.2-.51,3.31-.51,1.36,0,2.66.21,3.88.62,1.23.41,2.26,1.1,3.09,2.06.67.71,1.16,1.52,1.47,2.43.31.91.47,1.88.47,2.91,0,1.16-.22,2.24-.65,3.26-.43,1.02-1.04,1.92-1.82,2.72-.47.52-1.01.99-1.61,1.43-.6.44-1.17.89-1.72,1.36-.55.47-.97.97-1.26,1.51-.36.67-.56,1.3-.6,1.9-.03.6-.05,1.36-.05,2.28h-3.26Zm.02,8.21v-4.09h3.24v4.09h-3.24Z"/>
              </svg>
            </button>

            <div className='l-bookmark-container'>
              <div className="l-white-line"></div>
              <button onClick={toggleBookmark} className={`l-bookmark-button ${state.bookmark ? '' : ''}`}>
                <svg 
                  className="l-bookmark-icon" 
                  fill="currentcolor" 
                  viewBox="0 0 32 32" 
                  version="1.1" 
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentcolor" /* Adds stroke color */
                >
                  <path d="M26 1.25h-20c-0.414 0-0.75 0.336-0.75 0.75v0 28.178c0 0 0 0 0 0.001 0 0.414 0.336 0.749 0.749 0.749 0.181 0 0.347-0.064 0.476-0.171l-0.001 0.001 9.53-7.793 9.526 7.621c0.127 0.102 0.29 0.164 0.468 0.164 0.414 0 0.75-0.336 0.751-0.75v-28c-0-0.414-0.336-0.75-0.75-0.75v0zM25.25 28.439l-8.781-7.025c-0.127-0.102-0.29-0.164-0.468-0.164-0.181 0-0.347 0.064-0.477 0.171l0.001-0.001-8.775 7.176v-25.846h18.5z"></path>
                </svg>
              </button>
            </div>

            <div className="l-text-container" style={{
              maxWidth: state.code === 'P7' ? '393px': 
                        state.code === 'P3'? '384.5px': 
                        state.code === 'P1' ? '382px' : '385px'}}>
              <h1 className='l-title'>{state.title}</h1>
              <h2 className='l-headline' dangerouslySetInnerHTML={{ __html: state.headline }}></h2>
              {state.type === "Principle" && (
                <>
                <DynamicText text={state.paragraph} currentConcept={concept} />
                <div className='l-concepts-container'>
                  <h1 className='l-title-concepts'>{concept.label}</h1>
                  
                  {/* Navigation Arrows */}
                  {concept.index < state.concepts.length - 1 && (
                  <button className="l-arrow-button right" onClick={handleNext}>
                    <svg 
                      className='l-arrow-icon'
                      fill="currentcolor"
                      stroke="currentcolor"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="8.5 59 16 16"  >
                      <path d="m22.74,68.05l-11.42,6.59c-.57.33-1.28-.08-1.28-.74v-13.18c0-.66.71-1.06,1.28-.74l11.42,6.59c.57.33.57,1.15,0,1.47Z"/>
                    </svg>
                  </button>
                  )}
                </div>
                  <div className="l-text-concepts expanded scroller">
                    <p>{concept.paragraph}</p>
                  </div>
                </>
              )}
              {state.type !== "Principle" && (
                <>
                <div className="l-text">
                  <p dangerouslySetInnerHTML={{ __html: state.paragraph }}></p>
                </div>
                {state.showDesignPrompt ? (
                  <p className='l-design-prompt'>{state.designPrompt}</p>
                ) : (
                  <button onClick={toggleShowDesignPrompt} className="l-show-more-button">
                    Design Prompt
                  </button>
                )}
                </>
              )}
            </div>
            </>
          )} 
          <Menu />
      </div>
      {/* Conditionally render the image if an image source is set */}
      {imageSrc && (
        <div className="l-image-container">
          <img src={imageSrc} alt={`Background ${state.code}`} className="l-principles-image" />
        </div>
      )}
      {imageSrc === null && (
        <div className="l-image-container">
          <img src={imageSrc} alt={`Background ${state.code}`} className="l-other-components-image" />
        </div>
      )}
    </div>
    
    {!state.initialState && state.showMessage && (
      <>
      <div className="message-box" style={{ width: 200 }}>
        <div className="question-circle">
            <svg 
                className="question-icon" 
                fill="currentcolor" 
                stroke="currentcolor" /* Adds stroke color */
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="-1 109 35 35"  
              >
              <path d="m14.01,133.19c0-1.09.05-2.04.16-2.87.1-.83.38-1.66.82-2.5.42-.79.93-1.45,1.55-1.97.61-.52,1.25-1.02,1.92-1.48.67-.47,1.3-1.02,1.9-1.66.54-.63.91-1.26,1.09-1.9s.27-1.32.27-2.03-.09-1.34-.26-1.9c-.17-.56-.44-1.04-.8-1.44-.56-.68-1.24-1.15-2.05-1.4s-1.65-.38-2.53-.38-1.67.12-2.41.37c-.75.24-1.36.62-1.85,1.12-.47.45-.82.98-1.03,1.61-.22.63-.32,1.29-.32,1.98h-3.17c.06-1.1.3-2.18.72-3.23.42-1.05,1.05-1.93,1.87-2.64.82-.75,1.78-1.3,2.87-1.64,1.09-.34,2.2-.51,3.31-.51,1.36,0,2.66.21,3.88.62,1.23.41,2.26,1.1,3.09,2.06.67.71,1.16,1.52,1.47,2.43.31.91.47,1.88.47,2.91,0,1.16-.22,2.24-.65,3.26-.43,1.02-1.04,1.92-1.82,2.72-.47.52-1.01.99-1.61,1.43-.6.44-1.17.89-1.72,1.36-.55.47-.97.97-1.26,1.51-.36.67-.56,1.3-.6,1.9-.03.6-.05,1.36-.05,2.28h-3.26Zm.02,8.21v-4.09h3.24v4.09h-3.24Z"/>
            </svg>
          </div>
        <p className="message-text">
          For each element, you can browse in-depth information by clicking on the 
          <svg 
            id='arrow'
            className='message-icon smaller'
            fill="currentcolor"
            stroke="currentcolor"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="8 57.8 17 17"  >
            <path d="m22.74,68.05l-11.42,6.59c-.57.33-1.28-.08-1.28-.74v-13.18c0-.66.71-1.06,1.28-.74l11.42,6.59c.57.33.57,1.15,0,1.47Z"/>
          </svg> 
          icon (or on the underlined words). Mark relevant content by clicking on the 
          <svg
            id='bookmark'
            className='message-icon smaller'
            fill="currentcolor"
            stroke="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="8 175.5 17 17"  >
            <path d="m16.61,187.76c-1.55,1.27-3.06,2.51-4.57,3.74-.32.26-.61.55-.95.77-.18.11-.47.19-.65.12-.14-.05-.24-.36-.25-.55-.02-1.13-.01-2.27-.01-3.4,0-3.73,0-7.47,0-11.2,0-.84.08-.91.93-.91,3.68,0,7.36,0,11.04,0,.79,0,.88.09.88.91,0,4.79,0,9.59-.01,14.38,0,.28-.18.55-.28.83-.26-.1-.57-.14-.77-.31-1.78-1.43-3.54-2.88-5.36-4.37Z"/>
          </svg> 
          icon.
        </p>
        <button className="got-it-button" onClick={removeMessage}>
          Ok, got it!
        </button>
      </div>
      </>
    )}
</div>
  );
};

export default LearnPage;
