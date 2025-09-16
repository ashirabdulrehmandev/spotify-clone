import React, { useState } from "react";
import AddSongModal from "./SelectionModal";
import listItemPic from "../assets/profile-pic.png";
import "./library.scss";

function Library({ onAddSong }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    // For smooth exit animation, we can delay the actual state change
    document.querySelector('.modal-overlay').classList.remove('modal-visible');
    document.querySelector('.modal-content').classList.remove('modal-visible');
    
    // Wait for animation to finish before closing
    setTimeout(() => {
      setModalOpen(false);
    }, 300);
  };
  return (
    <>
      <div id="library">
        
                <div id="Group1">
                  <div id="yourLibrary">
                    <div id="group1">
                      <svg
                        id="library-icon"
                        fill="currentColor"
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9640-icon"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                      </svg>
                      <span>Your Library</span>
                    </div>
                    <div id="group2">
                    <svg id="add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    <svg id="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
                    </div>
                  </div>
                  <div id="group3">
                      <span>sdasd</span>
                      <span id="tag1">sadasd</span>
                  </div>
                  <div id="group4">
                  <svg id="icon-g1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                  <div id="icon-g2">
                  <span>Recents</span>
                  <svg id="search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
        
                  </div>
                  </div>
                </div>
                <div id="Group2">
                  <div id="library-item">
                    <img src= {listItemPic} alt="" />
                    <div id="sub-left">
                      <div id="span1">Liked Songs</div>
                      <div id="sub-down">
                      <svg id="pin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69L22.3126 10.1753Z"></path></svg>
                      <div id="group">
                      <div id="span1">Playlist</div>
                      <div id="dot"></div>
                      <div id="span2">70 songs</div>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div id="library-item">
                    <img src= {listItemPic} alt="" />
                    <div id="sub-left">
                      <div id="span1">Liked Songs</div>
                      <div id="sub-down">
                      <svg id="pin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69L22.3126 10.1753Z"></path></svg>
                      <div id="group">
                      <div id="span1">Playlist</div>
                      <div id="dot"></div>
                      <div id="span2">70 songs</div>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div id="library-item">
                    <img src= {listItemPic} alt="" />
                    <div id="sub-left">
                      <div id="span1">Liked Songs</div>
                      <div id="sub-down">
                      <svg id="pin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69L22.3126 10.1753Z"></path></svg>
                      <div id="group">
                      <div id="span1">Playlist</div>
                      <div id="dot"></div>
                      <div id="span2">70 songs</div>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div id="library-item">
                    <img src= {listItemPic} alt="" />
                    <div id="sub-left">
                      <div id="span1">Liked Songs</div>
                      <div id="sub-down">
                      <svg id="pin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69L22.3126 10.1753Z"></path></svg>
                      <div id="group">
                      <div id="span1">Playlist</div>
                      <div id="dot"></div>
                      <div id="span2">70 songs</div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
        {/* Add Song Button at bottom */}
        <div style={{ padding: "10px", textAlign: "center" }}>
          <button onClick={() => setModalOpen(true)} style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#1db954",
            color: "white",
          }}>
            + Add New Song
          </button>
        </div>
      </div>

      {/* Add Song Modal */}
      <AddSongModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onAddSong={onAddSong}
      />
    </>
  );
}

export default Library;
