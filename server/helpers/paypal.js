const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: 'sandbox',
  client_id:'AYIwuQBHcB8tOM120Ofx4x-kwe4IcnuhpqDr0ZPCgnDSLfTwH7GCORpaUPnUBBo4gyf72R9i6E-mpH2q',
  client_secret:'EHiNLsbjaHrNDB9Wkfq95qGp-14dMvRgjDgdGVIZOSYpXPNuAWkQwmQf5A9g4VuFhVBvUS-aBMIFLqET',
});

module.exports = paypal;
