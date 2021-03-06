/*!
 * # Semantic UI 2.4.1 - Embed
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

(function ($, window, document, undefined) {
  window = (typeof window !== 'undefined' && window.Math == Math)
  ? window
  : (typeof self !== 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

  $.fn.embed = function (parameters) {
    let
      $allModules = $(this),

      moduleSelector = $allModules.selector || '',

      time = new Date().getTime(),
      performance = [],

      query = arguments[0],
      methodInvoked = (typeof query === 'string'),
      queryArguments = [].slice.call(arguments, 1),

      returnedValue
      ;

    $allModules
    .each(function () {
      let
        settings = ($.isPlainObject(parameters))
          ? $.extend(true, {}, $.fn.embed.settings, parameters)
          : $.extend({}, $.fn.embed.settings),

        selector = settings.selector,
        className = settings.className,
        sources = settings.sources,
        error = settings.error,
        metadata = settings.metadata,
        namespace = settings.namespace,
        templates = settings.templates,

        eventNamespace = `.${namespace}`,
        moduleNamespace = `module-${namespace}`,

        $window = $(window),
        $module = $(this),
        $placeholder = $module.find(selector.placeholder),
        $icon = $module.find(selector.icon),
        $embed = $module.find(selector.embed),

        element = this,
        instance = $module.data(moduleNamespace),
        module
        ;

      module = {

        initialize() {
          module.debug('Initializing embed');
          module.determine.autoplay();
          module.create();
          module.bind.events();
          module.instantiate();
        },

        instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
        },

        destroy() {
          module.verbose('Destroying previous instance of embed');
          module.reset();
          $module
            .removeData(moduleNamespace)
            .off(eventNamespace)
          ;
        },

        refresh() {
          module.verbose('Refreshing selector cache');
          $placeholder = $module.find(selector.placeholder);
          $icon = $module.find(selector.icon);
          $embed = $module.find(selector.embed);
        },

        bind: {
          events() {
            if (module.has.placeholder()) {
              module.debug('Adding placeholder events');
              $module
                .on(`click${eventNamespace}`, selector.placeholder, module.createAndShow)
                .on(`click${eventNamespace}`, selector.icon, module.createAndShow)
              ;
            }
          },
        },

        create() {
          const
            placeholder = module.get.placeholder()
          ;
          if (placeholder) {
            module.createPlaceholder();
          } else {
            module.createAndShow();
          }
        },

        createPlaceholder(placeholder) {
          let
            icon = module.get.icon(),
            url = module.get.url(),
            embed = module.generate.embed(url)
            ;
          placeholder = placeholder || module.get.placeholder();
          $module.html(templates.placeholder(placeholder, icon));
          module.debug('Creating placeholder for embed', placeholder, icon);
        },

        createEmbed(url) {
          module.refresh();
          url = url || module.get.url();
          $embed = $('<div/>')
            .addClass(className.embed)
            .html(module.generate.embed(url))
            .appendTo($module)
          ;
          settings.onCreate.call(element, url);
          module.debug('Creating embed object', $embed);
        },

        changeEmbed(url) {
          $embed
            .html(module.generate.embed(url))
          ;
        },

        createAndShow() {
          module.createEmbed();
          module.show();
        },

        // sets new embed
        change(source, id, url) {
          module.debug('Changing video to ', source, id, url);
          $module
            .data(metadata.source, source)
            .data(metadata.id, id)
          ;
          if (url) {
            $module.data(metadata.url, url);
          } else {
            $module.removeData(metadata.url);
          }
          if (module.has.embed()) {
            module.changeEmbed();
          } else {
            module.create();
          }
        },

        // clears embed
        reset() {
          module.debug('Clearing embed and showing placeholder');
          module.remove.data();
          module.remove.active();
          module.remove.embed();
          module.showPlaceholder();
          settings.onReset.call(element);
        },

        // shows current embed
        show() {
          module.debug('Showing embed');
          module.set.active();
          settings.onDisplay.call(element);
        },

        hide() {
          module.debug('Hiding embed');
          module.showPlaceholder();
        },

        showPlaceholder() {
          module.debug('Showing placeholder image');
          module.remove.active();
          settings.onPlaceholderDisplay.call(element);
        },

        get: {
          id() {
            return settings.id || $module.data(metadata.id);
          },
          placeholder() {
            return settings.placeholder || $module.data(metadata.placeholder);
          },
          icon() {
            return (settings.icon)
              ? settings.icon
              : ($module.data(metadata.icon) !== undefined)
                ? $module.data(metadata.icon)
                : module.determine.icon()
            ;
          },
          source(url) {
            return (settings.source)
              ? settings.source
              : ($module.data(metadata.source) !== undefined)
                ? $module.data(metadata.source)
                : module.determine.source()
            ;
          },
          type() {
            const source = module.get.source();
            return (sources[source] !== undefined)
              ? sources[source].type
              : false
            ;
          },
          url() {
            return (settings.url)
              ? settings.url
              : ($module.data(metadata.url) !== undefined)
                ? $module.data(metadata.url)
                : module.determine.url()
            ;
          },
        },

        determine: {
          autoplay() {
            if (module.should.autoplay()) {
              settings.autoplay = true;
            }
          },
          source(url) {
            let
              matchedSource = false
            ;
            url = url || module.get.url();
            if (url) {
              $.each(sources, (name, source) => {
                if (url.search(source.domain) !== -1) {
                  matchedSource = name;
                  return false;
                }
              });
            }
            return matchedSource;
          },
          icon() {
            const
              source = module.get.source()
            ;
            return (sources[source] !== undefined)
              ? sources[source].icon
              : false
            ;
          },
          url() {
            let
              id = settings.id || $module.data(metadata.id),
              source = settings.source || $module.data(metadata.source),
              url
              ;
            url = (sources[source] !== undefined)
              ? sources[source].url.replace('{id}', id)
              : false
            ;
            if (url) {
              $module.data(metadata.url, url);
            }
            return url;
          },
        },


        set: {
          active() {
            $module.addClass(className.active);
          },
        },

        remove: {
          data() {
            $module
              .removeData(metadata.id)
              .removeData(metadata.icon)
              .removeData(metadata.placeholder)
              .removeData(metadata.source)
              .removeData(metadata.url)
            ;
          },
          active() {
            $module.removeClass(className.active);
          },
          embed() {
            $embed.empty();
          },
        },

        encode: {
          parameters(parameters) {
            let
              urlString = [],
              index
              ;
            for (index in parameters) {
              urlString.push(`${encodeURIComponent(index)}=${encodeURIComponent(parameters[index])}`);
            }
            return urlString.join('&amp;');
          },
        },

        generate: {
          embed(url) {
            module.debug('Generating embed html');
            let
              source = module.get.source(),
              html,
              parameters
              ;
            url = module.get.url(url);
            if (url) {
              parameters = module.generate.parameters(source);
              html = templates.iframe(url, parameters);
            } else {
              module.error(error.noURL, $module);
            }
            return html;
          },
          parameters(source, extraParameters) {
            let
              parameters = (sources[source] && sources[source].parameters !== undefined)
                ? sources[source].parameters(settings)
                : {}
            ;
            extraParameters = extraParameters || settings.parameters;
            if (extraParameters) {
              parameters = $.extend({}, parameters, extraParameters);
            }
            parameters = settings.onEmbed(parameters);
            return module.encode.parameters(parameters);
          },
        },

        has: {
          embed() {
            return ($embed.length > 0);
          },
          placeholder() {
            return settings.placeholder || $module.data(metadata.placeholder);
          },
        },

        should: {
          autoplay() {
            return (settings.autoplay === 'auto')
              ? (settings.placeholder || $module.data(metadata.placeholder) !== undefined)
              : settings.autoplay
            ;
          },
        },

        is: {
          video() {
            return module.get.type() == 'video';
          },
        },

        setting(name, value) {
          module.debug('Changing setting', name, value);
          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
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
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, `${settings.name}:`);
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, `${settings.name}:`);
              module.verbose.apply(console, arguments);
            }
          }
        },
        error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, `${settings.name}:`);
            module.error.apply(console, arguments);
          }
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
                Name: message[0],
                Arguments: [].slice.call(message, 1) || '',
                Element: element,
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
            if (moduleSelector) {
              title += ` '${moduleSelector}'`;
            }
            if ($allModules.length > 1) {
              title += `${' ' + '('}${$allModules.length})`;
            }
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
          instance.invoke('destroy');
        }
        module.initialize();
      }
    })
  ;
    return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
  };

  $.fn.embed.settings = {

    name: 'Embed',
    namespace: 'embed',

    silent: false,
    debug: false,
    verbose: false,
    performance: true,

    icon: false,
    source: false,
    url: false,
    id: false,

  // standard video settings
    autoplay: 'auto',
    color: '#444444',
    hd: true,
    brandedUI: false,

  // additional parameters to include with the embed
    parameters: false,

    onDisplay() {},
    onPlaceholderDisplay() {},
    onReset() {},
    onCreate(url) {},
    onEmbed(parameters) {
      return parameters;
    },

    metadata: {
      id: 'id',
      icon: 'icon',
      placeholder: 'placeholder',
      source: 'source',
      url: 'url',
    },

    error: {
      noURL: 'No URL specified',
      method: 'The method you called is not defined',
    },

    className: {
      active: 'active',
      embed: 'embed',
    },

    selector: {
      embed: '.embed',
      placeholder: '.placeholder',
      icon: '.icon',
    },

    sources: {
      youtube: {
        name: 'youtube',
        type: 'video',
        icon: 'video play',
        domain: 'youtube.com',
        url: '//www.youtube.com/embed/{id}',
        parameters(settings) {
          return {
            autohide: !settings.brandedUI,
            autoplay: settings.autoplay,
            color: settings.color || undefined,
            hq: settings.hd,
            jsapi: settings.api,
            modestbranding: !settings.brandedUI,
          };
        },
      },
      vimeo: {
        name: 'vimeo',
        type: 'video',
        icon: 'video play',
        domain: 'vimeo.com',
        url: '//player.vimeo.com/video/{id}',
        parameters(settings) {
          return {
            api: settings.api,
            autoplay: settings.autoplay,
            byline: settings.brandedUI,
            color: settings.color || undefined,
            portrait: settings.brandedUI,
            title: settings.brandedUI,
          };
        },
      },
    },

    templates: {
      iframe(url, parameters) {
        let src = url;
        if (parameters) {
          src += `?${parameters}`;
        }
        return `${''
        + '<iframe src="'}${src}"`
        + ' width="100%" height="100%"'
        + ' frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
      ;
      },
      placeholder(image, icon) {
        let
        html = ''
      ;
        if (icon) {
          html += `<i class="${icon} icon"></i>`;
        }
        if (image) {
          html += `<img class="placeholder" src="${image}">`;
        }
        return html;
      },
    },

  // NOT YET IMPLEMENTED
    api: false,
    onPause() {},
    onPlay() {},
    onStop() {},

  };
}(jQuery, window, document));
