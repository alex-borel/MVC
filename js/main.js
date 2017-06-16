function TClock(timeShift) {
    var self = this;
    this.timeShift = timeShift;
    this.actualTime = null;

    var MyView = null,
        interval;

    this.hoursT = 0;
    this.secT = 0;
    this.minT = 0;

    this.Start = function(View) {
        MyView = View;
        this.actualTime = new Date();
        interval = setInterval(function() {
            self.Tick();
        }, 1000);
    };

    this.UpdateView = function() {
        if (MyView) {
            MyView.Update();
        }
    };

    this.Tick = function() {
        this.actualTime = new Date();
        var hours = this.actualTime.getUTCHours() + this.timeShift,
            min = this.actualTime.getMinutes(),
            sec = this.actualTime.getSeconds();
        this.secT = sec * 6;
        this.minT = min * 6;
        this.hoursT = hours * 30;

        this.UpdateView();
    };

    this.Restart = function() {
        this.actualTime = new Date();
        interval = setInterval(function() {
            self.Tick();
        }, 1000);
    };

    this.Stop = function() {
        clearInterval(interval);
    };
}

function TClockViewDOM() {
    var MyModel = null,
        MyField = null,
        divH = null,
        divM = null,
        divS = null;

    this.Start = function(Model, Field) {
        MyModel = Model;
        MyField = Field;
        divH = MyField.querySelector('.arrowH');
        divM = MyField.querySelector('.arrowM');
        divS = MyField.querySelector('.arrowS');
    };

    this.Update = function() {
        divH.style.transform = "rotate(" + MyModel.hoursT + "deg)";
        divM.style.transform = "rotate(" + MyModel.minT + "deg)";
        divS.style.transform = "rotate(" + MyModel.secT + "deg)";
    };
}

function TClockControllerButtons() {
    var MyModel = null,
        MyField = null;

    this.Start = function(Model, Field) {
        MyModel = Model;
        MyField = Field;

        var ButtonStop = MyField.querySelector('.Stop');
        ButtonStop.addEventListener('click', this.StopClock);

        var ButtonStart = MyField.querySelector('.Start');
        ButtonStart.addEventListener('click', this.StartClock);
    };

    this.StopClock = function() {
        MyModel.Stop();
    };

    this.StartClock = function() {
        MyModel.Restart();
    };
}

var Clock1 = new TClock(3);
var View1 = new TClockViewDOM();
var Controller1 = new TClockControllerButtons();

var ContainerElem1 = document.querySelector('.Container1');
Clock1.Start(View1);
View1.Start(Clock1, ContainerElem1);
Controller1.Start(Clock1, ContainerElem1);

Clock1.UpdateView();

var Clock2 = new TClock(1);
var View2 = new TClockViewDOM();
var Controller2 = new TClockControllerButtons();

var ContainerElem2 = document.querySelector('.Container2');
Clock2.Start(View2);
View2.Start(Clock2, ContainerElem2);
Controller2.Start(Clock2, ContainerElem2);

Clock2.UpdateView();
