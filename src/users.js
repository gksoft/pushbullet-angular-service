/**
 * Get information for the current user.
 *
 * @param  {Function} callback Callback for when the request is complete.
 */
PushBullet.prototype.me = function me(callback) {
	var self = this;
	self.request.get(PushBullet.USERS_END_POINT + '/me').then(function(response) {
        self.handleResponse(response, callback);
    }, function(response) {
        self.handleError(response);
    });
};
