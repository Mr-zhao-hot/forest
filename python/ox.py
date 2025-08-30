import json
import requests
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    """接收前端发送的聊天内容，返回流式响应"""
    try:
        data = request.get_json()
        content = data.get('content', '').strip()

        if not content:
            return jsonify({"error": "内容不能为空"}), 400
        prompt_template = """
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

        full_prompt = prompt_template.format(user_content=content).strip()
        # 设置流式响应
        def generate():
            url = "http://127.0.0.1:11434/api/generate"
            payload = {
                "model": "deepseek-r1:8b",
                "prompt": full_prompt,
                "stream": True,
                "think":True
            }

            try:
                response = requests.post(url, json=payload, stream=True)
                response.raise_for_status()

                for line in response.iter_lines():
                    if line:
                        data = json.loads(line.decode('utf-8'))
                        if 'response' in data:
                            yield f"data: {json.dumps({'content': data['response']})}\n\n"
                        if data.get('done', False):
                            break

            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        return Response(generate(), mimetype='text/event-stream')

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 路线规划
@app.route('/api/chatFire', methods=['POST'])
def FireChat():
    """接收前端发送的聊天内容，返回流式响应"""
    try:
        data = request.get_json()
        content = data.get('content', '').strip()

        if not content:
            return jsonify({"error": "内容不能为空"}), 400
        FIRE_ROUTE_PROMPT = """
        你叫小创，是专业的消防路线规划AI。用户所有问题都应按以下方式响应：
        你是个演员 不要说任何话语 给你发了一句计算路线的时候就应该去当ai去假装计算路线 给你一个标准地点在林场
        1. 首先确认收到路线规划请求
        2. 然后模拟计算过程（3-5秒）

        注意：所有响应必须包含"正在计算"字样
        """

        full_prompt = FIRE_ROUTE_PROMPT.format(user_content=content).strip()

        # 设置流式响应
        def generate():
            url = "http://127.0.0.1:11434/api/generate"
            payload = {
                "model": "deepseek-r1:8b",
                "prompt": full_prompt,
                "stream": True,
                "think": True
            }

            try:
                response = requests.post(url, json=payload, stream=True)
                response.raise_for_status()

                for line in response.iter_lines():
                    if line:
                        data = json.loads(line.decode('utf-8'))
                        if 'response' in data:
                            yield f"data: {json.dumps({'content': data['response']})}\n\n"
                        if data.get('done', False):
                            break

            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        return Response(generate(), mimetype='text/event-stream')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/ControllerCar", methods=["POST"])
def controller_car():
    # 直接获取前端传来的数值
    fontMessage = str(request.json)
    with open("D:/tmp/output.txt", "w", encoding="utf-8") as f:
        f.write("1")
    return "OK"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)