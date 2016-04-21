/**
 * PushBullet API abstraction module.
 *
 * @param {String} apiKey PushBullet API key.
 */
function PushBullet($http, apiKey) {
    if (!apiKey) {
        throw new Error('API Key is required');
    }

    this.apiKey = apiKey;

    $http.defaults.headers.common['Access-Token'] = apiKey;

    this.request = $http;
}

PushBullet.API_BASE = 'https://api.pushbullet.com/v2';
PushBullet.DEVICES_END_POINT = PushBullet.API_BASE + '/devices';
PushBullet.PUSH_END_POINT = PushBullet.API_BASE + '/pushes';
PushBullet.UPLOAD_END_POINT = PushBullet.API_BASE + '/upload-request';
PushBullet.USERS_END_POINT = PushBullet.API_BASE + '/users';
PushBullet.SUBS_END_POINT = PushBullet.API_BASE + '/subscriptions';
PushBullet.CHANNELS_END_POINT = PushBullet.API_BASE + '/channel-info';
PushBullet.CHATS_END_POINT = PushBullet.API_BASE + '/chats';
PushBullet.EPHEMERALS_END_POINT = PushBullet.API_BASE + '/ephemerals';

//module.exports = PushBullet;

/**
 * Return a new stream listener.
 *
 * @return {Stream} Stream listener.
 */
PushBullet.prototype.stream = function stream() {
    return new Stream(this.apiKey);
};

/**
 * Performs a GET request to an end point.
 *
 * Options passed are added to the end point as a query string.
 *
 * @param  {String}   endPoint URL to send GET request to.
 * @param  {Object}   options  Key/value options used as query string parameters.
 * @param  {Function} callback Called when the request is complete.
 */
PushBullet.prototype.getList = function getList(endPoint, options, callback) {
    var self = this;

    if (!callback) {
        callback = options;
        options = {};
    }

    var parameters = {};

    var optionKeys = Object.keys(options);
    if (optionKeys.length > 0) {

        parameters.params = {};

        optionKeys.forEach(function(key) {
            parameters.params[key] = options[key];
        });
    }

    self.request.get(endPoint, parameters).then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};

/**
 * Handle the API request responses.
 *
 * If there is a request error or the response code is not 200
 * an error will be passed to the callback.
 *
 * For a successful request the parsed JSON will be passed to the callback.
 *
 * @param  {Error}      error    Request error.
 * @param  {Response}   response Response object.
 * @param  {String}     body     Response body.
 * @param  {Function} callback   Callback for when the request is complete.
 */
PushBullet.prototype.handleResponse = function handleResponse(response, callback) {

    if (typeof callback === 'function') {
        callback(null, response.data);
    }
};


/**
 * Handle errors or error responses.
 *
 * @param  {Error}      error    Request error.
 * @param  {Response}   response Response object.
 * @param  {String}     body     Response body.
 * @param  {Function} callback   Callback for when the request is complete.
 */
PushBullet.prototype.handleError = function handleError(response, callback) {

    if (response.status !== 200) {
        if (typeof callback === 'function') {
            if (response.data.error && response.data.error.message) {
                callback(new Error(response.data.error.message));
            } else {
                callback(new Error(response.status));
            }
        }
        return;
    }

    if (typeof callback === 'function') {
        callback();
    }
};
