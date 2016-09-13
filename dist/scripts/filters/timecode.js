(function() {
    function timecode() {
        return function(seconds) {
       
            var timer = buzz.toTimer(seconds);
            
            return timer;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();


/*Optional: The Buzz library has a method named toTimer() that formats seconds in an easy to read timer like "00:00", which is what we've just accomplished with the timecode filter. Read the documentation for the toTimer() method and rework the timecode filter logic to use the Buzz method instead of your custom code.*/