/*jshint asi: true undef: true es5: true node: true devel: true
         forin: true latedef: false supernew: true */
/*global define: true */

/*
  The MIT License (MIT)

  Copyright (c) 2016 Jan Cássio

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**
 * Dispatcher
 * Author: Jan Cassio <hey@jancassio.com>
 *
 * A small event dispacher helper for general usage.
 */
module.exports = (function(){
  'use strict';

  function Dispatcher () {}

  /**
  * Static variables initialisation.
  */

  /** Version */
  Dispatcher.version = '1.0.0'

  /** Events store */
  Dispatcher.events = {}


  /**
   * Emit an event that can be handled by subscribed handlers.
   *
   * @param event    An event type identifier.
   * @param payload  An object that can be sent to event handlers and.
   *
   * @return  A boolean flag that notify if the event was sent to any handler (`true`) or not (`false`).
   *
   */
  Dispatcher.emit = function (event, payload) {
    var listeners = this.events[ event ];
    if (listeners) {
      for (var i = listeners.length - 1; i >= 0; i--) {
        var listener = listeners[ i ];
        listener.callback.call(listener.scope, {type: event, payload: payload})
      };
      return true;
    }
    return false;
  }

  /**
   * Subscribe a callback for given event type.
   *
   * @param event      The type of event to be handled.
   * @param callback   The function that receive event when the event be emited.
   * @param scope      The `this` scope inside callback (not required).
   *
   */
  Dispatcher.on = function (event, callback, scope) {
    var listeners = this.events[ event ];
    if ( !listeners ) {
      listeners = []
    }

    listeners[ listeners.length ] = {callback: callback, scope: scope || this}
    this.events[ event ] = listeners;
  }

  /**
   * Unsubscribe a event previously added.
   *
   * @param event     The event type associated to a callback to be unsubscribed.
   * @param callback  The callback to be unsubscribed.
   *
   */
  Dispatcher.off = function (event, callback) {
    var listeners = this.events[ event ];

    if ( listeners ) {
      for (var i = listeners.length - 1; i >= 0; i--) {
        var listener = listeners[i]

        if( listener.callback === callback ) {
          listeners.splice(i, 1)
          break;
        }
      }

      if( !listeners.length ) {
        this.events[ event ] = undefined;
      }
    }
  }

  return Dispatcher;

})()
