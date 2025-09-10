import serial
import serial.tools.list_ports

FRAME_LEN = 17  # 假设数据帧长度
FRAME_HEAD = 0x55  # 假设帧头字节


class SerialMonitor:
    def __init__(self, baud=115200, timeout=3):
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
            if len(data) == FRAME_LEN and data[0] == FRAME_HEAD:
                return data
            elif data:
                print(f"丢弃无效数据: {data}")
                return data

    def run(self):
        """持续打印串口数据"""
        print("开始接收数据 (按 Ctrl+C 停止)...")
        try:
            while True:
                data = self.read_data()
                # 打印原始字节和十六进制
                print(f"接收: {data} | HEX: {data.hex(' ')}")
                # 可选：解析为具体数值（示例）
                # if len(data) >= 17:   
                #     print(f"解析: CO2={(data[2] << 8) | data[3]}, Temp={data[12]}°C, Hum={data[13]}%")
        except KeyboardInterrupt:
            print("\n用户中断")
        finally:
            self.ser.close()
            print("串口已关闭")



if __name__ == "__main__":
    monitor = SerialMonitor(baud=115200)  # 修改为你的设备波特率
    monitor.run()