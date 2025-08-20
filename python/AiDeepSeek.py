from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
import requests
import json

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
"""


@app.route('/api/chat', methods=['POST'])
def general_chat():
    """通用消防助手对话接口 - 流式版本"""
    user_message = request.json.get("content", "")
    if not user_message:
        return jsonify({"error": "必须提供content参数"}), 400

    def generate():
        try:
            # 调用Ollama API，启用流式传输
            response = requests.post(
                OLLAMA_URL,
                json={
                    "model": MODEL,
                    "messages": [
                        {"role": "system", "content": FIRE_ASSISTANT_PROMPT},
                        {"role": "user", "content": user_message}
                    ],
                    "stream": True  # 启用流式传输
                },
                stream=True,
                timeout=30
            )
            response.raise_for_status()

            # 逐块处理流式响应
            for line in response.iter_lines():
                if line:
                    decoded_line = line.decode('utf-8')
                    if decoded_line.strip():
                        try:
                            data = json.loads(decoded_line)
                            if 'message' in data and 'content' in data['message']:
                                content = data['message']['content']
                                # 发送SSE格式的数据
                                yield f"data: {json.dumps({'content': content})}\n\n"
                        except json.JSONDecodeError:
                            continue

            # 发送完成信号
            yield "data: [DONE]\n\n"

        except requests.exceptions.RequestException as e:
            error_msg = f"Ollama API调用失败: {str(e)}"
            yield f"data: {json.dumps({'error': error_msg})}\n\n"
        except Exception as e:
            error_msg = f"处理请求时出错: {str(e)}"
            yield f"data: {json.dumps({'error': error_msg})}\n\n"

    return Response(stream_with_context(generate()), mimetype='text/event-stream')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)