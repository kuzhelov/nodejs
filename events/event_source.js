var EventEmitter = require('events').EventEmitter;

function EventSource(eventsCount) {
    EventEmitter.call(this);
    
    var self = this;
    
    process.nextTick(
        function() {
            self.emit('start');
            
            var count = 0;
            var timer = setInterval(
                function() {
                    count++;
                    self.emit('data', count);
                    
                    if (count >= eventsCount) 
                    {
                        self.emit('end');
                        clearInterval(timer);
                    }
                },
                100);
        });
    
    return this;
}

EventSource.prototype = Object.create(EventEmitter.prototype);

module.exports.EventSource = EventSource;