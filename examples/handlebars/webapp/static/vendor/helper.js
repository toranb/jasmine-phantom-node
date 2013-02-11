Handlebars.registerHelper('ifequal', function (val1, val2, options) {
    var context = (options.fn.contexts && options.fn.contexts[0]) || this;
    if (val1 === val2) {
        return options.fn(this);
    } else{
        return options.inverse(this);
    }
});
