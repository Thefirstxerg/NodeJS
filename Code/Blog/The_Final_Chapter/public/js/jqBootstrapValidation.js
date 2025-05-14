(function($) {
  "use strict";

  var createdElements = [];

  var defaults = {
    options: {
      prependExistingHelpBlock: false,
      sniffHtml: true, // sniff for 'required', 'maxlength', etc
      preventSubmit: true, // stop the form submit event from firing if validation fails
      submitError: false, // function called if there is an error
      submitSuccess: false, // function called just before a successful submit event is sent to the server
      semanticallyStrict: false, // set to true to tidy up generated HTML output
      removeSuccess: true,
      bindEvents: [],
      autoAdd: {
        helpBlocks: true
      },
      filter: function() {
        return $(this).is(":visible"); // only validate elements you can see
      }
    },
    methods: {
      init: function(options) {
        var settings = $.extend(true, {}, defaults);
        settings.options = $.extend(true, settings.options, options);

        var $siblingElements = this;

        var uniqueForms = $.unique(
          $siblingElements.map(function() {
            return $(this).parents("form")[0];
          }).toArray()
        );

        $(uniqueForms).bind("submit.validation", function(e) {
          var $form = $(this);
          var warningsFound = 0;
          var $elements = $form
            .find("input,textarea,select")
            .not("[type=submit],[type=image]")
            .filter(settings.options.filter);
          $elements
            .trigger("submit.validation")
            .trigger("validationLostFocus.validation");

          $elements.each(function(i, el) {
            var $this = $(el),
              $controlGroup = $this.parents(".form-group").first();
            if ($controlGroup.hasClass("warning")) {
              $controlGroup.removeClass("warning").addClass("error");
              warningsFound++;
            }
          });

          $elements.trigger("validationLostFocus.validation");

          if (warningsFound) {
            if (settings.options.preventSubmit) {
              e.preventDefault();
              e.stopImmediatePropagation();
            }
            $form.addClass("error");
            if ($.isFunction(settings.options.submitError)) {
              settings.options.submitError(
                $form,
                e,
                $elements.jqBootstrapValidation("collectErrors", true)
              );
            }
          } else {
            $form.removeClass("error");
            if ($.isFunction(settings.options.submitSuccess)) {
              settings.options.submitSuccess($form, e);
            }
          }
        });

        return this.each(function() {
          var $this = $(this),
            $controlGroup = $this.parents(".form-group").first(),
            $helpBlock = $controlGroup.find(".help-block").first(),
            $form = $this.parents("form").first(),
            validatorNames = [];

          if (
            !$helpBlock.length &&
            settings.options.autoAdd &&
            settings.options.autoAdd.helpBlocks
          ) {
            $helpBlock = $('<div class="help-block" />');
            $controlGroup.find(".controls").append($helpBlock);
            createdElements.push($helpBlock[0]);
          }

          if (settings.options.sniffHtml) {
            var message;
            if ($this.data("validationValidempty") === undefined) {
              if ($this.attr("required") !== undefined) {
                $this.data("validationRequired", message);
                validatorNames.push("required");
              }
            }
            if (
              $this.attr("pattern") !== undefined ||
              $this.attr("maxlength") !== undefined ||
              $this.attr("minlength") !== undefined
            ) {
              $this.data("validationPattern", message);
              validatorNames.push("pattern");
            }
            if ($this.attr("max") !== undefined || $this.attr("aria-valuemax") !== undefined) {
              $this.data("validationMax", message);
              validatorNames.push("max");
            }
            if ($this.attr("min") !== undefined || $this.attr("aria-valuemin") !== undefined) {
              $this.data("validationMin", message);
              validatorNames.push("min");
            }
          }

          var parsedValidatorNames = [];

          for (var i = 0; i < validatorNames.length; i++) {
            parsedValidatorNames.push(validatorNames[i]);
          }

          if (
            settings.options.preventSubmit &&
            $this.is(":submit") === false
          ) {
            $this.on("click.validation", function(e) {
              if ($form.data("jqbv_submitFired")) {
                return false;
              }
              $form.data("jqbv_submitFired", true);
              setTimeout(function() {
                $form.data("jqbv_submitFired", false);
              }, 1000);
            });
          }

          $this.bind(
            "validation.validation",
            function(event, params) {
              var value = getValue($this);
              var errorsFound = [];

              $.each(validatorNames, function(i, el) {
                if (
                  value ||
                  value.length ||
                  params &&
                  params.includeEmpty ||
                  (!!settings.options.validatorTypes[el] &&
                    settings.options.validatorTypes[el].includeEmpty)
                ) {
                  if (
                    !!settings.options.validatorTypes[el].validate(
                      $this,
                      value,
                      el
                    )
                  ) {
                    errorsFound.push(el);
                  }
                }
              });

              return errorsFound.length
                ? $controlGroup.removeClass("success").addClass("error")
                : $controlGroup.removeClass("error").addClass("success");
            }
          );

          $this.bind("validationLostFocus.validation", function() {
            $controlGroup.removeClass("success");
          });
        });
      },
      destroy: function() {
        return this.each(function() {
          var $this = $(this),
            $controlGroup = $this.parents(".form-group").first(),
            $helpBlock = $controlGroup.find(".help-block").first();

          // remove our events
          $this.unbind(".validation"); // events are namespaced
          // reset help text
          $helpBlock.html($helpBlock.data("original-contents"));
          // reset classes
          $controlGroup.attr("class", $controlGroup.data("original-classes"));
          // reset aria
          $this.attr("aria-invalid", $this.data("original-aria-invalid"));
          // reset role
          $helpBlock.attr("role", $this.data("original-role"));
          // remove all elements we created
          if (createdElements.indexOf($helpBlock[0]) > -1) {
            $helpBlock.remove();
          }
        });
      },
      collectErrors: function(includeEmpty) {
        var errorMessages = {};
        this.each(function(i, el) {
          var $el = $(el);
          var name = $el.attr("name");
          var errors = $el.triggerHandler("validation.validation", {
            includeEmpty: true
          });
          errorMessages[name] = $.extend(true, errors, errorMessages[name]);
        });

        $.each(errorMessages, function(i, el) {
          if (el.length === 0) {
            delete errorMessages[i];
          }
        });

        return errorMessages;
      }
    }
  };

  var getValue = function($this) {
    var value = null;
    var type = $this.attr("type");
    if (type === "checkbox") {
      value = $this.is(":checked") ? value : "";
    } else if (type === "radio") {
      value = $this
        .filter(":checked")
        .val();
    } else {
      value = $this.val();
    }
    return value;
  };

  var methods = {
    init: defaults.methods.init,
    destroy: defaults.methods.destroy,
    collectErrors: defaults.methods.collectErrors
  };

  $.fn.jqBootstrapValidation = function(method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist");
    }
  };
})(jQuery);