// import { useState, useEffect } from "react";
import "./Feed.scss";
import animation from "../assets/animation.gif";

function Feed({
  // dominantColor,
  filteredPlaylist,
  onCardClick,
  songIndex,
  isPlaying,
}) {
  // const [color, setColor] = useState(`rgb(255, 255, 255)`); // default white
  // const [showAnimation, setShowAnimation] = useState(false); // default white
  // const handleClickFeed = (index)=>{
  //   console.log(index)
  //   // setPausePlayThroughFeed()
  // }
  // const PausePlayIcon = ({ isPlaying }) => {
  //   if (isPlaying) {
  //     console.log("Playing: showing pause icon");
  //     return (
  //       <svg
  //         viewBox="0 0 16 16"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path d="M7 1H2V15H7V1Z" fill="#000000"></path>
  //         <path d="M14 1H9V15H14V1Z" fill="#000000"></path>
  //       </svg>
  //     );
  //   } else {
  //     console.log("Paused: showing play icon");
  //     return (
  //       <svg
  //         viewBox="-0.5 0 8 8"
  //         version="1.1"
  //         xmlns="http://www.w3.org/2000/svg"
  //         fill="#000000"
  //       >
  //         <polygon points="371 3605 371 3613 378 3609"></polygon>
  //       </svg>
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (dominantColor && dominantColor.length === 3) {
  //     // Delay setting color by 300ms for smooth transition
  //     const timer = setTimeout(() => {
  //       setColor(
  //         `linear-gradient(180deg, rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 1) 0%, rgba(18, 18, 18, 1) 100%)`
  //       );
  //     }, 300);

  //     // Cleanup timeout if component unmounts or dominantColor changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [dominantColor]);

  // Handle case when filteredPlaylist is undefined or empty
  const safeFilteredPlaylist = Array.isArray(filteredPlaylist)
    ? filteredPlaylist
    : [];

  return (
    <>
      <div
        className="feedMain"
        style={{
        
        }}
      >
        {safeFilteredPlaylist.length > 0 ? (
          safeFilteredPlaylist.map((song, index) => {
            // Add null check for song
            if (!song) return null;

            return (
              <div className="card" key={`song-${index}`}>
                <div className="top">
                  <img
                    src={song.cover}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: "0.5rem",
                    }}
                  />
                  {/* <div className="svgContainer"> */}
                    {songIndex === index && isPlaying && (
                      <div className="playing-indicator">
                        <img
                          src={animation}
                          alt="Now Playing"
                          className="playing-animation"
                        />
                      </div>
                    )}
                  {/* </div> */}
                    {
                      <svg
                        id="pause"
                        onClick={() => {
                          onCardClick(index);
                        }}
                        className="svgContainer"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{ cursor: "pointer" }} // optional, to indicate clickable
                      >
                        <path
                          d={
                            songIndex===index&&isPlaying
                              ? "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9 9V15H11V9H9ZM13 9V15H15V9H13Z"
                              : "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM10.6219 8.41459C10.5562 8.37078 10.479 8.34741 10.4 8.34741C10.1791 8.34741 10 8.52649 10 8.74741V15.2526C10 15.3316 10.0234 15.4088 10.0672 15.4745C10.1897 15.6583 10.4381 15.708 10.6219 15.5854L15.5008 12.3328C15.5447 12.3035 15.5824 12.2658 15.6117 12.2219C15.7343 12.0381 15.6846 11.7897 15.5008 11.6672L10.6219 8.41459Z"
                          }
                        />
                      </svg>
                    }
                </div>

                <div className="bottom">
                  <h1>{song.title || "Untitled"}</h1>
                  <span>{song.author || "Unknown Artist"}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>No songs found. Try a different search.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Feed;
