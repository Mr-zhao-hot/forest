import json
from urllib import request

from flask import Flask, request, jsonify
import serial
import serial.tools.list_ports
from flask import Flask
from flask_cors import CORS
import fire as f

app = Flask(__name__)
CORS(app)

# 共享配置
OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "deepseek-r1:8b"

# 系统提示模板
FIRE_ASSISTANT_PROMPT = """
你叫小创，是一个专业的消防AI机器人助手。你拥有以下核心功能：
1. 消防车路径规划与实时路线计算
2. 受灾人员定位与救援路径优化
3. 消防嵌入式系统开发支持
4. 消防相关软件开发指导

交互要求：
- 使用简洁易懂的口语化表达
- 回答时先确认问题类型（如定位/路径/开发）
- 对复杂操作分步骤说明
- 涉及安全问题时必须强调警示
- 保持积极热情的语调

示例回答风格：
"关于消防车路线规划的问题，小创建议..."
"这个问题涉及人员定位，需要注意..."
"""

FIRE_ROUTE_PROMPT = """
你叫小创，是专业的消防路线规划AI。用户所有问题都应按以下方式响应：
你是个演员 不要说任何话语 给你发了一句计算路线的时候就应该去当ai去假装计算路线 给你一个标准地点在林场
1. 首先确认收到路线规划请求
2. 然后模拟计算过程（3-5秒）

注意：所有响应必须包含"正在计算"字样
"""


def call_ollama(prompt, user_message):
    """调用Ollama API的通用函数（流式处理）"""
    try:
        import requests
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL,
                "messages": [
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": user_message}
                ],
                "stream": True
            },
            timeout=30,
            stream=True  # 添加stream参数
        )
        response.raise_for_status()

        # 处理流式响应
        full_response = ""
        for line in response.iter_lines():
            if line:
                line_data = json.loads(line.decode('utf-8'))
                if 'message' in line_data and 'content' in line_data['message']:
                    full_response += line_data['message']['content']

        return full_response

    except requests.exceptions.RequestException as e:
        raise Exception(f"Ollama API调用失败: {str(e)}")
    except json.JSONDecodeError as e:
        raise Exception(f"JSON解析失败: {str(e)}")


from flask import Response, stream_with_context
import json

@app.route('/api/chat', methods=['POST'])
def general_chat():
    """通用消防助手对话接口（真正的流式响应）"""
    user_message = request.json.get("content", "")
    if not user_message:
        return jsonify({"error": "必须提供content参数"}), 400

    try:
        def generate():
            import requests
            response = requests.post(
                OLLAMA_URL,
                json={
                    "model": MODEL,
                    "messages": [
                        {"role": "system", "content": FIRE_ASSISTANT_PROMPT},
                        {"role": "user", "content": user_message}
                    ],
                    "stream": True
                },
                timeout=30,
                stream=True
            )
            response.raise_for_status()

            for line in response.iter_lines():
                if line:
                    try:
                        line_data = json.loads(line.decode('utf-8'))
                        if 'message' in line_data and 'content' in line_data['message']:
                            content = line_data['message']['content']
                            # 以流式方式返回每个数据块
                            yield f"data: {json.dumps({'chunk': content})}\n\n"
                    except json.JSONDecodeError:
                        continue

        return Response(stream_with_context(generate()), mimetype='text/event-stream')

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/chatFire', methods=['POST'])
def fire_route_chat():
    """专用消防路线规划接口"""
    user_message = request.json.get("content", "")
    if not user_message:
        return jsonify({"error": "必须提供content参数"}), 400

    try:
        ai_response = call_ollama(FIRE_ROUTE_PROMPT, user_message)
        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/ControllerCar", methods=["POST"])
def controller_car():
    # 直接获取前端传来的数值
    fontMessage = str(request.json)
    with open("D:/tmp/output.txt", "w", encoding="utf-8") as f:
        f.write("1")
    return "OK"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)