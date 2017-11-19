(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Lrc = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var LyricIDTag = function () {
    function LyricIDTag(k) {
        var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        classCallCheck(this, LyricIDTag);

        if (typeof k !== "string") {
            throw Error("[LyricIDTag] the type of param k is " + (typeof k === "undefined" ? "undefined" : _typeof(k)) + " , expected string.");
        }
        this.tagKey = k.toLowerCase();
        this.tagValue = v;
    }

    createClass(LyricIDTag, [{
        key: "toString",
        value: function toString() {
            return "[" + this.tagKey + ":" + this.tagValue + "]";
        }
    }]);
    return LyricIDTag;
}();

var LyricIDTagCollection = function () {
    function LyricIDTagCollection() {
        classCallCheck(this, LyricIDTagCollection);

        this._tags = [];
    }

    createClass(LyricIDTagCollection, [{
        key: "getTag",
        value: function getTag() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            return this._tags.filter(function (v) {
                return v.tagKey == key;
            })[0];
        }
    }, {
        key: "setTag",
        value: function setTag() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            return this._tags.push(new LyricIDTag(key, value));
        }
    }, {
        key: "each",
        value: function each(cb) {
            if (typeof cb === "function") {
                this._tags.forEach(cb);
            } else {
                throw TypeError("The type of cb is " + (typeof cb === "undefined" ? "undefined" : _typeof(cb)) + ", expected function.");
            }
        }
    }]);
    return LyricIDTagCollection;
}();

LyricIDTagCollection.TAG_ARTIST = "ar";
LyricIDTagCollection.TAG_ALBUM = "al";
LyricIDTagCollection.TAG_TITLE = "ti";
LyricIDTagCollection.TAG_AUTHOR = "au";
LyricIDTagCollection.TAG_LENGTH = "length";
LyricIDTagCollection.TAG_LRC_AUTHOR = "by";

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */

  !function (global) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    var inModule = 'object' === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }

    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    runtime.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    runtime.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    runtime.awrap = function (arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            resolve(result);
          }, reject);
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    runtime.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;

    function doneResult() {
      return { value: undefined, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop: function stop() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
  }(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  function () {
    return this;
  }() || Function("return this")());
});

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = function () {
  return this;
}() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

/**
 * @author kamilic
 * @name LyricParser
 */
// if these are 2 (or above) specific time string at one line..([aa:bb.cc]).
// eg [00:22:21][00:
var MULIT_TIME_MATCH_LENGTH = "[aa:bb.cc][aa:bb.cc]".length;
function parse(lyricText) {
    var lrcRegExp = /((\[(\d+:\d+\.\d+)][ \t]*)+)[ \t]*(.*)\s*?[\r\n$]*/g;
    return (/*#__PURE__*/regenerator.mark(function _callee() {
            var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, resultFromMulitTimeParser;

            return regenerator.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            result = lrcRegExp.exec(lyricText);

                        case 1:
                            if (!(result != null)) {
                                _context.next = 36;
                                break;
                            }

                            if (!(result[1].length >= MULIT_TIME_MATCH_LENGTH)) {
                                _context.next = 31;
                                break;
                            }

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 6;
                            _iterator = mulitTimeParser(result[1])[Symbol.iterator]();

                        case 8:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 15;
                                break;
                            }

                            resultFromMulitTimeParser = _step.value;
                            _context.next = 12;
                            return [resultFromMulitTimeParser, result[4]];

                        case 12:
                            _iteratorNormalCompletion = true;
                            _context.next = 8;
                            break;

                        case 15:
                            _context.next = 21;
                            break;

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context["catch"](6);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 21:
                            _context.prev = 21;
                            _context.prev = 22;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 24:
                            _context.prev = 24;

                            if (!_didIteratorError) {
                                _context.next = 27;
                                break;
                            }

                            throw _iteratorError;

                        case 27:
                            return _context.finish(24);

                        case 28:
                            return _context.finish(21);

                        case 29:
                            _context.next = 33;
                            break;

                        case 31:
                            _context.next = 33;
                            return [result[3], result[4] || ""];

                        case 33:
                            result = lrcRegExp.exec(lyricText);
                            _context.next = 1;
                            break;

                        case 36:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[6, 17, 21, 29], [22,, 24, 28]]);
        })()
    );
}

function parseTag(lyricText) {
    var tagParsingRegExp = /\[([a-zA-Z]+):[ \t]*(.*)]\s*?[\r\n$]*/g;
    return (/*#__PURE__*/regenerator.mark(function _callee2() {
            var result;
            return regenerator.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            result = tagParsingRegExp.exec(lyricText);

                        case 1:
                            if (!(result != null)) {
                                _context2.next = 7;
                                break;
                            }

                            _context2.next = 4;
                            return [result[1], result[2]];

                        case 4:
                            result = tagParsingRegExp.exec(lyricText);
                            _context2.next = 1;
                            break;

                        case 7:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        })()
    );
}

function mulitTimeParser(text) {
    var timeRegExp = /\[(\d+:\d+\.\d+)]/g;
    return (/*#__PURE__*/regenerator.mark(function _callee3() {
            var result;
            return regenerator.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            result = timeRegExp.exec(text);

                        case 1:
                            if (!result) {
                                _context3.next = 7;
                                break;
                            }

                            _context3.next = 4;
                            return result[1];

                        case 4:
                            result = timeRegExp.exec(text);
                            _context3.next = 1;
                            break;

                        case 7:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        })()
    );
}

var LyricParser = {
    parse: parse,
    parseTag: parseTag
};

/**
 * @author kamilic
 * @name LrcTime
 * @class
 * @description Representing a time of each phrase
 *              and providing some useful methods for lrc time manipulation.
 */

var LRC_TIME_REGEXP = /(\d+):(\d+)\.(\d+)/;

/**
 * @private
 * @desc turning minute to second.
 * */
function min2sec(mm) {
    return 60 * parseInt(mm);
}

// xx is hundredths of a second
function hundredths2Sec(xx) {
    return parseFloat((xx / 100).toFixed(2));
}
/**
 * @desc 5 -> 05
 *
 */
function numberFormatted(number) {
    if (number < 0) {
        throw Error("[numberFormatted] invalid input number");
    }
    return parseInt(number) >= 10 ? number.toString() : "0".concat(number.toString());
}

var LyricTime = function () {
    /**
     * @constructor
     * @desc The Line Time Tags are in the format [mm:ss.xx] where mm is minutes, ss is seconds and xx is hundredths of a second.
     * @param {String} lrcParsedString mm:ss:xx string
     * */
    function LyricTime(lrcParsedString) {
        classCallCheck(this, LyricTime);

        if (typeof lrcParsedString === "string") {
            var result = LRC_TIME_REGEXP.exec(lrcParsedString);
            if (!result) {
                throw Error("[LrcTime] Time parsing error.");
            } else {
                this.mm = parseInt(result[1]);
                this.ss = parseInt(result[2]);
                this.xx = parseInt(result[3]);

                this.mm += this.ss >= 60 ? Math.floor(this.ss / 60) : 0;

                this.ss = this.ss >= 60 ? this.ss % 60 : this.ss;
                this.ss += this.xx >= 100 ? Math.floor(this.xx / 100) : 0;

                this.xx = this.xx >= 100 ? this.xx % 100 : this.xx;
            }
        } else {
            throw Error("[LrcTime] Wrong lrcParsedString type, expected string but " + (typeof lrcParsedString === "undefined" ? "undefined" : _typeof(lrcParsedString)));
        }
    }

    createClass(LyricTime, [{
        key: "toString",
        value: function toString() {
            return "[" + numberFormatted(this.mm) + ":" + numberFormatted(this.ss) + "." + numberFormatted(this.xx) + "]";
        }
    }, {
        key: "getSecond",
        value: function getSecond() {
            return min2sec(this.mm) + parseInt(this.ss) + hundredths2Sec(this.xx);
        }
    }, {
        key: "getSecondInt",
        value: function getSecondInt() {
            return Math.round(this.getSecond());
        }
    }]);
    return LyricTime;
}();

LyricTime.getInstanceByTime = function (time) {
    var mm = Math.floor(time / 60);
    var ss = Math.floor(time % 60);
    var xx = Math.round(time % 1 * 100);
    return new LyricTime(mm + ":" + ss + "." + xx);
};

/**
 * @author kamilic
 * @name LyricPhrase
 * @desc element of Lrc
 */
var LyricPhrase = function () {
    /**
     * @constructor
     * @description is the part of Lyric.
     *              representing a single phrase of the Lyric.
     * @param { LyricTime } time
     * @param {String} content
     * */
    function LyricPhrase(time, content) {
        classCallCheck(this, LyricPhrase);

        if (!(time instanceof LyricTime)) {
            throw Error("[LyricPhrase] the parameter type of time is " + (typeof time === "undefined" ? "undefined" : _typeof(time)) + ", expected LyricTime.");
        }
        if (!(typeof content === "string")) {
            throw Error("[LyricPhrase] the parameter type of time is " + (typeof content === "undefined" ? "undefined" : _typeof(content)) + ", expected string.");
        }

        this.time = time;
        // a quick entrance for getting time.
        this.timeInSecond = time.getSecond();
        this.content = content;
    }
    /**
     * @method
     * @description Is time to show this phrase?
     * @param { LyricTime / Number } currentTime Unit in second .
     * */


    createClass(LyricPhrase, [{
        key: "isMyTurn",
        value: function isMyTurn(currentTime) {
            if (currentTime instanceof LyricTime) {
                return currentTime.getSecond() >= this.timeInSecond;
            } else {
                return currentTime >= this.timeInSecond;
            }
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.time.toString() + " " + this.content;
        }
    }]);
    return LyricPhrase;
}();

/**
 * @author kamilic
 * @name Lrc
 */
/**
 * @private
 * */
function _parse(text) {
    var lyricList = [];
    var lyricTags = new LyricIDTagCollection();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = LyricParser.parseTag(text)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tr = _step.value;

            lyricTags.setTag(tr[0], tr[1]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = LyricParser.parse(text)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var r = _step2.value;

            lyricList.push(new LyricPhrase(new LyricTime(r[0]), r[1] || ""));
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return {
        lyricList: lyricList,
        lyricTags: lyricTags
    };
}

function insertionSort(arr) {
    if (arr.length > 1) {
        for (var i = 0, len = arr.length; i < len; i += 1) {
            var min = arr[i];
            var pos = i;
            for (var j = i + 1; j < len; j += 1) {
                if (min.timeInSecond > arr[j].timeInSecond) {
                    min = arr[j];
                    pos = j;
                }
            }
            if (min.timeInSecond !== arr[i].timeInSecond) {
                var temp = arr[i];
                arr[i] = min;
                arr[pos] = temp;
            }
        }
    }
    return arr;
}

/**
 * @class Lrc
 * @desc a collection of LyricPhrase
 * */

var Lrc$1 = function () {
    function Lrc() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var sort = arguments[1];
        classCallCheck(this, Lrc);

        var _parse2 = _parse(text.toString()),
            lyricList = _parse2.lyricList,
            lyricTags = _parse2.lyricTags;

        this.lyricList = lyricList || /* istanbul ignore next */[];
        this.lyricTags = lyricTags || /* istanbul ignore next */new LyricIDTagCollection();
        this.length = this.lyricList.length;
        if (sort) {
            this.arrangePhrase();
        }
    }

    createClass(Lrc, [{
        key: "each",
        value: function each(func) {
            var list = this.lyricList;
            list.forEach(func);
        }
    }, {
        key: "eachTag",
        value: function eachTag(func) {
            var tagList = this.lyricTags;
            tagList.each(func);
        }
    }, {
        key: "phraseFilterByTimeRange",
        value: function phraseFilterByTimeRange(min, max) {
            var list = this.lyricList;
            return list.filter(function (phrase) {
                return phrase.timeInSecond >= min && phrase.timeInSecond <= max;
            });
        }
    }, {
        key: "setPhrase",
        value: function setPhrase(time, content, toArrange) {
            this.setPhraseByLyricPhase(new LyricPhrase(LyricTime.getInstanceByTime(time), content));
            if (toArrange) {
                this.arrangePhrase();
            }
        }
    }, {
        key: "setPhraseByLyricPhase",
        value: function setPhraseByLyricPhase(aLyricPhase) {
            if (aLyricPhase instanceof LyricPhrase) {
                this.lyricList.push(aLyricPhase);
            }
            return null;
        }
    }, {
        key: "getPhrase",
        value: function getPhrase(currentTime) {
            var list = this.lyricList;
            return insertionSort(list.filter(function (phrase) {
                return phrase.timeInSecond >= currentTime;
            }))[0];
        }
    }, {
        key: "output",
        value: function output() {
            var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "text" };

            /* istanbul ignore next */
            switch (configs.type) {
                /* istanbul ignore next */
                case "file":
                /* istanbul ignore next */
                case "blob":
                case "text":
                default:
                    return this.toString();
            }
        }
    }, {
        key: "arrangePhrase",
        value: function arrangePhrase() {
            this.lyricList = insertionSort(this.lyricList);
        }
    }, {
        key: "toString",
        value: function toString() {
            var result = "";
            this.eachTag(function (v, k) {
                result += v.toString() + "\n";
            });
            this.each(function (v) {
                result += v.toString() + "\n";
            });
            return result;
        }
    }]);
    return Lrc;
}();

Lrc$1.LyricTime = LyricTime;
Lrc$1.LyricPhrase = LyricPhrase;
Lrc$1.LyricIDTag = LyricIDTag;
Lrc$1.LyricIDTagCollection = LyricIDTagCollection;
Lrc$1.LyricParser = LyricParser;

return Lrc$1;

})));
