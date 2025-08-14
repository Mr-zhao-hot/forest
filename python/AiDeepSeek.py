from flask import Flask, request, jsonify
from flask_cors import CORS
import requests  # 用于向Ollama发送请求

app = Flask(__name__)
CORS(app)

# Ollama API配置
OLLAMA_API_URL = "http://localhost:11434/api/chat"
DEFAULT_MODEL = "deepseek-r1:8b"

# 嵌入式专业知识库
embedded_knowledge = {
    "debugging": {
        "keywords": ["debug", "调试", "排查"],
        "response": """嵌入式调试建议：
        1. 使用JTAG/SWD调试器
        2. 检查硬件连接
        3. 查看寄存器状态
        4. 使用逻辑分析仪"""
    },
    "rtos": {
        "keywords": ["rtos", "实时系统"],
        "response": """常见RTOS选择:
        - FreeRTOS (轻量级)
        - Zephyr (物联网友好)
        - RT-Thread (国产优秀RTOS)"""
    },
    "power": {
        "keywords": ["低功耗", "power", "节能"],
        "response": """低功耗设计要点:
        1. 使用睡眠模式
        2. 动态调整时钟频率
        3. 关闭未用外设"""
    }
}


def is_embedded_question(prompt):
    """检查是否是嵌入式专业问题"""
    prompt_lower = prompt.lower()
    for topic in embedded_knowledge.values():
        if any(keyword in prompt_lower for keyword in topic["keywords"]):
            return True
    return False


def get_embedded_response(prompt):
    """获取嵌入式专业回答"""
    prompt_lower = prompt.lower()
    for topic_id, topic in embedded_knowledge.items():
        if any(keyword in prompt_lower for keyword in topic["keywords"]):
            return topic["response"]
    return None


def ask_ollama(messages, model=DEFAULT_MODEL, stream=False):
    """向Ollama发送请求"""
    payload = {
        "model": model,
        "messages": messages,
        "stream": stream
    }
    try:
        response = requests.post(OLLAMA_API_URL, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("messages", [{}])[-1].get("content", "")

    # 如果是嵌入式专业问题
    if is_embedded_question(user_message):
        embedded_response = get_embedded_response(user_message)
        if embedded_response:
            return jsonify({
                "model": "embedded-expert",
                "messages": [{
                    "role": "assistant",
                    "content": embedded_response + "\n\n(这是来自嵌入式专家的回答)"
                }]
            })

    # 普通问题转发给Ollama
    ollama_response = ask_ollama(data.get("messages", []))
    if "error" in ollama_response:
        return jsonify({
            "model": "error",
            "messages": [{
                "role": "assistant",
                "content": f"无法连接Ollama服务: {ollama_response['error']}"
            }]
        }), 502

    return jsonify(ollama_response)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)