const app = new Vue({
    el: "#app",
    data: {
        started: false,
        startPause: "Start",
        counter: 0,
        linesWithinCircle: 0,
        rate: 1,
        manualRate: 0,
        rise: 0,
        run: 0,
        hypotenuse: 0,
        intervalRate: 0,
        piEstimation: (0).toFixed(10),
        intervalCounter: 0,
        fasterButtonUnusable: false,
        slowerButtonUnusable: true,

        lineIndicator: "green",
        angle: (0).toFixed(2),
        cssWidth: 0,
        cssTime: 0,
        styleObject: "",
    },
    created() {
        this.rateConverter();
        this.cssTimeConverter();
        this.styleObjectFunction();
    },
    watcher: {},
    computed: {},
    methods: {
        calculator: function () {
            this.counter++;
            this.rise = Math.random() * (1 - 0) + 0;
            this.run = Math.random() * (1 - 0) + 0;
            this.hypotenuse = Math.sqrt(
                Math.pow(this.rise, 2) + Math.pow(this.run, 2)
            );
            this.cssWidth = this.hypotenuse * 175;
            this.angle = -((this.rise / this.hypotenuse) * 90).toFixed(2);
            if (this.hypotenuse <= 1) {
                this.linesWithinCircle++;
                this.lineIndicator = "green";
            } else {
                this.lineIndicator = "red";
            }
            this.piEstimation = (
                (this.linesWithinCircle * 4) /
                this.counter
            ).toFixed(10);
            this.styleObjectFunction();
        },
        buttonActiveChecker: function () {
            if (this.rate <= 1) {
                this.slowerButtonUnusable = true;
                this.fasterButtonUnusable = false;
            } else if (this.rate >= 300) {
                this.slowerButtonUnusable = false;
                this.fasterButtonUnusable = true;
            } else {
                this.fasterButtonUnusable = false;
                this.slowerButtonUnusable = false;
            }
        },
        rateConverter: function () {
            this.intervalRate = 1000 / this.rate;
            return this.intervalRate;
        },
        cssTimeConverter: function () {
            this.cssTime = this.intervalRate / 1000;
            return this.cssTime;
        },
        rateUpFunction: function () {
            if (this.rate > 250) {
                this.rate = 300;
            } else if (this.rate >= 100) {
                this.rate = this.rate + 50;
            } else if (this.rate >= 10) {
                this.rate = this.rate + 10;
            } else if (this.rate >= 1) {
                this.rate++;
            }
            this.rateConverter();
            this.cssTimeConverter();
            this.buttonActiveChecker();
        },
        rateDownFunction: function () {
            if (this.rate < 2) {
                this.rate = 1;
            } else if (this.rate <= 10) {
                this.rate--;
            } else if (this.rate <= 100) {
                this.rate = this.rate - 10;
            } else if (this.rate <= 300) {
                this.rate = this.rate - 50;
            }
            this.rateConverter();
            this.cssTimeConverter();
            this.buttonActiveChecker();
        },
        rateUp: function () {
            if (this.rate === 300) {
            } else if (this.started && this.rate < 300) {
                this.startPauseButton();
                this.rateUpFunction();
                this.calculator();
                this.startPauseButton();
            } else {
                this.rateUpFunction();
            }
        },
        rateDown: function () {
            if (this.rate === 1) {
            } else if (this.started && this.rate > 1) {
                this.startPauseButton();
                this.rateDownFunction();
                this.calculator();
                this.startPauseButton();
            } else {
                this.rateDownFunction();
            }
        },
        manualEntryFunction: function () {
            if (this.manualRate < 1) {
                this.manualRate = 1;
            } else if (this.manualRate > 300) {
                this.manualRate = 300;
            } else if (isNaN(this.manualRate)) {
                this.manualRate = this.rate;
                alert("Please enter a number.");
            }
            this.rate = this.manualRate;
            this.rateConverter();
            this.cssTimeConverter();
            this.buttonActiveChecker();
        },
        rateManualEntry: function () {
            switch (this.started) {
                case true:
                    this.startPauseButton();
                    this.manualEntryFunction();
                    this.calculator();
                    this.startPauseButton();
                    break;
                default:
                    this.manualEntryFunction();
            }
        },
        startPauseButton: function () {
            switch (this.started) {
                case false:
                    this.started = true;
                    this.calculator();
                    this.startPause = "Pause";
                    this.intervalCounter = setInterval(
                        this.calculator,
                        this.intervalRate
                    );
                    break;
                case true:
                    this.started = false;
                    this.startPause = "Start";
                    clearInterval(this.intervalCounter);
                    break;
            }
        },
        styleObjectFunction: function () {
            if (this.rate <= 50) {
                this.styleObject = {
                    background: this.lineIndicator,
                    "box-shadow": `0 0 0.25rem ${this.lineIndicator}`,
                    transform: `rotate(${this.angle}deg)`,
                    width: `${this.cssWidth}px`,
                    transition: `${this.cssTime}s`,
                };
            } else {
                this.styleObject = {
                    background: this.lineIndicator,
                    "box-shadow": `0 0 0.25rem ${this.lineIndicator}`,
                    transform: `rotate(${this.angle}deg)`,
                    width: `${this.cssWidth}px`,
                };
            }
        },
        reset: function () {
            clearInterval(this.intervalCounter);
            this.started = false;
            this.startPause = "Start";
            this.rate = 1;
            this.counter = 0;
            this.linesWithinCircle = 0;
            this.lineIndicator = "green";
            this.rise = 0;
            this.run = 0;
            this.hypotenuse = 0;
            this.cssWidth = 0;
            this.angle = (0).toFixed(2);
            this.manualRate = 0;
            this.piEstimation = (0).toFixed(10);
            this.styleObject = "";
            this.cssTime = 0;
            this.fasterButtonUnusable = false;
            this.slowerButtonUnusable = true;
            this.rateConverter();
            this.cssTimeConverter();
            this.styleObjectFunction();
        },
    },
});
