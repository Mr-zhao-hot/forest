import requests
import json
import time  # 导入时间模块用于控制输出速度


def stream_with_requests(content):
    # 定义需要拦截的关键词
    target_keyword = "松树"

    # 检查输入内容是否包含目标关键词
    if target_keyword in content:
        response_text = f"抱歉，你说的{target_keyword}'这个东西，我可能不太理解。,我可以帮助你回答其他问题 你好呀！ 我是deepSeek可以帮助你回答问题 如果有什么需要的话请先给我发你好"
        # 逐字输出，模拟流式响应
        for char in response_text:
            print(char, end='', flush=True)  # 立即输出并刷新缓冲区
            time.sleep(0.05)  # 每个字符间隔50毫秒，可调整速度
        print()  # 输出完成后换行
        return

    ollama_url = "http://localhost:11434/api/generate"
    # 在函数内部使用传入的content创建payload
    ollama_payload = {
        "model": "deepseek-r1:8b",
        "prompt.txt": content,
        "stream": True,
        "think": False
    }

    try:
        with requests.post(ollama_url, json=ollama_payload, stream=True) as response:
            response.raise_for_status()  # 检查请求是否成功

            for line in response.iter_lines():
                if line:  # 过滤空行
                    # 解码并解析JSON
                    chunk = json.loads(line.decode('utf-8'))
                    # 输出响应内容
                    print(chunk.get("response", ""), end='', flush=True)
                    # 检查是否完成
                    if chunk.get("done"):
                        break
        print()  # 最后换行
    except requests.exceptions.RequestException as e:
        print(f"请求错误: {e}")
    except json.JSONDecodeError:
        print("解析响应时发生JSON错误")


if __name__ == "__main__":
    # 获取用户输入
    user_input = input("请输入你想要的内容: ")
    # 将用户输入作为参数传递给函数
    stream_with_requests(user_input)
