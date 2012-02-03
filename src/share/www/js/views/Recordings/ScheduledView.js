var RecordingsScheduledView = Backbone.View.extend({
    template: 'RecordingsScheduledTemplate',
    className: 'span12 columns',

    initialize: function () {
        $(this.el).html(_.template( $('#' + this.template).html(), {} ));
    },

    render: function () {
        return this;
    }
});