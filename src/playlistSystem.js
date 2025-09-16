import React from "react";
import {getAllPlaylistsFromDB, addPlaylistToDB, createBlobUrlsForSong, addSongWithFileToDB, removeSongFromPlaylist, deletePlaylistFromDB, updatePlaylistDetails } from "./indexedDB"
export function usePlaylistSystem(defaultSongs = []) {
    const [playlists, setPlaylists] = React.useState([]);
    const [currentPlaylistId, setCurrentPlaylistId] = React.useState(null);
    const [currentPlaylist, setCurrentPlaylist] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    
    // Load playlists from IndexedDB when component mounts
    React.useEffect(() => {
      const loadPlaylists = async () => {
        try {
          setIsLoading(true);
          let loadedPlaylists = await getAllPlaylistsFromDB();
          
          // If no playlists exist in DB, create a default one with default songs
          if (loadedPlaylists.length === 0) {
            const defaultPlaylist = await addPlaylistToDB("My Library", defaultSongs);
            loadedPlaylists = [defaultPlaylist];
          }
          
          // Process any blob data in the loaded playlists
          const processedPlaylists = loadedPlaylists.map(playlist => {
            return {
              ...playlist,
              playlistSongs: playlist.playlistSongs.map(song => createBlobUrlsForSong(song))
            };
          });
          
          setPlaylists(processedPlaylists);
          setCurrentPlaylistId(processedPlaylists[0].id);
          setCurrentPlaylist(processedPlaylists[0]);
        } catch (error) {
          console.error("Failed to load playlists:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadPlaylists();
    }, [defaultSongs]);
    
    // Update current playlist when playlists or currentPlaylistId changes
    React.useEffect(() => {
      const selected = playlists.find(p => p.id === currentPlaylistId);
      if (selected) {
        setCurrentPlaylist(selected);
      } else if (playlists.length > 0) {
        // If current playlist is not found (perhaps deleted), select the first one
        setCurrentPlaylistId(playlists[0].id);
        setCurrentPlaylist(playlists[0]);
      }
    }, [playlists, currentPlaylistId]);
    
    // Create a new playlist
    const createPlaylist = async (name) => {
      try {
        const newPlaylist = await addPlaylistToDB(name);
        setPlaylists(prev => [...prev, newPlaylist]);
        return newPlaylist;
      } catch (error) {
        console.error("Failed to create playlist:", error);
        throw error;
      }
    };
    
    // Add a song (with file processing)
    const addSong = async (playlistId, { file, title, author, cover }) => {
      try {
        const { updatedPlaylist, song } = await addSongWithFileToDB({
          playlistId,
          file,
          title,
          author,
          cover
        });
        
        setPlaylists(prev => 
          prev.map(playlist => 
            playlist.id === playlistId ? {
              ...updatedPlaylist,
              playlistSongs: [...updatedPlaylist.playlistSongs.slice(0, -1), song]
            } : playlist
          )
        );
        
        return song;
      } catch (error) {
        console.error("Failed to add song:", error);
        throw error;
      }
    };
    
    // Remove a song from its playlist
    const removeSong = async (playlistId, songIndex) => {
      try {
        const updatedPlaylist = await removeSongFromPlaylist(playlistId, songIndex);
        setPlaylists(prev => 
          prev.map(playlist => 
            playlist.id === playlistId ? updatedPlaylist : playlist
          )
        );
        return updatedPlaylist;
      } catch (error) {
        console.error("Failed to remove song:", error);
        throw error;
      }
    };
    
    // Delete a playlist
    const deletePlaylist = async (playlistId) => {
      // Don't allow deleting the last playlist
      if (playlists.length <= 1) {
        throw new Error("Cannot delete the only playlist. At least one playlist must exist.");
      }
      
      try {
        await deletePlaylistFromDB(playlistId);
        
        setPlaylists(prev => prev.filter(p => p.id !== playlistId));
        
        // If we're deleting the current playlist, switch to another one
        if (currentPlaylistId === playlistId) {
          const remainingPlaylists = playlists.filter(p => p.id !== playlistId);
          setCurrentPlaylistId(remainingPlaylists[0]?.id || null);
        }
      } catch (error) {
        console.error("Failed to delete playlist:", error);
        throw error;
      }
    };
    
    // Rename a playlist
    const renamePlaylist = async (playlistId, newName) => {
      try {
        const updatedPlaylist = await updatePlaylistDetails(playlistId, newName);
        setPlaylists(prev => 
          prev.map(playlist => 
            playlist.id === playlistId ? updatedPlaylist : playlist
          )
        );
        return updatedPlaylist;
      } catch (error) {
        console.error("Failed to rename playlist:", error);
        throw error;
      }
    };
    
    // Return all the necessary state and functions
    return {
      playlists,
      currentPlaylistId,
      setCurrentPlaylistId,
      currentPlaylist,
      isLoading,
      createPlaylist,
      addSong,
      removeSong,
      deletePlaylist,
      renamePlaylist
    };
  }