/**
 * Get a list of current subscriptions.
 *
 * @param  {Object}   options  Optional options object.
 * @param  {Function} callback Called when the request is complete.
 */
PushBullet.prototype.subscriptions = function subscriptions(options, callback) {
    var self = this;

    if (!callback) {
        callback = options;
        options = {
            active: true
        };
    }

    if (options.active === undefined) {
        options.active = true;
    }

    self.getList(PushBullet.SUBS_END_POINT, options, callback);
};

/**
 * Subscribe to a channel.
 *
 * @param {String}   channelTag The tag of the channel to subscribe to.
 * @param {Function} callback   Called when the request is complete.
 */
PushBullet.prototype.subscribe = function subscribe(channelTag, callback) {
    var self = this;

    var options = {
        channel_tag: channelTag
    };
 
    self.request.post(PushBullet.SUBS_END_POINT, options).then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};

/**
 * Unsubscribe from a channel.
 *
 * @param {String}   subscriptionIden The iden of the subscription to ubsubscribe from.
 * @param {Function} callback         Called when the request is complete.
 */
PushBullet.prototype.unsubscribe = function unsubscribe(subscriptionIden, callback) {
    var self = this;
    self.request.post(PushBullet.SUBS_END_POINT + '/' + subscriptionIden).then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};

/**
 * Mute a subscription.
 *
 * @param {String}   subscriptionIden The iden of the subscription to mute.
 * @param {Function} callback         Called when the request is complete.
 */
PushBullet.prototype.muteSubscription = function muteSubscription(subscriptionIden, callback) {
    this.updateSubscription(subscriptionIden, {
        muted: true
    }, callback);
};

/**
 * Unmute subscription.
 *
 * @param {String}   subscriptionIden The iden of the subscription to unmute.
 * @param {Function} callback         Called when the request is complete.
 */
PushBullet.prototype.unmuteSubscription = function unmuteSubscription(subscriptionIden, callback) {
    this.updateSubscription(subscriptionIden, {
        muted: false
    }, callback);
};

/**
 * Update a subscription.
 *
 * @param {String}   subscriptionIden The iden of the subscription to ubsubscribe from.
 * @param {Object}   updates          Updates to make to subscription.
 * @param {Function} callback         Called when the request is complete.
 */
PushBullet.prototype.updateSubscription = function updateSubscription(subscriptionIden, updates, callback) {
    var self = this;

    if (!callback) {
        callback = updates;
    }

    var options = updates;

    self.request.post(PushBullet.SUBS_END_POINT + '/' + subscriptionIden, options).then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};

/**
 * Get information about a channel.
 *
 * @param {String}   channelTag The tag of the channel to get information about.
 * @param {Function} callback   Called when the request is complete.
 */
PushBullet.prototype.channelInfo = function channelInfo(channelTag, callback) {
    var self = this;

    var options = {
        tag: channelTag
    };

    self.request.get(PushBullet.CHANNELS_END_POINT, options).then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};