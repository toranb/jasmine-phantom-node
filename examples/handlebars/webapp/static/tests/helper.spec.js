require('static/vendor/helper');

describe('Handlebars Tests', function() {

    describe('ifequal helper tests', function() {

        var first, fields, html;

        beforeEach(function() {
            this.first = "123";
            this.fields = { first: "123" };
            this.html = "{{#ifequal first last}}true{{else}}false{{/ifequal}}";
        });

        it('will return false when the values are not equal', function() {
            var template =  Handlebars.compile(this.html);
            this.fields['last'] = 123;
            var result = template(this.fields);
            expect(result).toEqual("false");
        });

        it('will return true when the values are equal', function() {
            var template =  Handlebars.compile(this.html)
            this.fields['last'] = "123";
            var result = template(this.fields)
            expect(result).toEqual("true");
        });

    });
});
