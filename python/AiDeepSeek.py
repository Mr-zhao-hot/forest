from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/api/chat', methods=['POST'])
def chat():
    # 硬编码配置
    OLLAMA_URL = "http://localhost:11434/api/chat"
    MODEL = "deepseek-r1:8b"
    HEADER = "你是一个嵌入式工程师"  # 写死的消息头
    FOOTER = "请用简单易懂的语言输出出来"  # 写死的消息尾

    # 获取用户消息
    user_message = request.json.get("content", "")
    if not user_message:
        return jsonify({"error": "必须提供content参数"}), 400

    # 构造完整消息（添加头尾）
    full_message = f"{HEADER}{user_message}{FOOTER}"

    # 直接调用Ollama
    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL,
                "messages": [{"role": "user", "content": full_message}],
                "stream": False  # 明确禁用流式
            },

        )
        response.raise_for_status()
        ai_response = response.json().get("message", {}).get("content", "")
        return jsonify({"response": ai_response})

    except Exception as e:
        return jsonify({"error": f"调用Ollama失败: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)