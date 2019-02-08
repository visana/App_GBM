var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    
	bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
	onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
// SETUP PUSH
document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("06185201-a4d9-4967-914a-a2f8fea40a56")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);