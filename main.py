def Rück():
    robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.RED))
    robotbit.motor_run(robotbit.Motors.M1A, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M1B, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M2A, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M2B, 0 - speed)
def L():
    robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.BLUE))
    robotbit.motor_run(robotbit.Motors.M1A, speed)
    robotbit.motor_run(robotbit.Motors.M1B, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M2A, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M2B, speed)
def doMode():
    if uartdata == "S":
        basic.show_icon(IconNames.CONFUSED)
    elif uartdata == "T":
        basic.show_icon(IconNames.ANGRY)
    elif uartdata == "U":
        basic.show_icon(IconNames.EIGTH_NOTE)
    elif uartdata == "V":
        basic.show_leds("""
            . . . . .
                        # . . . #
                        # # # # #
                        # . . . #
                        . # # # .
        """)

def on_bluetooth_connected():
    global connected, uartdata
    basic.show_icon(IconNames.HAPPY)
    basic.pause(1000)
    connected = True
    sendDistAndSpeed()
    while connected:
        uartdata = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
        doMotors()
        doMusic()
        doMode()
        doLEDColor()
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    global connected
    basic.show_icon(IconNames.SAD)
    connected = False
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def sendDistAndSpeed():
    if connected:
        bluetooth.uart_write_string("$CSB" + ("" + str(sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS))) + "," + ("" + str(speed)) + "#")
def doMotors():
    if uartdata == "A":
        Vor()
        basic.show_leds("""
            . # . # .
                        . # # # .
                        # # # # #
                        . # # # .
                        . . # . .
        """)
    elif uartdata == "B":
        Rück()
        basic.show_icon(IconNames.HOUSE)
    elif uartdata == "C":
        L()
        basic.show_leds("""
            . . # . .
                        . # # # #
                        # # # # .
                        . # # # #
                        . . # . .
        """)
    elif uartdata == "D":
        R()
        basic.show_leds("""
            . . # . .
                        # # # # .
                        . # # # #
                        # # # # .
                        . . # . .
        """)
    elif uartdata == "E":
        DL()
        basic.show_leds("""
            . # # # .
                        # . . . #
                        # # # . #
                        # # . . #
                        # . . . .
        """)
    elif uartdata == "F":
        DR()
        basic.show_leds("""
            . # # # .
                        # . . . #
                        # . # # #
                        # . . # #
                        . . . . #
        """)
    elif uartdata == "0":
        Stop()
        basic.show_icon(IconNames.NO)
def DR():
    robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.YELLOW))
    robotbit.motor_run(robotbit.Motors.M1A, speed)
    robotbit.motor_run(robotbit.Motors.M1B, speed)
    robotbit.motor_run(robotbit.Motors.M2A, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M2B, 0 - speed)
def Vor():
    robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.GREEN))
    robotbit.motor_run(robotbit.Motors.M1A, speed)
    robotbit.motor_run(robotbit.Motors.M1B, speed)
    robotbit.motor_run(robotbit.Motors.M2A, speed)
    robotbit.motor_run(robotbit.Motors.M2B, speed)
def doMusic():
    if uartdata == "1":
        music.play_tone(262, music.beat(BeatFraction.WHOLE))
    elif uartdata == "2":
        music.play_tone(294, music.beat(BeatFraction.WHOLE))
    elif uartdata == "3":
        music.play_tone(330, music.beat(BeatFraction.WHOLE))
    elif uartdata == "4":
        music.play_tone(349, music.beat(BeatFraction.WHOLE))
    elif uartdata == "5":
        music.play_tone(392, music.beat(BeatFraction.WHOLE))
    elif uartdata == "6":
        music.play_tone(440, music.beat(BeatFraction.WHOLE))
    elif uartdata == "7":
        music.play_tone(494, music.beat(BeatFraction.WHOLE))
    elif uartdata == "8":
        music.play_tone(523, music.beat(BeatFraction.WHOLE))
    elif uartdata == "B1":
        music.play_tone(277, music.beat(BeatFraction.WHOLE))
    elif uartdata == "B2":
        music.play_tone(311, music.beat(BeatFraction.WHOLE))
    elif uartdata == "B3":
        music.play_tone(370, music.beat(BeatFraction.WHOLE))
    elif uartdata == "B4":
        music.play_tone(415, music.beat(BeatFraction.WHOLE))
    elif uartdata == "B5":
        music.play_tone(466, music.beat(BeatFraction.WHOLE))
    elif uartdata == "O":
        pass
def DL():
    robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.BLUE))
    robotbit.motor_run(robotbit.Motors.M1A, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M1B, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M2A, speed)
    robotbit.motor_run(robotbit.Motors.M2B, speed)
def R():
    robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.YELLOW))
    robotbit.motor_run(robotbit.Motors.M1A, 0 - speed)
    robotbit.motor_run(robotbit.Motors.M1B, speed)
    robotbit.motor_run(robotbit.Motors.M2A, speed)
    robotbit.motor_run(robotbit.Motors.M2B, 0 - speed)
def doLEDColor():
    global speed
    # Red
    # Green
    # Blue
    # Yellow
    # Cyan
    # Pink
    # Off
    if uartdata == "G":
        robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.RED))
        speed = 35
    elif uartdata == "H":
        robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.GREEN))
        speed = 70
    elif uartdata == "I":
        robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.BLUE))
        speed = 105
    elif uartdata == "J":
        robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.YELLOW))
        speed = 140
    elif uartdata == "K":
        robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.INDIGO))
        speed = 175
    elif uartdata == "L":
        robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.PURPLE))
        speed = 210
    elif uartdata == "M":
        robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.BLACK))
        speed = 255
def Stop():
    robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.WHITE))
    robotbit.motor_stop_all()
def doLEDMode():
    if uartdata == "N":
        pass
    elif uartdata == "P":
        pass
    elif uartdata == "Q":
        pass
    elif uartdata == "R":
        pass
    elif uartdata == "W":
        pass
uartdata = ""
speed = 0
connected = False
item = False
bluetooth.set_transmit_power(7)
bluetooth.start_uart_service()
basic.show_icon(IconNames.HEART)
connected = False
speed = 100

def Avoid_mode():
    global item
    while True:
        if sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS) < 35 and sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.CENTIMETERS) != 0:
            item = Math.random_boolean()
            if item == True:
                robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.BLUE))
                L()
                basic.pause(800)
            if item == False:
                robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.YELLOW))
                R()
                basic.pause(800)
        else:
            Vor()
            robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.GREEN))

def on_forever():
    sendDistAndSpeed()
    basic.pause(200)
basic.forever(on_forever)
