var STREAM_BASE = 'wss://stream.pushbullet.com/websocket';

/**
 * Event emitter for the Pushbullet streaming API.
 *
 * @param {String} apiKey PushBullet API key.
 */
function Stream(apiKey) {
    var self = this;

    self.apiKey = apiKey;

    self.events = {};
}

/**
 * Connect to the stream.
 */
Stream.prototype.connect = function connect() {
    self = this;

    this.client = new WebSocket(STREAM_BASE + '/' + this.apiKey);
    console.log(this.client);

    if (!this.client.onopen)
        this.client.onopen = function() {
            if (self.events['connect'])
                self.events['connect']();
        };

    if (!this.client.onclose)
        this.client.onclose = function() {
            if (self.events['close'])
                self.events['close']();
        };
    if (!this.client.onmessage)
        this.client.onmessage = function(response) {
            if (self.events['message'])
                self.events['message'](JSON.parse(response.data));
        };
};

/**
 * Disconnect from the stream.
 */
Stream.prototype.close = function close() {
  //  this.client.close();
};

/*
	Events
*/
Stream.prototype.on = function on(type, callback) {
    this.events[type] = callback;
};