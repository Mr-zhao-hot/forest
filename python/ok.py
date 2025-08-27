import time

import serial
import serial.tools.list_ports
import fire as f

FRAME_LEN = 17  # 假设数据帧长度
FRAME_HEAD = 0x55  # 假设帧头字节

class SerialMonitor:
    def __init__(self, baud=115200, timeout=3):
        self.count = 0
        """初始化串口"""
        # self.uart_port = self._find_serial_port()
        self.uart_port = "COM7"
        if not self.uart_port:
            raise RuntimeError("未找到可用串口设备")


        try:
            self.ser = serial.Serial(
                port=self.uart_port,
                baudrate=baud,
                timeout=timeout
            )
            print(f"已连接串口: {self.uart_port} (波特率 {baud})")
        except Exception as e:
            raise RuntimeError(f"串口连接失败: {e}")

    def _find_serial_port(self):
        """自动查找可用串口"""
        ports = serial.tools.list_ports.comports()
        if not ports:
            print("警告: 未检测到任何串口设备")
            return None
        return ports[0].device



    def read_data(self):
        """读取并验证数据帧"""
        while True:
            data = self.ser.read(FRAME_LEN)
            if data:
                # print(f"接收到数据: {data}")
                return data


    def ControllerCar(self):
        x = True
        y = 0
        while x:
            time.sleep(1)
            with open("D:/tmp/output.txt", "r", encoding="utf-8") as f:
                content = f.read()  # 一次性读取所有内容
            if content == "1":
                self.count = 0
                while self.count < 2:
                    time.sleep(1)
                    self.count += 1
                    self.ser.write(b"A")
                    print("已经发送数据")
                with open("D:/tmp/output.txt", "w", encoding="utf-8") as f:
                    f.write("0")
                x = False
            else:
                y += 1
                print(y)



    def run(self):
        """持续打印串口数据"""
        print("开始接收数据 (按 Ctrl+C 停止)...")
        try:
            # data = self.read_data()
            # print(f"接收: {data} | HEX: {data.hex(' ')}")
            self.ControllerCar()
        except KeyboardInterrupt:
            print("\n用户中断")
        finally:
            self.ser.close()
            print("串口已关闭")



if __name__ == "__main__":
    monitor = SerialMonitor(baud=115200)  # 修改为你的设备波特率
    monitor.run()