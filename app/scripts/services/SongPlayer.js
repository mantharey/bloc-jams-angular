(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};      
/**
* @desc Active song album
* @type {Object}
*/        
        var currentAlbum = Fixtures.getAlbum();
/**
* @desc Buzz object audio file
* @type {Object}
*/
        var currentBuzzObject = null;
/**
 * @function stopSong
 * @desc Stops currentBuzzObject
 * @param {Object} song
 */        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };   
        
        SongPlayer.getBuzzObject = function(){
            return currentBuzzObject;
        }
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true, 
                volume: SongPlayer.volume
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
            });
            
            SongPlayer.currentSong = song;
        };
/**
 * @function playSong
 * @desc Plays currentBuzzObject
 * @param {Object} song
 */        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };     
/**
 * @function getSongIndex
 * @desc Gets the index of the currently playing song
 * @param {Object} song
 * @returns song index
 */ 
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
/**
* @desc Active song object from list of songs
* @type {Object}
*/        
        SongPlayer.currentSong = null;
 /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
        SongPlayer.currentTime = null;
/**
 * @desc Current volume (0-100)
 * @type {Number}
 */
        SongPlayer.volume = null;
/**
 * @desc Method to play and stop songs
 * @param method
 */           
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
/**
 * @desc Method to pause songs
 * @param method
 */         
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
/**
 * @desc Method to skip backwards through songs
 * @param method
 */          
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

             if (currentSongIndex < 0) {
                 stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
/**
 * @desc Method to skip forwards through songs
 * @param method
 */    
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length-1) {
                 stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }

        };
/**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
/**
 * @function setVolume
 * @desc Method to set volume
 * @param {Number} 0-100
 */
        SongPlayer.setVolume = function(value) {
            SongPlayer.volume = value;
            currentBuzzObject.setVolume(SongPlayer.volume);
        };        
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();