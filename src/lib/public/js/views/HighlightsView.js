var HighlightsView = Backbone.View.extend({
    initialize: function () {
        $(document).attr('title', 'GUIA // Highlights');
    },
    
    render: function () {
        var self = this;
        
        $.ajax({
            url: "/templates/highlights",
            success: function (res) {
                var template = _.template(res, {});
                self.el.html(template);
            }
        });
        
        return this;
    }
});