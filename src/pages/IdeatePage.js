import React from 'react';
import '../styles/IdeatePage.css';
import OLCompass from '../components/OLCompass';
//import PostIt from '../components/PostIt';
import Menu from '../components/Menu';

// const IdeatePage = ({ colors }) => {
//   const [postItPositions, setPostItPositions] = useState([]); // For PostIts created by clicking outside
//   const [initialState, setInitialState] = useState(true); // Initial state of the ideation page
//   const [initialPostIts, setInitialPostIts] = useState([{ id: 0 }]); // Tracks all initial PostIts created

//   const toggleInitialState = () => {
//     setInitialState(false);
//   };

//   const resetState = useCallback(() => {
//     setPostItPositions([]);
//     setInitialState(true);
//     setInitialPostIts([{ id: 0 }]); // Reset initial PostIts
//   }, []);

//   const handleKeyDown = useCallback((e) => {
//     if (e.key === 'Escape') {
//       resetState();
//     }
//   }, [resetState]);

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [handleKeyDown]);

//   // Handle click outside compass to create new PostIt
//   const handleClickOutside = (coords) => {
//     setPostItPositions([...postItPositions, { x: coords.x + 5, y: coords.y - 55 }]);
//   };

//   // Handle dragging the initial PostIt to trigger new PostIt creation
//   const handlePostItDragStart = (id) => {
//     // Check if the dragged PostIt is the initial one and create a new initial PostIt
//     if (id === initialPostIts[initialPostIts.length - 1].id) {
//       const newId = id + 1;
//       setInitialPostIts([...initialPostIts, { id: newId }]);
//     }
//   };

//   return (
//     <div>
//       {!initialState && (
//         <>
//           <div className="circle-container">
//             <div className="circle circle-left"></div>
//             <div className="content content-left">
//               <h1>theory-driven ideation</h1>
//               <p>select the compass elements you want to tackle and come up with an idea to do so</p>
//             </div>

//             <div className="circle circle-right"></div>
//             <div className="content content-right">
//               <h1>intuition-driven ideation</h1>
//               <p>note down your idea and trace it back to the compass elements</p>
//             </div>
//           </div>

//           {/* Render all initial PostIts */}
//           {initialPostIts.map((postIt) => (
//             <PostIt
//               key={postIt.id}
//               isInitialPostIt
//               onDragStart={() => handlePostItDragStart(postIt.id)}
//             />
//           ))}

//           {/* Render PostIts created by clicking outside the compass */}
//           {postItPositions.map((position, index) => (
//             <PostIt key={index} position={position} />
//           ))}

//           <OLCompass colors={colors} action="ideate" onClickOutside={handleClickOutside} />
//         </>
//       )}
//       {initialState && (
//         <>
//           <OLCompass colors={colors} action="default-left" />
//           <div className="text-container">
//             <p className='question'>
//               What's it for?
//             </p>
//             <p className='headline'>
//               Come up with new ideas for pursuing OL
//             </p>
//             <p className='text'>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//             </p>
//             <button onClick={toggleInitialState} className='start-new-button'>
//               Start New Ideation Session
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

const IdeatePage = ({colors}) => {
  return (
    <div>
      <OLCompass colors={colors} action="default-left" />
        <div className='text-container'>
            <p className='question'>
              What's it for?
            </p>
            <p className='headline'>
              Come up with new ideas for pursuing OL
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="instruction-container">
              <svg 
                className='plus-icon'
                fill="currentcolor" 
                stroke="currentcolor"
                viewBox="0 0 512 512" 
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
              >
              <path d="M213.333333,1.42108547e-14 L213.333,170.666 L384,170.666667 L384,213.333333 L213.333,213.333 L213.333333,384 L170.666667,384 L170.666,213.333 L1.42108547e-14,213.333333 L1.42108547e-14,170.666667 L170.666,170.666 L170.666667,1.42108547e-14 L213.333333,1.42108547e-14 Z"></path>
              </svg>
              <button className='start-new-button'>
              Start New Ideation Session
              </button>
            </div>
            <div className="not-available-container">
              <svg 
                className="lock-icon"
                fill="currentcolor"
                xmlns="http://www.w3.org/2000/svg"  
                viewBox="0 0 64 64">
                <path d="M 32 9 C 24.832 9 19 14.832 19 22 L 19 27.347656 C 16.670659 28.171862 15 30.388126 15 33 L 15 49 C 15 52.314 17.686 55 21 55 L 43 55 C 46.314 55 49 52.314 49 49 L 49 33 C 49 30.388126 47.329341 28.171862 45 27.347656 L 45 22 C 45 14.832 39.168 9 32 9 z M 32 13 C 36.963 13 41 17.038 41 22 L 41 27 L 23 27 L 23 22 C 23 17.038 27.037 13 32 13 z"/>
              </svg>
              <p className='not-available'>
                Not Available Yet
              </p>
            </div>
        </div>
        <Menu />
    </div>
  );
};

export default IdeatePage;
