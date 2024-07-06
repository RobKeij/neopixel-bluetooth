function Rück () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Red))
    robotbit.MotorRun(robotbit.Motors.M1A, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M1B, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M2A, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M2B, 0 - speed)
}
function L () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Blue))
    robotbit.MotorRun(robotbit.Motors.M1A, speed)
    robotbit.MotorRun(robotbit.Motors.M1B, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M2A, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M2B, speed)
}
function doMode () {
    if (uartdata == "S") {
        basic.showIcon(IconNames.Confused)
    } else if (uartdata == "T") {
        basic.showIcon(IconNames.Angry)
        Avoid_mode()
    } else if (uartdata == "U") {
        basic.showIcon(IconNames.EighthNote)
    } else if (uartdata == "V") {
        basic.showLeds(`
            . . . . .
            # . . . #
            # # # # #
            # . . . #
            . # # # .
            `)
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    basic.pause(1000)
    connected = true
    sendDistAndSpeed()
    while (connected) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        doMotors()
        doMusic()
        doMode()
        doLEDColor()
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
    connected = false
})
function Avoid_mode () {
    if (sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    ) < 35 && sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    ) != 0) {
        item = Math.randomBoolean()
        if (item == true) {
            L()
            basic.pause(800)
        }
        if (item == false) {
            R()
            basic.pause(800)
        }
    } else {
        Vor()
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Stop()
})
function sendDistAndSpeed () {
    if (connected) {
        bluetooth.uartWriteString("$CSB" + ("" + sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
        )) + "," + ("" + speed) + "#")
    }
}
function doMotors () {
    if (uartdata == "A") {
        Vor()
        basic.showLeds(`
            . # . # .
            . # # # .
            # # # # #
            . # # # .
            . . # . .
            `)
    } else if (uartdata == "B") {
        Rück()
        basic.showIcon(IconNames.House)
    } else if (uartdata == "C") {
        L()
        basic.showLeds(`
            . . # . .
            . # # # #
            # # # # .
            . # # # #
            . . # . .
            `)
    } else if (uartdata == "D") {
        R()
        basic.showLeds(`
            . . # . .
            # # # # .
            . # # # #
            # # # # .
            . . # . .
            `)
    } else if (uartdata == "E") {
        DL()
        basic.showLeds(`
            . # # # .
            # . . . #
            # # # . #
            # # . . #
            # . . . .
            `)
    } else if (uartdata == "F") {
        DR()
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # # #
            # . . # #
            . . . . #
            `)
    } else if (uartdata == "0") {
        Stop()
        basic.showIcon(IconNames.No)
    }
}
function DR () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Yellow))
    robotbit.MotorRun(robotbit.Motors.M1A, speed)
    robotbit.MotorRun(robotbit.Motors.M1B, speed)
    robotbit.MotorRun(robotbit.Motors.M2A, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M2B, 0 - speed)
}
function Vor () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Green))
    robotbit.MotorRun(robotbit.Motors.M1A, speed)
    robotbit.MotorRun(robotbit.Motors.M1B, speed)
    robotbit.MotorRun(robotbit.Motors.M2A, speed)
    robotbit.MotorRun(robotbit.Motors.M2B, speed)
}
function doMusic () {
    if (uartdata == "1") {
        strip2.showColor(neopixel.colors(NeoPixelColors.Blue))
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (uartdata == "2") {
        strip2.showColor(neopixel.colors(NeoPixelColors.Black))
        music.playTone(294, music.beat(BeatFraction.Whole))
    } else if (uartdata == "3") {
        strip2.showColor(neopixel.colors(NeoPixelColors.Green))
        music.playTone(330, music.beat(BeatFraction.Whole))
    } else if (uartdata == "4") {
        strip2.showColor(neopixel.colors(NeoPixelColors.Orange))
        music.playTone(349, music.beat(BeatFraction.Whole))
    } else if (uartdata == "5") {
        strip2.showColor(neopixel.colors(NeoPixelColors.Red))
        music.playTone(392, music.beat(BeatFraction.Whole))
    } else if (uartdata == "6") {
        music.playTone(440, music.beat(BeatFraction.Whole))
    } else if (uartdata == "7") {
        music.playTone(494, music.beat(BeatFraction.Whole))
    } else if (uartdata == "8") {
        music.playTone(523, music.beat(BeatFraction.Whole))
    } else if (uartdata == "B1") {
        music.playTone(277, music.beat(BeatFraction.Whole))
    } else if (uartdata == "B2") {
        music.playTone(311, music.beat(BeatFraction.Whole))
    } else if (uartdata == "B3") {
        music.playTone(370, music.beat(BeatFraction.Whole))
    } else if (uartdata == "B4") {
        music.playTone(415, music.beat(BeatFraction.Whole))
    } else if (uartdata == "B5") {
        music.playTone(466, music.beat(BeatFraction.Whole))
    } else if (uartdata == "O") {
    	
    }
}
function DL () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Blue))
    robotbit.MotorRun(robotbit.Motors.M1A, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M1B, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M2A, speed)
    robotbit.MotorRun(robotbit.Motors.M2B, speed)
}
function R () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Yellow))
    robotbit.MotorRun(robotbit.Motors.M1A, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M1B, speed)
    robotbit.MotorRun(robotbit.Motors.M2A, speed)
    robotbit.MotorRun(robotbit.Motors.M2B, 0 - speed)
}
function doLEDColor () {
    // Red
    // Green
    // Blue
    // Yellow
    // Cyan
    // Pink
    // Off
    if (uartdata == "G") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Red))
        speed = 35
    } else if (uartdata == "H") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Green))
        speed = 70
    } else if (uartdata == "I") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Blue))
        speed = 105
    } else if (uartdata == "J") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Yellow))
        speed = 140
    } else if (uartdata == "K") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Indigo))
        speed = 175
    } else if (uartdata == "L") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Purple))
        speed = 210
    } else if (uartdata == "M") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Black))
        speed = 255
    }
}
function Stop () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.White))
    robotbit.MotorStopAll()
}
function doLEDMode () {
    if (uartdata == "N") {
    	
    } else if (uartdata == "P") {
    	
    } else if (uartdata == "Q") {
    	
    } else if (uartdata == "R") {
    	
    } else if (uartdata == "W") {
    	
    }
}
let strip2: neopixel.Strip = null
let item = false
let uartdata = ""
let speed = 0
let connected = false
led.enable(false)
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
basic.showIcon(IconNames.Heart)
connected = false
speed = 255
basic.forever(function () {
    sendDistAndSpeed()
    basic.pause(200)
})
basic.forever(function () {
    strip2 = neopixel.create(DigitalPin.P2, 16, NeoPixelMode.RGB)
})
