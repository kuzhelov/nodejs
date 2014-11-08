var eventsCount = 10;

var source1 = getEvents(eventsCount);
var source2 = new(require("./event_source").EventSource)(eventsCount);

testEventSource(source1);
testEventSource(source2);

function testEventSource(eventSource) {
    eventSource.on(
        'start',
        function() {
            console.log('has started');
        });

    eventSource.on(
        'data',
        function(item) {
            console.log('data item has arrived: ' + item);
        });

    eventSource.on(
        'end',
        function() {
            console.log('all data has been acquired');
        });
}

function getEvents(eventsCount) {
    var eventEmitter = new (require("events").EventEmitter)();

    process.nextTick(
        function() {
            eventEmitter.emit('start');

            var count = 0;
            var timer = setInterval(
                function() {
                    count++;
                    eventEmitter.emit('data', count);

                    if (count >= eventsCount) {
                        eventEmitter.emit('end');
                        clearInterval(timer);
                    }
                },
                100);
        });
        
    return eventEmitter;
}
