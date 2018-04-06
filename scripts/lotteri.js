
var Lotteri = function () {
    var self = this;
    self.loddboker = ko.observableArray();

    self.name = ko.observable('');
    self.ticketCount = ko.observable('');

    self.winnerTicket = ko.observable();
    self.winnerHistory = ko.observableArray();

    self.canAddLoddbok = ko.computed(function () {
        return self.name().length > 0 && self.ticketCount() > 0;
    }, this);

    self.canResetHistory = ko.computed(function () {
        return self.winnerHistory().length > 0;
    }, this);

    self.addLoddbok = function () {
        self.loddboker.push({ name: self.name(), ticketCount: self.ticketCount() });
        self.generateTickets();
        self.name('');
        self.ticketCount('');
    };

    self.removeLoddbok = function () {
        self.loddboker.remove(this);
        self.generateTickets();
    };

    self.tickets = ko.observableArray();
    self.generatedTicketsCount = ko.observable();

    self.availableTicketsCount = ko.computed(function () {
        return self.tickets().length;
    }, this);

    self.generateTickets = function () {
        self.tickets.removeAll();
        self.winnerTicket('');
        for (var i = 0; i < self.loddboker().length; i++) {
            var loddbok = self.loddboker()[i];
            for (var t = 1; t <= loddbok.ticketCount; t++) {
                self.tickets.push(loddbok.name + ': ' + t);
            }
        }
        self.generatedTicketsCount(self.availableTicketsCount());
    };

    self.canDrawTickets = ko.computed(function() {
        return self.tickets().length > 0;
    });

    self.reset = function () {
        self.winnerHistory.removeAll();
    };

    // the Fisher–Yates shuffle
    self.draw = function () {
        var array = this.tickets();
        var m = array.length, t, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        self.winnerTicket(array[0]);
        self.winnerHistory.unshift(array[0]);
        this.tickets.remove(array[0]);
    }
};

ko.applyBindings(new Lotteri());
