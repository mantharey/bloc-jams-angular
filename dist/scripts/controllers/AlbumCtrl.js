(function() {
    function AlbumCtrl(Fixtures, SongPlayer, $scope) {
        this.album = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        
        
//rootscope refactor        
        $scope.$watch("album.songPlayer.currentSong", function(){
            SongPlayer.getBuzzObject().bind('timeupdate', function() {
                $scope.$apply();
            });
        })

    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', '$scope', AlbumCtrl]);
})();