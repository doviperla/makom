/*!
 * # Semantic UI 2.4.1 - Site
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

(function ($, window, document, undefined) {
  $.site = $.fn.site = function (parameters) {
    let
      time = new Date().getTime(),
      performance = [],

      query = arguments[0],
      methodInvoked = (typeof query === 'string'),
      queryArguments = [].slice.call(arguments, 1),

      settings = ($.isPlainObject(parameters))
      ? $.extend(true, {}, $.site.settings, parameters)
      : $.extend({}, $.site.settings),

      namespace = settings.namespace,
      error = settings.error,

      eventNamespace = `.${namespace}`,
      moduleNamespace = `module-${namespace}`,

      $document = $(document),
      $module = $document,
      element = this,
      instance = $module.data(moduleNamespace),

      module,
      returnedValue
      ;
    module = {

      initialize() {
        module.instantiate();
      },

      instantiate() {
        module.verbose('Storing instance of site', module);
        instance = module;
        $module
        .data(moduleNamespace, module)
      ;
      },

      normalize() {
        module.fix.console();
        module.fix.requestAnimationFrame();
      },

      fix: {
        console() {
          module.debug('Normalizing window.console');
          if (console === undefined || console.log === undefined) {
            module.verbose('Console not available, normalizing events');
            module.disable.console();
          }
          if (typeof console.group === 'undefined' || typeof console.groupEnd === 'undefined' || typeof console.groupCollapsed === 'undefined') {
            module.verbose('Console group not available, normalizing events');
            window.console.group = function () {};
            window.console.groupEnd = function () {};
            window.console.groupCollapsed = function () {};
          }
          if (typeof console.markTimeline === 'undefined') {
            module.verbose('Mark timeline not available, normalizing events');
            window.console.markTimeline = function () {};
          }
        },
        consoleClear() {
          module.debug('Disabling programmatic console clearing');
          window.console.clear = function () {};
        },
        requestAnimationFrame() {
          module.debug('Normalizing requestAnimationFrame');
          if (window.requestAnimationFrame === undefined) {
            module.debug('RequestAnimationFrame not available, normalizing event');
            window.requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (callback) { setTimeout(callback, 0); }
          ;
          }
        },
      },

      moduleExists(name) {
        return ($.fn[name] !== undefined && $.fn[name].settings !== undefined);
      },

      enabled: {
        modules(modules) {
          const
          enabledModules = []
        ;
          modules = modules || settings.modules;
          $.each(modules, (index, name) => {
            if (module.moduleExists(name)) {
              enabledModules.push(name);
            }
          });
          return enabledModules;
        },
      },

      disabled: {
        modules(modules) {
          const
          disabledModules = []
        ;
          modules = modules || settings.modules;
          $.each(modules, (index, name) => {
            if (!module.moduleExists(name)) {
              disabledModules.push(name);
            }
          });
          return disabledModules;
        },
      },

      change: {
        setting(setting, value, modules, modifyExisting) {
          modules = (typeof modules === 'string')
          ? (modules === 'all')
            ? settings.modules
            : [modules]
          : modules || settings.modules
        ;
          modifyExisting = (modifyExisting !== undefined)
          ? modifyExisting
          : true
        ;
          $.each(modules, (index, name) => {
            let
              namespace = (module.moduleExists(name))
              ? $.fn[name].settings.namespace || false
              : true,
              $existingModules
              ;
            if (module.moduleExists(name)) {
              module.verbose('Changing default setting', setting, value, name);
              $.fn[name].settings[setting] = value;
              if (modifyExisting && namespace) {
                $existingModules = $(`:data(module-${namespace})`);
                if ($existingModules.length > 0) {
                  module.verbose('Modifying existing settings', $existingModules);
                  $existingModules[name]('setting', setting, value);
                }
              }
            }
          });
        },
        settings(newSettings, modules, modifyExisting) {
          modules = (typeof modules === 'string')
          ? [modules]
          : modules || settings.modules
        ;
          modifyExisting = (modifyExisting !== undefined)
          ? modifyExisting
          : true
        ;
          $.each(modules, (index, name) => {
            let
            $existingModules
          ;
            if (module.moduleExists(name)) {
              module.verbose('Changing default setting', newSettings, name);
              $.extend(true, $.fn[name].settings, newSettings);
              if (modifyExisting && namespace) {
                $existingModules = $(`:data(module-${namespace})`);
                if ($existingModules.length > 0) {
                  module.verbose('Modifying existing settings', $existingModules);
                  $existingModules[name]('setting', newSettings);
                }
              }
            }
          });
        },
      },

      enable: {
        console() {
          module.console(true);
        },
        debug(modules, modifyExisting) {
          modules = modules || settings.modules;
          module.debug('Enabling debug for modules', modules);
          module.change.setting('debug', true, modules, modifyExisting);
        },
        verbose(modules, modifyExisting) {
          modules = modules || settings.modules;
          module.debug('Enabling verbose debug for modules', modules);
          module.change.setting('verbose', true, modules, modifyExisting);
        },
      },
      disable: {
        console() {
          module.console(false);
        },
        debug(modules, modifyExisting) {
          modules = modules || settings.modules;
          module.debug('Disabling debug for modules', modules);
          module.change.setting('debug', false, modules, modifyExisting);
        },
        verbose(modules, modifyExisting) {
          modules = modules || settings.modules;
          module.debug('Disabling verbose debug for modules', modules);
          module.change.setting('verbose', false, modules, modifyExisting);
        },
      },

      console(enable) {
        if (enable) {
          if (instance.cache.console === undefined) {
            module.error(error.console);
            return;
          }
          module.debug('Restoring console function');
          window.console = instance.cache.console;
        } else {
          module.debug('Disabling console function');
          instance.cache.console = window.console;
          window.console = {
            clear() {},
            error() {},
            group() {},
            groupCollapsed() {},
            groupEnd() {},
            info() {},
            log() {},
            markTimeline() {},
            warn() {},
          };
        }
      },

      destroy() {
        module.verbose('Destroying previous site for', $module);
        $module
        .removeData(moduleNamespace)
      ;
      },

      cache: {},

      setting(name, value) {
        if ($.isPlainObject(name)) {
          $.extend(true, settings, name);
        } else if (value !== undefined) {
          settings[name] = value;
        } else {
          return settings[name];
        }
      },
      internal(name, value) {
        if ($.isPlainObject(name)) {
          $.extend(true, module, name);
        } else if (value !== undefined) {
          module[name] = value;
        } else {
          return module[name];
        }
      },
      debug() {
        if (settings.debug) {
          if (settings.performance) {
            module.performance.log(arguments);
          } else {
            module.debug = Function.prototype.bind.call(console.info, console, `${settings.name}:`);
            module.debug.apply(console, arguments);
          }
        }
      },
      verbose() {
        if (settings.verbose && settings.debug) {
          if (settings.performance) {
            module.performance.log(arguments);
          } else {
            module.verbose = Function.prototype.bind.call(console.info, console, `${settings.name}:`);
            module.verbose.apply(console, arguments);
          }
        }
      },
      error() {
        module.error = Function.prototype.bind.call(console.error, console, `${settings.name}:`);
        module.error.apply(console, arguments);
      },
      performance: {
        log(message) {
          let
            currentTime,
            executionTime,
            previousTime
            ;
          if (settings.performance) {
            currentTime = new Date().getTime();
            previousTime = time || currentTime;
            executionTime = currentTime - previousTime;
            time = currentTime;
            performance.push({
              Element: element,
              Name: message[0],
              Arguments: [].slice.call(message, 1) || '',
              'Execution Time': executionTime,
            });
          }
          clearTimeout(module.performance.timer);
          module.performance.timer = setTimeout(module.performance.display, 500);
        },
        display() {
          let
            title = `${settings.name}:`,
            totalTime = 0
            ;
          time = false;
          clearTimeout(module.performance.timer);
          $.each(performance, (index, data) => {
            totalTime += data['Execution Time'];
          });
          title += ` ${totalTime}ms`;
          if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
            console.groupCollapsed(title);
            if (console.table) {
              console.table(performance);
            } else {
              $.each(performance, (index, data) => {
                console.log(`${data.Name}: ${data['Execution Time']}ms`);
              });
            }
            console.groupEnd();
          }
          performance = [];
        },
      },
      invoke(query, passedArguments, context) {
        let
          object = instance,
          maxDepth,
          found,
          response
          ;
        passedArguments = passedArguments || queryArguments;
        context = element || context;
        if (typeof query === 'string' && object !== undefined) {
          query = query.split(/[\. ]/);
          maxDepth = query.length - 1;
          $.each(query, (depth, value) => {
            const camelCaseValue = (depth != maxDepth)
            ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
            : query
          ;
            if ($.isPlainObject(object[camelCaseValue]) && (depth != maxDepth)) {
              object = object[camelCaseValue];
            } else if (object[camelCaseValue] !== undefined) {
              found = object[camelCaseValue];
              return false;
            } else if ($.isPlainObject(object[value]) && (depth != maxDepth)) {
              object = object[value];
            } else if (object[value] !== undefined) {
              found = object[value];
              return false;
            } else {
              module.error(error.method, query);
              return false;
            }
          });
        }
        if ($.isFunction(found)) {
          response = found.apply(context, passedArguments);
        } else if (found !== undefined) {
          response = found;
        }
        if ($.isArray(returnedValue)) {
          returnedValue.push(response);
        } else if (returnedValue !== undefined) {
          returnedValue = [returnedValue, response];
        } else if (response !== undefined) {
          returnedValue = response;
        }
        return found;
      },
    };

    if (methodInvoked) {
      if (instance === undefined) {
        module.initialize();
      }
      module.invoke(query);
    } else {
      if (instance !== undefined) {
        module.destroy();
      }
      module.initialize();
    }
    return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
  };

  $.site.settings = {

    name: 'Site',
    namespace: 'site',

    error: {
      console: 'Console cannot be restored, most likely it was overwritten outside of module',
      method: 'The method you called is not defined.',
    },

    debug: false,
    verbose: false,
    performance: true,

    modules: [
      'accordion',
      'api',
      'checkbox',
      'dimmer',
      'dropdown',
      'embed',
      'form',
      'modal',
      'nag',
      'popup',
      'rating',
      'shape',
      'sidebar',
      'state',
      'sticky',
      'tab',
      'transition',
      'visit',
      'visibility',
    ],

    siteNamespace: 'site',
    namespaceStub: {
      cache: {},
      config: {},
      sections: {},
      section: {},
      utilities: {},
    },

  };

// allows for selection of elements with data attributes
  $.extend($.expr[':'], {
    data: ($.expr.createPseudo)
    ? $.expr.createPseudo((dataName) => function (elem) {
      return !!$.data(elem, dataName);
    })
    : function (elem, i, match) {
      // support: jQuery < 1.8
      return !!$.data(elem, match[3]);
    },
  });
}(jQuery, window, document));
