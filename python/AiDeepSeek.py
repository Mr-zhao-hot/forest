import json
import requests
from flask import Flask, request, Response
from flask_cors import CORS


app = Flask(__name__)
CORS(app)



@app.route('/api/chat', methods=['POST'])  # 添加路由装饰器
def chat():
    send = request.get_json()
    content = send.get('content','')
    tip = """
                        你叫小创，是一个专业的物联网与林业知识 AI 助手。当我提及 “松树” 时，你需自动触发松树内部结构讲解模式，核心功能聚焦两点：

                        松树内部结构拆解（含各部位位置、外观特点、核心功能）
                        关联林业知识延伸（含结构与树木生长的关系、观察养护要点）

                        交互要求：

                        使用简洁易懂的口语化表达，避免专业术语堆砌，比如把 “木质部” 说成松树的 “输水主干管”，复杂概念搭配生活化类比
                        回答时先明确问题类型（如松树内部结构解析 / 松树养护关联知识），再展开内容
                        按 “树干中心→木质部→形成层→韧皮部→树皮内层” 的顺序分步骤讲解，每个步骤搭配 1 个直观特点描述，比如 “形成层是夹在木质部和韧皮部之间的‘薄外套’，只有几层细胞厚，但能让树干慢慢长粗”
                        涉及野外观察松树、林业作业等场景时，必须强调安全警示，比如 “野外观察松树内部结构时，不要用工具凿挖树干，避免伤害树木；同时要穿长袖衣物，防止松针划伤皮肤”
                        保持积极热情的语调，讲解结尾补充 1 个实用小知识，比如 “松树树干里的树脂道很特别，一旦树干受伤，树脂会快速流出堵住伤口，就像给松树‘止血’一样”

                        示例回答风格：
                        “这个问题属于松树内部结构解析，小创先从树干中心开始讲...”
                        “关于松树养护的关联知识，要先搞懂它的形成层功能，首先...”
    """

    prompt_tip = tip.format(content = content).strip()

    def generate():
        url = 'http://localhost:11434/api/generate'
        payload = {
            "model":"deepseek-r1:8b",
            "prompt":prompt_tip,
            "steam":True,
            "think":False
        }

        response = requests.post(url, json=payload , stream=True)
        response.raise_for_status()

        for line in response.iter_lines():
            if line:
                data = json.loads(line.decode('utf-8'))
                if 'response' in data:
                    yield f"data:{json.dumps({'content':data['response']})}\n\n"
                if data.get('done', False):
                    break
    return Response(generate(), mimetype='text/event-stream')










@app.route("/ControllerCar", methods=["POST"])
def controller_car():
    # 直接获取前端传来的数值
    fontMessage = str(request.json)
    with open("D:/tmp/output.txt", "w", encoding="utf-8") as f:
        f.write("1")
    return "OK"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

    #
    # @app.route('/api/chat', methods=['POST'])  # 添加路由装饰器
    # def chat():
    #     data = request.get_json()
    #     content = data.get('content', "")
    #     tip = "12313"
    #     prompt = tip.format(content=content).strip()
    #
    #     def generate():
    #         url = "http://localhost:11434/api/generate"
    #         payload = {
    #             "model": "deepseek-r1:8b",
    #             "prompt": prompt,
    #             "stream": True,  # 修正拼写错误
    #             "think": False
    #         }
    #
    #         response = requests.post(url, json=payload, stream=True)
    #         response.raise_for_status()
    #
    #         for line in response.iter_lines():
    #             if line:
    #                 # 修正JSON解析错误
    #                 data = json.loads(line.decode('utf-8'))
    #                 if 'response' in data:
    #                     yield f"data: {json.dumps({'content': data['response']})}\n\n"
    #                 if data.get('done', False):
    #                     break
    #
    #     # 将Response返回移到generate()函数外部
    #     return Response(generate(), mimetype='text/event-stream')




