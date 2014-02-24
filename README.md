Microvent [![Build Status](https://travis-ci.org/rstone770/Microvent.png?branch=master)](https://travis-ci.org/rstone770/Microvent)
=========

A teeny tiny polka dotted event driver. This is a no nonsense event driver that provides some nice features in a tiny package. Plays nicely as with commonjs, amd and global.

##Install
As easy as 
```
  bower install microvent --save
```

##Build
If youd like to hack around on the library you can build your creation by simply running the command below.
```
grunt
```

```
npm install && grunt build
```
Should be all that's required to build this project.

##Features
This is a simple observer pattern without the frill of having the frills of having to include bigger libraries such as jquery or dojo for this simple pattern. 

* You can add as many events, and listeners of those events as you want.
* Microvent supports your standard on, off, once, trigger and unbind methods.
* Trigger allows passing of extra data to the listeners.
* Its wrapped up pretty like using UMD allowing global or require access.
* Quick extensions.
* Pretty standard stuff.

##Use
When loaded on a page the object appears as Microvent. This is the factory object(it does not use new). Creating an instance is simple though.
```
var microvent = Microvent.construct();
```
You can now bind a event name with a listener
````
var microvent = Microvent.construct();

microvent
    .on('event', function(event, data) {})
    .on('event', function(event) {});
```
Triggering events is straight forward.
```
microvent.trigger('event', 'EXTRA DATA!');
```
Once triggered, the event will call all listeners assigned to the named event. A stop can be used to stop propagation.
```
microvent
    .on('event', function(event) {event.stop()})
    .on('event', function() {/** wont be called **/});
    .trigger('event');
```
As you may have noticed the listener is passed a 2 parameters. The event object that describes the current event and its source and any extra data.

Besides the standard Microvent can be easily extended using the extend method.
```
Macrovent = Microvent.extend({
    someMethod: function() {}
});
```
or
```
Macrovent = Macrovent.extend(};
Macrovent.someMethod = function();
```
It can be used just the same way the Microvent was used.
```
var macrovent = Macrovent.construct();
var MegaMacrovent4000 = Macrovent.extend();
/** etc **/
```
If you overwrite the create method, make sure to apply the super create to self.
```
var MegaMacrovent4000 = Macrovent.extend({
   construct: function() {
      var megaMacrovent4000 = this.extend({
          id: Date.now()
      });

      return Macrovent.construct.apply(megaMacrovent4000, [].slice.apply(arguments); 
   };
});
```
## Doc
To generate docs just use the following.
```
grunt jsdoc
```
or
```
grunt build
```