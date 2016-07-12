var timer = null
var gpio = require('gpio')
var motorVoltages = [1, 0, 0, 0]

var gpio4 = gpio.export(4, {
    direction: 'out'
});
var gpio17 = gpio.export(17, {
    direction: 'out'
});
var gpio18 = gpio.export(18, {
    direction: 'out'
});
var gpio22 = gpio.export(22, {
    direction: 'out'
});

function handler(action, options) {
    switch (action) {
        case 'rotate':
            rotate(options)
            break
        case 'pause':
            pause()
            break
    }
}

function rotate(options) {
    if (timer) {
        return
    }
    timer = setInterval(function() {
        gpio4.set(motorVoltages[0])
        gpio17.set(motorVoltages[1])
        gpio18.set(motorVoltages[2])
        gpio22.set(motorVoltages[3])

        if(options.dir == 1) { // 顺时针转动
            motorVoltages.unshift(motorVoltages.pop())
        } else { // 逆时针转动
            motorVoltages.push(motorVoltages.shift())
        }
    }, 10)
}

function pause() {
    clearInterval(timer)
    timer = null
}

exports.handler = handler
