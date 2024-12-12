import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getGetStartedData, getLearnData, getConceptsData } from '../utils/Data.js'; 
import { ReactComponent as BookmarkIcon } from '../assets/icons/bookmark-icon.svg'; // Adjust the path as necessary
import ManropeFont from '../utils/Font.js';
import Draggable from "react-draggable";

// Sizes and positions 
let size, bookmarkSize, bookmarkLeftP, bookmarkLeftPe, bookmarkLeftD, bookmarkTopP, bookmarkTopPe, bookmarkTopD;

if(window.innerHeight > 700) {
  size = 490;
  bookmarkSize = '16px';
  bookmarkLeftP = '40px';
  bookmarkLeftPe = '-26px';
  bookmarkLeftD = '-26px';
  bookmarkTopP = '19px';
  bookmarkTopPe = '10px';
  bookmarkTopD = '10px';
} else {
  size = 460;
  bookmarkSize = '15px';
  bookmarkLeftP = '40px';
  bookmarkLeftPe = '-26px';
  bookmarkLeftD = '-26px';
  bookmarkTopP = '17.5px';
  bookmarkTopPe = '9.5px';
  bookmarkTopD = '9.5px';
}

const waveWidth = size/2.6;
const waveHeight = waveWidth*3;

// SVG Path for button shape
const svgPath = "m82.54,14.01c-.44.31-.88.61-1.32.92-.54.38-1.09.77-1.63,1.16-.34.24-.69.48-1.03.72-.55.39-1.1.78-1.65,1.17-.55.38-1.09.76-1.64,1.15-.47.33-.93.66-1.4.99-.43.3-.86.6-1.29.9-.44.31-.89.62-1.34.93-.26.18-.51.35-.77.52-.29.19-.58.38-.88.56-.26.15-.52.29-.78.43-.36.19-.71.4-1.07.58-.62.3-1.24.59-1.87.86-.59.25-1.19.49-1.79.69-.95.31-1.91.63-2.9.83-.37.08-.74.18-1.12.25-.28.06-.57.09-.85.14-.38.06-.77.14-1.15.18-1.17.13-2.35.21-3.53.21-.19,0-.38,0-.57,0-.3,0-.6-.03-.9-.04-.37-.02-.74-.02-1.11-.05-.59-.06-1.18-.13-1.76-.22-.9-.14-1.79-.29-2.67-.52-.55-.14-1.1-.28-1.64-.44-.4-.12-.79-.26-1.19-.4-.34-.12-.68-.22-1.01-.36-.44-.19-.87-.38-1.31-.57-.41-.18-.82-.36-1.23-.54-.62-.27-1.23-.56-1.84-.84-.61-.28-1.21-.56-1.82-.85-.62-.29-1.24-.57-1.85-.85-.6-.28-1.2-.56-1.8-.84-.62-.29-1.25-.57-1.87-.86-.6-.28-1.19-.55-1.79-.83-.61-.28-1.22-.56-1.82-.84-.61-.28-1.21-.57-1.82-.85-.61-.28-1.23-.56-1.84-.84-.62-.28-1.23-.57-1.85-.86-.48-.22-.95-.44-1.43-.65-.36-.16-.73-.3-1.09-.44-.29-.11-.58-.21-.88-.31-.26-.09-.51-.19-.78-.27-.56-.16-1.13-.32-1.7-.45-.45-.11-.9-.19-1.35-.28-.37-.07-.75-.15-1.12-.21-.28-.05-.57-.07-.85-.11-.31-.04-.63-.09-.94-.11-.46-.04-.93-.06-1.39-.08-.34-.02-.68-.02-1.02-.03-.18,0-.36,0-.54,0-.38,0-.75-.01-1.13,0-.61.03-1.22.07-1.83.14-.63.07-1.25.18-1.88.27-.2.03-.4.07-.6.12-.3.06-.6.13-.89.2-.33.07-.65.14-.98.23-.59.16-1.17.35-1.75.51-.27.08-.52-.04-.63-.27-.12-.24-.06-.5.17-.67.29-.21.59-.42.89-.63.34-.24.68-.47,1.01-.7.47-.33.93-.66,1.4-.99.34-.24.68-.47,1.01-.7.55-.39,1.1-.78,1.65-1.17.55-.38,1.09-.76,1.64-1.15.55-.38,1.09-.77,1.63-1.16.55-.39,1.1-.78,1.65-1.16.65-.44,1.29-.88,1.96-1.29.65-.39,1.32-.75,1.99-1.09.55-.28,1.1-.55,1.67-.79,1.36-.56,2.74-1.05,4.16-1.41.55-.14,1.09-.29,1.64-.38,1.04-.18,2.09-.39,3.19-.43.38-.03.81-.1,1.24-.11.79-.01,1.59-.06,2.39,0,.46.03.93.03,1.4.08.64.06,1.27.12,1.9.22.89.14,1.78.29,2.65.53.57.15,1.15.29,1.71.47.75.24,1.49.51,2.23.79.39.15.77.32,1.16.48.1.05.21.09.32.13.63.28,1.26.58,1.89.87.59.27,1.17.54,1.76.81.62.29,1.24.57,1.85.86.52.24,1.03.47,1.55.71.61.28,1.21.57,1.82.85.62.29,1.25.57,1.87.86.6.28,1.19.55,1.79.83.62.29,1.25.57,1.87.86.6.28,1.19.55,1.79.83.62.29,1.25.57,1.87.86.46.22.92.46,1.38.66.63.28,1.26.55,1.89.81.32.13.65.23.98.34.38.13.76.29,1.15.4.62.18,1.24.34,1.86.49.39.1.78.16,1.17.24.3.06.6.13.91.18.54.08,1.09.14,1.63.2.15.02.3.04.44.05.37.02.75.04,1.13.06.26.02.52.04.79.05.42,0,.85-.02,1.27-.01.6,0,1.21-.04,1.81-.09.49-.04.99-.1,1.48-.16.82-.11,1.64-.22,2.45-.43.37-.09.75-.15,1.12-.25.64-.17,1.28-.37,1.93-.55.04-.01.09-.02.14-.02.24.02.42.16.48.37.06.23-.01.45-.22.6Z";
const svgTextPath = "m119.67,8.06c-7.54,3.59-12.67,7.32-27.44,8.01-16.45.77-25.71-4.5-32.34-7.85-7.56-3.55-12.7-7.29-27.47-7.91C15.97-.38,6.73,4.93.11,8.31";
const svgTextPathInverted = "m119.67,8.31c-6.61-3.38-15.85-8.69-32.31-8-14.77.62-19.91,4.36-27.47,7.91-6.63,3.35-15.89,8.62-32.34,7.85C12.78,15.39,7.65,11.65.11,8.06";

const bigLabels = ['P6', 'D10'];

const OLCompass = ({ colors, mode, position, onButtonClick, resetState, savedComponents, selectedComponents, onEnterClick, resetCompass, onSearchClick, onSubmitClick, fetchData, opacityCounter }) => {
  // Function to determine the center based on position
  const getCenter = (position) => {
    if (position === "center")
      return { x: window.innerWidth * 0.5, y: window.innerHeight * 0.47 };
    else if (position === "left") 
      return { x: window.innerWidth * 0.4, y: window.innerHeight * 0.47 }; // Adjust y for better positioning
  };

  const center = getCenter(position);

  // Dictionary with all information
  let componentsData;

  if(mode.startsWith("get-started") || mode.startsWith("analyse")) 
    componentsData = getGetStartedData();
  else
    componentsData = getLearnData();

  const principles = getComponentsPositions(componentsData['Principle'], 'Principle');
  const perspectives = getComponentsPositions(componentsData['Perspective'], 'Perspective');
  const dimensions = getComponentsPositions(componentsData['Dimension'], 'Dimension');
  const components = principles.concat(perspectives, dimensions);
  const concepts = getConceptsData();

  // State of clicks and hovers
  const [hoveredId, setHoveredId] = useState(null);
  const [clickedIds, setClickedIds] = useState([]);
  
  // Initial State
  const [initialState, setInitialState] = useState(true);

  // Tooltip
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  
  // Declare a timeout variable to store the reference to the timeout
  let tooltipTimeout = null;

  // Refs to update the state instantly
  const clickedIdsRef = useRef(clickedIds);
  const hoveredIdRef = useRef(hoveredId);
  
  // Update the ref whenever changes
  useEffect(() => {
      clickedIdsRef.current = clickedIds;
  }, [clickedIds]);

  useEffect(() => {
      hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  // Effect to handle reset
  useEffect(() => {
    if (resetCompass) {
      // Clear the selected buttons or reset the state
      setClickedIds([]);
      setHoveredId(null);
      setInitialState(true);
    }
  }, [resetCompass]);

  // Effect to handle the click on other buttons of the page
  useEffect(() => {
    if (fetchData && onSubmitClick) {
      let codes = clickedIdsRef.current.map(id => components[id].Code);
      onSubmitClick(codes);
    }
  }, [fetchData, onSubmitClick, components]);

  useEffect(() => {
    if (fetchData && onSearchClick) {
      let codes = clickedIdsRef.current.map(id => components[id].Code);
      onSearchClick(codes);
    }
  }, [fetchData, onSearchClick, components]);

  const handleClick = (id) => {
    //const id = parseInt(e.target.id(), 10);
    if (mode.startsWith("intro") || mode === "default" || mode === "get-inspired-carousel" || mode === "analyse-a-p" || mode === "analyse-a-pe" || mode === "analyse-a-d") 
      return;
    
    if (mode === "learn") {
      // Check if the clicked ID is already in clickedIds
      if (clickedIds.includes(id)) {
        // If it is, remove it and reset state
        setClickedIds([]);
        setHoveredId(null);
        setInitialState(true);

        if (onButtonClick) {
          onButtonClick(
            null
          );
        }

      } else {
        setInitialState(false);
        setClickedIds([id]);
        const title = convertLabel(components[id].Code);
        let correspondingConcepts = null;
        
        if (components[id].Type === "Principle") {
          correspondingConcepts = getCorrespondingConcepts(concepts, components[id].Code);
        }

        if (onButtonClick) {
          onButtonClick(
            components[id].Code,
            title,
            components[id].Headline,
            components[id].Paragraph,
            components[id].Type,
            correspondingConcepts
          );
        }
      }
    } else if (mode === "get-inspired" || mode === "get-inspired-search"|| mode === "contribute" || mode === "get-started"|| mode === "get-started-search" || mode.startsWith("analyse")) {
      setClickedIds(prevClickedIds =>
        prevClickedIds.includes(id)
          ? prevClickedIds.filter(buttonId => buttonId !== id) // Remove ID if already clicked
          : [...prevClickedIds, id] // Add ID if not already clicked
      );
              
      if (mode === "get-inspired" || mode === "get-inspired-search" || mode === "contribute") {
        if (onButtonClick) onButtonClick();
      } else if(mode === "get-started" || mode === "get-started-search" || mode.startsWith("analyse")) {
        const title = convertLabel(components[id].Code);
        setInitialState(false);
        
        if (onButtonClick) {
          onButtonClick(
            components[id].Code,
            title,
            components[id].Headline,
            components[id].Type,
          );
        }

        if(mode === "analyse") {
          if (activeId === id) {
            // If the clicked component is already active, deactivate it
            setActiveId(null);
          } else {
            // Set the clicked component as active
            setActiveId(id);
          }
        }
      }
    } 
  };
  
  const handleMouseEnter = (e, id) => {
    if (mode.startsWith("intro") || mode === "default" || mode === "analyse-a-p" || mode === "analyse-a-pe" || mode === "analyse-a-d") 
      return;

    setHoveredId(id);
    hoveredIdRef.current = id; 

    if(mode.startsWith("get-started") || mode.startsWith("analyse"))
      return;

    if(components[id].Type === "Principle") {
      // Clear any existing timeout to avoid overlaps
      clearTimeout(tooltipTimeout);

      // Set a timeout to delay the appearance of the tooltip by 1 second
      tooltipTimeout = setTimeout(() => {
        if (hoveredIdRef.current === id) {  // Check if the tooltip was not cancelled
          setTooltipPos({ x: e.clientX, y: e.clientY });
          let cleanedText = components[id].Tooltip.replace('<br>', '');
          setTooltipText(cleanedText);
          setTooltipVisible(true);
        }
      }, 500); // 1-second delay
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);

    if(mode.startsWith("get-started"))
      return;

    // Clear the tooltip timeout to prevent it from showing if mouse leaves
    clearTimeout(tooltipTimeout);

    if(mode === "learn" || mode === "contribute" || mode === "get-inspired" || mode === "get-started"  || mode === "get-started-search") {
      // Set the cancellation flag to prevent tooltip from showing
      setTooltipVisible(false);
      setTooltipText(""); // Clear the tooltip text
    }
  };

  // Memoize handleKeyDown to avoid creating a new reference on each render
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setClickedIds([]);
      setHoveredId(null);
      setInitialState(true);

      if(resetState)
        resetState();
    } else if (e.key === 'Enter' && (mode === "contribute" || mode === "get-inspired")) {
      if (onEnterClick) {
        let codes = clickedIdsRef.current.map(id => components[id].Code);
        onEnterClick(codes);
      }
    }
  }, [resetState, mode, components, onEnterClick]);
    
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Dependency array includes handleKeyDown

  
  let containerStyle;
  if(mode.startsWith('analyse')) {
    // Container styles for the circle menu
      containerStyle = {
      // position: 'relative',   // Fixed position to stay in the specified location
      // top: '50%',            // Reset top for positioning
      // left: '50%',           // Reset left for positioning
      transform: `translate(9%, 8%)`,
      height: 600,
      width: 600,
    };
  } else {
    containerStyle = {
      position: 'fixed',   // Fixed position to stay in the specified location
      top: '0',            // Reset top for positioning
      left: '0',           // Reset left for positioning
      transform: `translate(-50%, -50%)`, // Centered offset
      borderRadius: '50%', // To make it a circular background if desired
      width: `${size}px`,
      height: `${size}px`,
    };
  }

  const buttonStyle = {
    position: 'absolute',
    cursor: (mode.startsWith("intro") || mode === "default" || mode === "analyse-a-p" || mode === "analyse-a-pe" || mode === "analyse-a-d" ) ? 'default' : 'pointer',
    pointerEvents: 'none', // Ensure buttons are clickable
  };

  const Tooltip = ({ text, position }) => (
    <div
      style={{
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: 'translate(-50%, -110%)', // Adjusts the position above the button
        zIndex: 1000,
        backgroundColor: '#acaaaa', // Tooltip background color
        color: 'white', // Tooltip text color
        padding: '10px', // Padding inside the tooltip
        borderRadius: '5px', // Rounded corners
        fontFamily: 'Manrope',
        fontSize: '15px',
        width: `${text.length * 4.2}px`, // Dynamic width based on text length
        pointerEvents: 'none', // Prevents tooltip from interfering with hover
        opacity: 0.9
      }}
    >
      {text}
      {/* Tooltip pointer */}
      <div
        style={{
          position: 'fixed',
          top: '100%', // Positions pointer below the tooltip box
          left: '50%',
          marginLeft: '-5px', // Centers the pointer
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '10px solid #acaaaa', // Matches tooltip background
          opacity: 0.9
        }}
      />
    </div>
  );

  const Bookmark = ({ component }) => (
    <div
      style={{
        position: 'absolute',
        left: `${component.x-8}px`, // Adjust position for button size
        top: `${component.y-8-2}px`,
        transform: `rotate(${component.angle + Math.PI}rad)`,
        zIndex: 20
      }}
    >
      <div
        style={{
          position: 'relative',
          left: `${component.Type === "Principle" 
            ? bookmarkLeftP 
            : component.Type === "Perspective" 
              ? bookmarkLeftPe  // Add your condition for 'dimension' here
              : bookmarkLeftD }`,
          top: `${component.Type === "Principle" 
            ? bookmarkTopP 
            : component.Type === "Perspective" 
              ? bookmarkTopPe  // Add your condition for 'dimension' here
              : bookmarkTopD }`,
          transform: `${component.Type === "Principle" ? `rotate(${-Math.PI * 0.14}rad)` : `rotate(${-Math.PI * 0.11 + Math.PI/4}rad)` }`
        }}  
      >
        <BookmarkIcon
          style={{
            width: bookmarkSize ,
            height: bookmarkSize,
            fill: colors['Selection'],
            stroke: 'none'
          }}
        />
      </div>
    </div>
  );

  // Other states
  const [textAreaData, setTextAreaData] = useState({}); // Store input data for components
  const [activeId, setActiveId] = useState(null); // Track the active clicked component ID
  const textareaRef = useRef(null); 
  const [textAreaPositions, setTextAreaPositions] = useState({}); // Track positions for all text areas
  const [initialPositions, setInitialPositions] = useState({});

  const handleDragStop = (id, data) => {
    setTextAreaPositions((prevPositions) => ({
      ...prevPositions,
      [id]: { x: data.x, y: data.y }, // Update the position of the dragged textarea
    }));
  };

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Handle text changes
  const handleTextChange = (e) => {
    const { name, value, selectionStart, selectionEnd } = e.target;

    // Update the text and the cursor position for the specific textarea
    setTextAreaData((prevData) => ({
      ...prevData,
      [name]: {
        text: value, // Store the text content
        cursorStart: selectionStart, // Store the cursor's starting position
        cursorEnd: selectionEnd, // Store the cursor's ending position (for selection)
      }
    }));
  };

  const handleTextAreaFocus = (id) => {
    setActiveId(id); // Set active ID when textarea is focused
  };

  // TextArea Component
  const TextArea = ({ id, position, value, onDragStop }) => {
    const textareaRef = useRef(null);
  
    //setInitialPositions((prev) => ({ ...prev, [id]: position }));
    // Focus the textarea when the component mounts
    useEffect(() => {
      if (textareaRef.current && id === activeId) {
        textareaRef.current.focus();
      }
    }, [activeId, id]);
  
    // After the textarea value updates, apply the cursor position
    useEffect(() => {
      if (textareaRef.current && value.cursorStart !== undefined) {
        textareaRef.current.setSelectionRange(value.cursorStart, value.cursorEnd);
      }
    }, [value.cursorStart, value.cursorEnd]);
  
    const handleInputChange = (e) => {
      handleTextChange(e, id);
    };
  

    return (
      <Draggable
        position={position} // Controlled position from the parent state
        onStart={() => handleTextAreaFocus(id)} // Set active ID when dragging starts
        onStop={(e, data) => onDragStop(id, data)} // Notify parent on drag stop
        handle=".textarea-drag-handle" // Optional: Adds a drag handle
      >
        <div
          style={{
            position: "absolute",
            zIndex: 100,
          }}
        >
          {/* Drag handle (optional) */}
          <div
            className="textarea-drag-handle"
            style={{
              cursor: "move",
              backgroundColor: "#f0f0f0",
              padding: "4px",
              textAlign: "center",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              fontSize: "12px",
            }}
          >
            Drag Me
          </div>
          <textarea
            ref={textareaRef}
            name={id}
            value={value.text || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="Enter your notes here"
            style={{
              width: "200px",
              height: "100px",
              fontSize: "14px",
              padding: "8px",
              borderRadius: "4px",
              fontFamily: "Manrope",
              border: "1px solid #ccc",
              resize: "none",
            }}
          />
        </div>
      </Draggable>
    );
  };

  const Arrow = ({ start, end }) => {
    const arrowHeadSize = 5; // Adjust arrowhead size as needed
  
    // Calculate the angle for the arrowhead
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const arrowHeadPoint1 = {
      x: end.x - arrowHeadSize * Math.cos(angle - Math.PI / 6),
      y: end.y - arrowHeadSize * Math.sin(angle - Math.PI / 6),
    };
    const arrowHeadPoint2 = {
      x: end.x - arrowHeadSize * Math.cos(angle + Math.PI / 6),
      y: end.y - arrowHeadSize * Math.sin(angle + Math.PI / 6),
    };
  
    return (
      <svg
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        width="100%"
        height="100%"
      >
        {/* Line connecting the start and end */}
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="black"
          strokeWidth="2"
        />
        {/* Arrowhead */}
        <polygon
          points={`${end.x},${end.y} ${arrowHeadPoint1.x},${arrowHeadPoint1.y} ${arrowHeadPoint2.x},${arrowHeadPoint2.y}`}
          fill="black"
        />
      </svg>
    );
  };  
  
  return (
    <>       
      <div 
        style={{
          ...containerStyle, 
          left: `${center.x / window.innerWidth * 100}vw`, 
          top: `${center.y / window.innerHeight * 100}vh`,
        }}
      >
        {components.map((c, i) => (
          <div key={i}>
            {/* Shape */}
            <div
              style={{
                ...buttonStyle,
                left: `${c.x - waveWidth / 2}px`, // Adjust position for button size
                top: `${c.y - waveHeight / 2 - 2}px`,
                transform: `rotate(${c.angle}rad) ${c.Type === "Principle" ? 'scaleY(-1)' : 'scaleY(1)'}`,
                zIndex: 1 // Layer filled shapes at the base
              }}
              onClick={() => handleClick(i)}
              onMouseEnter={(e) => handleMouseEnter(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}

            >
              <svg viewBox="-5 0 100 20" width={waveWidth} height={waveHeight} style={{ pointerEvents: 'none' }}>
                <path 
                  d={svgPath} 
                  fill={getWaveFill(clickedIds, hoveredId, i, mode, colors, c.Type)}  // Use the gradient fill
                  stroke="none" 
                  style={{ pointerEvents: 'all' }}
                  transition="opacity 1s ease"
                  opacity={getOpacity(clickedIds, hoveredId, i, c, mode, selectedComponents, opacityCounter)} // Change opacity on hover
                />
              </svg>
            </div>
  
            {/* Outline Shape */}
            <div
              style={{
                ...buttonStyle,
                left: `${c.x - waveWidth / 2}px`,
                top: `${c.y - waveHeight / 2 - 2}px`,
                transform: `rotate(${c.angle}rad) ${c.Type === "Principle" ? 'scaleY(-1)' : 'scaleY(1)'}`,
                position: 'absolute', // Consistent positioning
                zIndex: 30 // Ensures outlines are rendered on top of filled shapes
              }}
              onClick={() => handleClick(i)}
              onMouseEnter={(e) => handleMouseEnter(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <svg viewBox="-5 0 100 20" width={waveWidth} height={waveHeight} style={{ pointerEvents: 'none' }}>
                <path 
                  d={svgPath} 
                  fill="none"
                  opacity={getOutlineOpacity(clickedIds, hoveredId, i, c, mode, selectedComponents, opacityCounter)} // Change opacity on hover
                  stroke={getStroke(clickedIds, hoveredId, i, mode, colors, c.Type)}
                  strokeWidth={mode.startsWith('analyse') ? "0.6px" : "1.5px"}
                  style={{ pointerEvents: 'all' }} 
                />
              </svg>
            </div>
  
            {/* Text */}
            <div
              style={{
                position: 'absolute',
                left: `${c.x - (waveWidth * 0.83) / 2}px`, // Adjust position for button size
                top: `${c.y - waveHeight / 2 - 2}px`,
                transform: isFlipped(c.Code) ? `rotate(${c.angle + Math.PI}rad)` : `rotate(${c.angle}rad)`,
                opacity: getTextOpacity(clickedIds, hoveredId, i, c, mode, selectedComponents, opacityCounter), // Change opacity on hover
                zIndex: 10,
                pointerEvents: 'none', // Disable pointer events for the inner div
                userSelect: 'none'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  left: isFlipped(c.Code) 
                    ? (c.Type === 'Principle' ? '6.5px' : '6.5px') 
                    : (c.Type === 'Principle' ? '-6.5px' : '-6.5px'), 
                  top: isFlipped(c.Code) 
                    ? (c.Type === 'Principle' ? '6px' : '-2px') 
                    : (c.Type === 'Principle' ? '-2px' : '6px'),
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}
              >
                <svg viewBox="0 0 119.78 16.4" width={waveWidth * 0.83} height={waveHeight} style={{ pointerEvents: 'none' }}>
                  <defs>
                    <style type="text/css">
                      {`
                        @font-face {
                          font-family: 'Manrope';
                          src: url(data:font/ttf;base64,${ManropeFont}) format('truetype');
                        }
                      `}
                    </style>
                    <path 
                      id={`text-path-${i}`} 
                      d={c.Type === "Principle" ? svgTextPathInverted : svgTextPath } 
                      style={{ 
                        pointerEvents: 'none',
                        userSelect: 'none'
                      }} 
                    />
                  </defs>
  
                  {/* Text on Path */}
                  <text
                    fill={getTextFill(clickedIds, hoveredId, i, mode, colors, c.Type)}
                    fontSize="8px"
                    letterSpacing={getLabelWidth(c.Label) > 10 ? "0.5px" : "0.9px"}
                    dy={bigLabels.includes(c.Code) ? '-0.11em' : '0.35em'} // Adjust this to center the text vertically on the path
                    style={{ pointerEvents: 'none' }} // Ensure text doesn't interfere
                    >
                    <textPath
                      href={`#text-path-${i}`}
                      startOffset="50%" // Center text along the path
                      textAnchor="middle" // Ensure the text centers based on its length
                      style={{ 
                        pointerEvents: 'none',  
                        userSelect: 'none'
                      }} // Ensure textPath doesn't interfere
                    >
                      {getText(mode, c.Type, c.Label, c.Code, 0)}
                    </textPath>
                  </text>
  
                  {/* Second Line (if it has one) */}
                  {bigLabels.includes(c.Code) &&
                    <text
                      fill={getTextFill(clickedIds, hoveredId, i, mode, colors, c.Type)}
                      fontSize="8px"
                      letterSpacing={getLabelWidth(c.Label) > 10 ? "0.5px" : "0.9px"}
                      dy="0.84em" // Adjust this to center the text vertically on the path
                      style={{ 
                        pointerEvents: 'none', 
                        userSelect: 'none'
                      }} // Ensure text doesn't interfere
                    >
                      <textPath
                        href={`#text-path-${i}`}
                        startOffset="50%" // Center text along the path
                        textAnchor="middle" // Ensure the text centers based on its length
                        style={{ 
                          pointerEvents: 'none', 
                          userSelect: 'none'
                        }} // Ensure textPath doesn't interfere
                      >
                        {getText(mode, c.Type, c.Label, c.Code, 1)}
                      </textPath>
                    </text>
                  }
                </svg>
              </div>
            </div>
  
            {/* Bookmark */}
            {mode === "learn" && !initialState && savedComponents.includes(c.Code) &&
              <Bookmark component={c} />
            }

            {/* Text Areas for 'analyse' mode */}
            {/* {mode.startsWith("analyse") &&
              clickedIds.includes(i) && ( // Show the text area if the ID is in clickedIds
                <TextArea
                id={i}
                position={textAreaPositions[i] || { x: c.x, y: c.y }} // Use stored or initial position
                value={textAreaData[i] || { text: "", cursorStart: 0, cursorEnd: 0 }}
                onFocus={() => handleTextAreaFocus(i)} // Set active on focus
                onDragStop={handleDragStop} // Handle drag stop to update position
                />
              )} */}
          </div>
        ))}
  
      </div>
  
      {(mode === "learn" || mode === "contribute" || mode.startsWith("get-inspired")) && tooltipVisible && 
        <Tooltip 
          text={tooltipText} 
          position={tooltipPos} 
        />
      }
  
    </>
  );
} 

function getComponentsPositions(componentsData, type) {
  const centerX = size/2;
  const centerY = size/2;
  let radius, numberOfComponents;

  if(type === 'Principle') {
    radius = size/6.9;
    numberOfComponents = 7;
  } else if(type === 'Perspective') {
    radius = size/2.93;
    numberOfComponents = 7;
  } else if(type === 'Dimension') {
    radius = size/2;
    numberOfComponents = 10;
  }

  const angleStep = (2 * Math.PI) / numberOfComponents;
  let startAngle

  if(type === 'Principle')
    startAngle = -Math.PI/1.55;
  else
    startAngle = -Math.PI/2;

  for (let i = 0; i < numberOfComponents; i++) {
    let angle = i * angleStep + startAngle;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    if(type === 'Principle')
      angle = angle + 2*Math.PI / 2 + Math.PI*0.02;
    else if(type === 'Perspective')
      angle = angle + Math.PI / 2 - Math.PI*0.01;
    else if(type === 'Dimension')
      angle = angle + Math.PI / 2 - Math.PI*0.005;

    componentsData[i]["x"] = x;
    componentsData[i]["y"] = y;
    componentsData[i]["angle"] = angle;
  }
  return componentsData;
};

const getOpacity = (clickedIds, hoveredId, currentId, component, mode, selectedComponents, opacityCounter) => {
  // Intro
  if (mode === "intro-0")
    return 0.3;
  else if (mode === "intro-1" || mode === "intro-2" || mode === "intro-3") 
    return 0.15;
  else if (mode === "intro-4" || mode === "intro-5") 
    if(component.Type === "Principle") 
      if(currentId <= opacityCounter)
        return 1;
      else
        return 0.15;
    else 
      return 0.15;
  else if (mode === "intro-6" || mode === "intro-7") 
    if(component.Type === "Principle")
      return 0.55;
    else if(component.Type === "Perspective")
      if(currentId <= opacityCounter)
        return 1;
      else
        return 0.15;
    else
      return 0.15;
  else if (mode === "intro-8" || mode === "intro-9") 
    if(component.Type === "Principle")
      return 0.55;
    else if(component.Type === "Perspective")
      return 0.55;
    else 
      if(currentId <= opacityCounter)
        return 1;
      else
        return 0.15;

  // Get Started
  if(mode === "get-started-search") 
    if(selectedComponents === component.Code)
      return 1;
    else if(hoveredId === currentId) 
      return 0.8;
    else
      return 0.2;

  // Get Inspired
  if(mode === "get-inspired-carousel" || mode === "get-inspired-search") 
    if(selectedComponents.includes(component.Code))
      return 1;
    else
      return 0.2;

  // Analyse    
  if(mode === "analyse" || mode === "analyse-a-all") {
    if (clickedIds.includes(currentId)) 
      return 1;
    if (hoveredId === currentId) 
      return 0.5;
    return 1;
  }
  if(mode.startsWith("analyse")) {
    if(mode === "analyse-a-p" && component.Type === "Principle")
      return 1;
    if(mode === "analyse-a-pe" && component.Type === "Perspective")
      return 1;
    if(mode === "analyse-a-d" && component.Type === "Dimension")
      return 1;
    if(!clickedIds.includes(currentId))
      return 1;
    return 0.05;
  }

  // General
  if (clickedIds.includes(currentId)) 
    return 1;
  if (hoveredId === currentId) 
      return 0.8;
  if(clickedIds.length === 0) 
      return 1;

  return 0.3;
};

const getOutlineOpacity = (clickedIds, hoveredId, currentId, component, mode, selectedComponents, opacityCounter) => {
  if(!mode.startsWith("analyse"))
    return 1;

  // Analyse    
  if(mode === "analyse" || mode === "analyse-a-all") {
    if (clickedIds.includes(currentId)) 
      return 1;
    if (hoveredId === currentId) 
      return 0.5;
    return 1;
  }
  if(mode.startsWith("analyse")) {
    if(mode === "analyse-a-p" && component.Type === "Principle")
      return 1;
    if(mode === "analyse-a-pe" && component.Type === "Perspective")
      return 1;
    if(mode === "analyse-a-d" && component.Type === "Dimension")
      return 1;
    if(!clickedIds.includes(currentId))
      return 1;
    return 1;
  }
};

const getTextOpacity = (clickedIds, hoveredId, currentId, component, mode, selectedComponents, opacityCounter) => {
  // Intro
  if (mode === "intro-0")
    return 0.3;
  else if (mode === "intro-1" || mode === "intro-2" || mode === "intro-3") 
    return 0.15;
  else if (mode === "intro-4" || mode === "intro-5") 
    if(component.Type === "Principle") 
      if(currentId <= opacityCounter)
        return 1;
      else
        return 0.15;
    else 
      return 0.15;
  else if (mode === "intro-6" || mode === "intro-7") 
    if(component.Type === "Principle")
      return 0.55;
    else if(component.Type === "Perspective")
      if(currentId <= opacityCounter)
        return 1;
      else
        return 0.15;
    else
      return 0.15;
  else if (mode === "intro-8" || mode === "intro-9") 
    if(component.Type === "Principle")
      return 0.55;
    else if(component.Type === "Perspective")
      return 0.55;
    else 
      if(currentId <= opacityCounter)
        return 1;
      else
        return 0.15;

  // Get Started
  if(mode === "get-started-search") 
    if(selectedComponents === component.Code)
      return 1;
    else if(hoveredId === currentId) 
      return 0.8;
    else
      return 0.2;

  // Get Inspired
  if(mode === "get-inspired-carousel" || mode === "get-inspired-search") 
    if(selectedComponents.includes(component.Code))
      return 1;
    else
      return 0.2;

  // Analyse    
  if(mode === "analyse" || mode === "analyse-a-all") {
    if (clickedIds.includes(currentId)) 
      return 1;
    if (hoveredId === currentId) 
      return 0.5;
    return 1;
  }
  if(mode.startsWith("analyse")) {
    if(mode === "analyse-a-p" && component.Type === "Principle")
      return 1;
    if(mode === "analyse-a-pe" && component.Type === "Perspective")
      return 1;
    if(mode === "analyse-a-d" && component.Type === "Dimension")
      return 1;
    if(!clickedIds.includes(currentId))
      return 1;
    return 1;
  }

  // General
  if (clickedIds.includes(currentId)) 
    return 1;
  if (hoveredId === currentId) 
      return 0.8;
  if(clickedIds.length === 0) 
      return 1;

  return 0.3;
};

const getWaveFill = (clickedIds, hoveredId, currentId, mode, colors, type) => {
  if(mode.startsWith("analyse")) {
    if(clickedIds.includes(currentId) || hoveredId === currentId)
      return colors['Wave'][type];
    else
      return "white";
  }
  else 
    return colors['Wave'][type];
}

const getTextFill = (clickedIds, hoveredId, currentId, mode, colors, type) => {
  if(mode.startsWith("analyse")) {
      if(!clickedIds.includes(currentId) && currentId !== hoveredId)
        return "#cacbcb";
      if(mode === "analyse-a-p") {
        if(type === "Principle")
          return colors['Label'][type];
        else
          return colors['Wave'][type];
      }
      else if(mode === "analyse-a-pe") {
        if(type === "Perspective")
          return colors['Label'][type];
        else
          return colors['Wave'][type];
      }
      else if(mode === "analyse-a-d") {
        if(type === "Dimension")
          return colors['Label'][type];
        else
          return colors['Wave'][type];
      }
      return colors['Label'][type];
  } else 
    return colors['Label'][type];
}

const getStroke = (clickedIds, hoveredId, currentId, mode, colors, type) => {
  if(clickedIds.includes(currentId)) 
    if(mode === "get-inspired" || mode === "get-inspired-search" || mode === "get-started" || mode === "get-started-search")
      return colors['Selection'];
  if(mode.startsWith("analyse")) {
    if(!clickedIds.includes(currentId) && hoveredId !== currentId)
      return '#cacbcb';
    return colors['Wave'][type];
  }
  else
      return 'none';
};

const isFlipped = (label) => {
  const flippedTexts = ['P2', 'P3', 'P4', 'P5', 'Pe3', 'Pe4', 'Pe5', 'D4', 'D5', 'D6', 'D7'];

  if(flippedTexts.includes(label)) 
    return false;
  return true;
};

const getText = (mode, type, label, code, index) => {
  // Intro
  if (mode === "intro-0" || mode === "intro-1" || mode === "intro-2" || mode === "intro-3") 
    return "";
  else if (mode === "intro-4" || mode === "intro-5") {
    if(type !== "Principle")
        return "";
  }
  else if (mode === "intro-6" || mode === "intro-7") {
    if(type === "Dimension") {
      return "";
    }
  }
  if(bigLabels.includes(code)) {
    let firstIndex = label.indexOf(' ');
    let secondIndex = label.indexOf(' ', firstIndex + 1);
    let firstPart, secondPart;

    firstPart = label.substring(0, firstIndex); // "a"

    if (firstPart.length > 6) {
        // Case 1: Only one space ("a b")
        firstPart = label.substring(0, firstIndex); // "a"
        secondPart = label.substring(firstIndex + 1); // "b"
    } else {
        // Case 2: Two spaces ("a b c")
        firstPart = label.substring(0, secondIndex); // "a b"
        secondPart = label.substring(secondIndex + 1); // "c"
    }

    if(index === 0)
      return firstPart;
    else
      return secondPart;
  }
  return label;
};

function getLabelWidth(label) {
   // Count the number of "I" characters in the label
   const countI = label.split('I').length - 1;
   const remainingLetters = label.length-countI;

   return remainingLetters*1 + countI*0.5;
}

function convertLabel(label) {
  // Define a mapping of prefixes to their corresponding full names
  const prefixMap = {
      "D": "Dimension",
      "Pe": "Perspective",
      "P": "Principle"
  };  

  // Use a regular expression to capture the prefix and the number
  const regex = /^([A-Za-z]+)(\d+)$/;
  const match = label.match(regex);

  if (match) {
      const prefix = match[1];
      const number = match[2];

      // Find the corresponding full name for the prefix
      const fullName = prefixMap[prefix];

      if (fullName) {
          return `${fullName} ${number}`;
      }
  }

  // If the label doesn't match the expected pattern, return it unchanged
  return label;
}

function getCorrespondingConcepts(concepts, code) {
  // Extract the number from the given tag (e.g. P1 -> 1, P2 -> 2)
  const codeNumber = code.slice(1);

  // Filter the array by matching the number in the `#code` (e.g., C1.a, C1.b... for P1)
  return concepts.filter(c => c.Code.startsWith(`C${codeNumber}.`));
}


export default OLCompass;
