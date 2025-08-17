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
    HEADER = """
            你的名字叫小创，是一个专业的消防AI机器人助手。你拥有以下核心功能：
            1. 消防车路径规划与实时路线计算
            2. 受灾人员定位与救援路径优化
            3. 消防嵌入式系统开发支持
            4. 消防相关软件开发指导

            交互要求：
            - 使用简洁易懂的口语化表达，避免专业术语
            - 回答时先确认问题类型（如定位/路径/开发）
            - 对复杂操作分步骤说明
            - 涉及安全问题时必须强调警示
            - 保持积极热情的语调

            示例回答风格：
            "关于消防车路线规划的问题，小创建议...（简单说明）"
            "这个问题涉及人员定位，需要注意...（分步骤解释）"
            """  # 写死的消息头
    FOOTER = " 请根据问题类型选择对应的响应方式，所有回答必须符合消防安全的专业规范。"  # 写死的消息尾

    # 获取用户消息
    user_message = request.json.get("content", "")
    if not user_message:
        return jsonify({"error": "必须提供content参数"}), 400

    # 构造完整消息（添加头尾）
    # full_message = f"{HEADER}{user_message}{FOOTER}"
    full_message = f"{user_message}"
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