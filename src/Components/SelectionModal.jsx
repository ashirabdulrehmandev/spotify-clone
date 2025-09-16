import React, { useState } from "react";
import "./SelectionModal.scss";
import { useEffect } from "react";

function AddSongModal({ isOpen, onClose, onAddSong }) {
  const [songName, setSongName] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [coverArt, setCoverArt] = useState(null);
  const [animationClass, setAnimationClass] = useState('');
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready before animation starts
      setTimeout(() => {
        setAnimationClass('modal-visible');
      }, 10);
    } else {
      setAnimationClass('');
    }
  }, [isOpen]);
  if (!isOpen) return null;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!audioFile) {
      alert("Please select an audio file.");
      return;
    }
    onAddSong({
      file: audioFile,
      artist,
      album,
      cover: coverArt,
      title: songName,
    });
    // Reset form and close
    setAudioFile(null);
    setArtist("");
    setAlbum("");
    setCoverArt(null);
    setSongName("");
    onClose();
  };

  return (
    <div className={`modal-overlay ${animationClass}`}>
      <div className={`modal-content ${animationClass}`}>
        <h2>Add New Song</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Song Name:
            <input
              type="text"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              required
              placeholder="Song title "
            />
          </label>
          <label>
            Audio File:
            <input
              type="file"
              accept="audio/*"
              required
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
          </label>
          <label>
            Artist Name:
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artist Name"
            />
          </label>
          <label>
            Album Name:
            <input
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              placeholder="Album Name"
            />
          </label>
          <label>
            Cover Art (optional):
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverArt(e.target.files[0])}
            />
          </label>
          
          <div className="modal-buttons">
            <button type="submit">Add Song</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSongModal;
