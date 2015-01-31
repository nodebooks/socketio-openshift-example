# socketio-openshift-example
An example how to run socket.io with node.js in OpenShift and locally

OpenShift websocket support demystified for application developers

## Run in OpenShift

This utilizes the [express.js](http://expressjs.com/) and [socket.io](http://socket.io/) libraries. Create and start a new app directly from this repo:

`rhc app create wsexample nodejs-0.10 --from-code https://github.com/nodebooks/socketio-openshift-example.git`

Wait a moment and open your OpenShift app in your browser. See the example app running at [http://wsexample-nodebooks.rhcloud.com](http://wsexample-nodebooks.rhcloud.com)

## Run locally

```
git clone https://github.com/nodebooks/socketio-openshift-example.git wsexample`
cd wsexample
npm install
node server.js # or nodejs server.js in some Ubuntu releases
```
