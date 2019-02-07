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
    
	/* Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }*/
};
// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("d14e7a44-ab70-4fba-bef6-09010a66f0f8")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);