import serial
import time

ser = serial.Serial("COM7", 115200, timeout=1)

try:
    while True:
        message = input("请输入指令 (A/B/C/D/Q退出): ").upper()
        # 消防车
        if message == "A":
            for i in range(3):
                time.sleep(0.3)
                ser.write(b'AAA')
                print("发送: A")
        elif message == "B":
            for i in range(3):
                time.sleep(0.3)
                ser.write(b"BBB")
                print("发送: B")
        elif message == "U":
            for i in range(3):
                ser.write(b"UUU")
                print("已经发送")


        elif message == "Q":
            print("退出程序")
            break

except KeyboardInterrupt:
    print("\n程序被中断")
except Exception as e:
    print(f"错误: {e}")
finally:
    if ser.is_open:
        ser.close()
        print("串口已关闭")