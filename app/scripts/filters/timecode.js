(function() {
    function timecode() {
        return function(seconds) {
            /*var seconds = Number.parseFloat(seconds);
            
            if (Number.isNaN(seconds)) {
                return '-:--';
            }
            
            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;
 
            var output = minutes + ':';
 
            if (remainingSeconds < 10) {
                 output += '0';   
            }
 
            output += remainingSeconds;*/
            var timer = buzz.toTimer(this.getTime());
            
            return output;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();


/*Optional: The Buzz library has a method named toTimer() that formats seconds in an easy to read timer like "00:00", which is what we've just accomplished with the timecode filter. Read the documentation for the toTimer() method and rework the timecode filter logic to use the Buzz method instead of your custom code.*/