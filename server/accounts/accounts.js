Accounts.onCreateUser(function(options, user) {

  //Normalize Facebook data
  if (user.services.facebook) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.firstName = user.services.facebook.first_name;
        options.profile.lastName = user.services.facebook.last_name;

        var credential = new Array;
        if (options.profile.credentials != undefined) {
          credential = options.profile.credentials;
        }
        credential.push({
          source: 'facebook',
          URL: user.services.facebook.link,
          validated: true
        });

        options.profile.credentials = credential;
        //TODO detect country automatically

        user.profile = options.profile;
    }
  }

  if (user.services.twitter) {

    if (options.profile) {

      options.profile.picture = user.services.twitter.profile_image_url;
      options.profile.firstName = user.services.twitter.screenName;

      var credential = new Array;
      if (options.profile.credentials != undefined) {
        credential = options.profile.credentials;
      }
      credential.push({
        source: 'twitter',
        URL: 'http://twitter.com/' + user.services.twitter.screenName,
        validated: true
      })

      options.profile.credentials = credential;

      user.profile = options.profile;

    }

  }

  return user;

});
