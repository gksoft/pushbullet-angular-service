/**
 * Get a list of current chats.
 *
 * @param  {Object}   options  Optional options object.
 * @param  {Function} callback Called when the request is complete.
 */
PushBullet.prototype.chats = function chats(options, callback) {
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

    self.getList(PushBullet.CHATS_END_POINT, options, callback);
};

/**
 * Create a new chat.
 *
 * @param {String}   channelTag Email of the person to create the chat with.
 * @param {Function} callback   Called when the request is complete.
 */
PushBullet.prototype.createChat = function createChat(email, callback) {
    var self = this;

    var options = {
        email: email
    };

    self.request.post(PushBullet.CHATS_END_POINT, options).then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};

/**
 * Mute a chat.
 *
 * @param {String}   chatIden The iden of the chat to mute.
 * @param {Function} callback Called when the request is complete.
 */
PushBullet.prototype.muteChat = function muteChat(chatIden, callback) {
    this.updateChat(chatIden, {
        muted: true
    }, callback);
};

/**
 * Unmute chat.
 *
 * @param {String}   chatIden The iden of the chat to unmute.
 * @param {Function} callback Called when the request is complete.
 */
PushBullet.prototype.unmuteChat = function unmuteChat(chatIden, callback) {
    this.updateChat(chatIden, {
        muted: false
    }, callback);
};

/**
 * Update a chat.
 *
 * @param {String}   chatIden The iden of the chat to ubsubscribe from.
 * @param {Object}   updates  Updates to make to chat.
 * @param {Function} callback Called when the request is complete.
 */
PushBullet.prototype.updateChat = function updateChat(chatIden, updates, callback) {
    var self = this;

    if (!callback) {
        callback = updates;
    }

    var options = updates;

    self.request.post(PushBullet.CHATS_END_POINT + '/' + chatIden, options).then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};

/**
 * Delete a chat.
 *
 * @param {String}   chatIden The iden of the chat to delete.
 * @param {Function} callback Called when the request is complete.
 */
PushBullet.prototype.deleteChat = function deleteChat(chatIden, callback) {
    var self = this;
    self.request.post(PushBullet.CHATS_END_POINT + '/' + chatIden).then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};