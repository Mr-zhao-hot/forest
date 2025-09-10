import os
import tkinter as tk
from tkinter import filedialog, messagebox
import random
import re

KEYWORDS = ["if", "for", "while", "return", "function", "else", "class", "try", "except",
            "elif", "finally", "break", "continue", "import", "from", "def", "with", "as",
            "print", "input", "True", "False", "None", "and", "or", "not", "in", "is"]

class PseudoEditor:
    def __init__(self, root: tk.Tk, code_text: str):
        self.root = root
        self.code_text = code_text
        self.idx = 0

        # 主框架
        self.frame = tk.Frame(root, bg="#1e1e1e")
        self.frame.pack(fill="both", expand=True)

        # 行号栏（保持原样式修改）
        self.linenumbers = tk.Text(self.frame, width=3, padx=20, pady=6, takefocus=0,
                                   border=0, background="#DFDFDF", foreground="#858585",
                                   state="disabled", wrap="none", font=("Consolas", 14))
        self.linenumbers.pack(side="left", fill="y")

        # Canvas + Text 容器
        self.canvas_frame = tk.Frame(self.frame)
        self.canvas_frame.pack(side="left", fill="both", expand=True)

        # Canvas 绘制缩进线
        self.canvas = tk.Canvas(self.canvas_frame, bg="#1e1e1e", highlightthickness=0)
        self.canvas.pack(fill="both", expand=True, side="left")

        # Text 编辑区（保持原样式修改）
        self.text = tk.Text(self.canvas_frame, wrap="none", undo=True, autoseparators=True,
                            font=("Consolas", 14),
                            padx=10, pady=5,
                            background="#ffffff",
                            foreground="#000000",
                            insertbackground="#000000",
                            selectbackground="#264f78",
                            borderwidth=0, highlightthickness=0)
        self.text.place(relx=0, rely=0, relwidth=1, relheight=1)
        self.text.lift()

        # 滚动条
        self.scrollbar = tk.Scrollbar(self.canvas_frame, command=self.on_scroll)
        self.scrollbar.pack(side="right", fill="y")
        self.text.config(yscrollcommand=self.scrollbar.set)

        # 状态栏（保持原样式修改）
        self.status = tk.Label(root, text="Ready", anchor="w",
                               bg="#007acc", fg="white", font=("Consolas", 12))
        self.status.pack(fill="x", side="bottom")

        # 复制按钮（保持原样式修改）
        copy_btn = tk.Button(self.status, text="复制", command=self.copy_all,
                             bg="#007acc", fg="white", relief="flat", font=("Consolas", 12))
        copy_btn.pack(side="right", padx=5)

        # 标签样式（保持原修改）
        self.text.tag_configure("error", background="#5c0000", foreground="#ffffff")
        self.text.tag_configure("keyword", foreground="#9333EA")
        self.text.tag_configure("string", foreground="#CE9178")
        self.text.tag_configure("comment", foreground="#6A9955")

        self.line_errors = {}  # {行号: [index1, index2,...]}

        # 绑定事件（保持原绑定）
        self.text.bind("<Key>", self.keypress_handler, add=False)
        self.text.bind("<KeyRelease>", self.on_key_release)
        self.text.bind("<MouseWheel>", lambda e: self.sync_scroll())
        self.linenumbers.bind("<MouseWheel>", lambda e: self.sync_scroll())

        # 右键菜单复制（保持原逻辑）
        menu = tk.Menu(self.text, tearoff=0)
        menu.add_command(label="复制", command=lambda: self.text.event_generate("<<Copy>>"))
        self.text.bind("<Button-3>", lambda e: menu.tk_popup(e.x_root, e.y_root))

        self.text.focus_set()
        self.update_linenumbers()
        self.draw_indent_lines()

    # 复制全部内容到剪贴板（原逻辑不变）
    def copy_all(self):
        self.root.clipboard_clear()
        self.root.clipboard_append(self.text.get("1.0", "end-1c"))
        self.root.update()
        self.status.config(text="已复制全部代码")

    # 滚动同步（原逻辑不变）
    def on_scroll(self, *args):
        self.text.yview(*args)
        self.linenumbers.yview(*args)
        self.draw_indent_lines()

    # 同步滚动（原逻辑不变）
    def sync_scroll(self):
        self.linenumbers.yview_moveto(self.text.yview()[0])
        self.draw_indent_lines()
        return "break"

    # 更新行号（关键修改：行号更新后同步滚动位置）
    def update_linenumbers(self):
        self.linenumbers.config(state="normal")
        self.linenumbers.delete("1.0", "end")
        lines = self.text.get("1.0", "end-1c").split("\n")
        for i in range(1, len(lines) + 1):
            self.linenumbers.insert("end", f"{i}\n")
        self.linenumbers.config(state="disabled")
        # -------------------------- 修复1：行号更新后同步文本区滚动位置 --------------------------
        self.linenumbers.yview_moveto(self.text.yview()[0])

    # 按键处理（关键修改：插入字符后同步行号栏滚动）
    def keypress_handler(self, event):
        # Ctrl+C 支持（原逻辑不变）
        if (event.state & 0x4) and event.keysym.lower() == 'c':
            return

        current_line = int(self.text.index("insert").split(".")[0])
        errors_in_line = self.line_errors.get(current_line, [])

        if event.keysym == "BackSpace":
            if errors_in_line:
                last_error = errors_in_line.pop()
                self.text.delete(last_error, f"{last_error}+1c")
                self.text.tag_remove("error", last_error, f"{last_error}+1c")
                self.line_errors[current_line] = errors_in_line
                if not errors_in_line:
                    self.status.config(text="Ready")
            else:
                if self.idx > 0:
                    self.idx -= 1
                    self.text.delete("end-2c")
                    self.text.see("end-1c")  # 滚动到删除后的末尾
        else:
            if errors_in_line:
                return "break"
            if self.idx < len(self.code_text):
                char = self.code_text[self.idx]

                num_errors = len(errors_in_line)
                if num_errors:
                    wrong_char = random.choice("abcdefghijklmnopqrstuvwxyz{}[];()")
                    pos = self.text.index("end-1c")
                    self.text.insert("end", wrong_char)
                    self.text.tag_add("error", pos, f"{pos}+1c")
                    errors_in_line.append(pos)
                    self.line_errors[current_line] = errors_in_line
                    self.status.config(text=f"Error: Unexpected token \'{wrong_char}\'")
                    self.text.see("end-1c")  # 插入错误字符后滚动到末尾
                    # -------------------------- 修复2：插入错误字符后同步行号栏滚动 --------------------------
                    self.linenumbers.yview_moveto(self.text.yview()[0])
                else:
                    self.text.insert("end", char)
                    self.idx += 1
                    self.text.see("end-1c")  # 插入正常字符后滚动到末尾
                    # -------------------------- 修复3：插入正常字符后同步行号栏滚动 --------------------------
                    self.linenumbers.yview_moveto(self.text.yview()[0])
        return "break"

    # 键释放事件（原逻辑不变）
    def on_key_release(self, event=None):
        self.update_linenumbers()
        self.highlight_all_lines()
        self.draw_indent_lines()

    # 高亮关键字、字符串、注释（原逻辑不变）
    def highlight_all_lines(self):
        lines = self.text.get("1.0", "end-1c").split("\n")
        for i, line in enumerate(lines):
            line_no = i + 1
            line_start = f"{line_no}.0"
            line_end = f"{line_no}.end"

            # 清除旧标签
            for tag in ["keyword", "string", "comment"]:
                self.text.tag_remove(tag, line_start, line_end)

            # 关键字高亮
            for kw in KEYWORDS:
                for match in re.finditer(rf"\b{kw}\b", line):
                    start = f"{line_no}.{match.start()}"
                    end = f"{line_no}.{match.end()}"
                    self.text.tag_add("keyword", start, end)

            # 字符串高亮
            for match in re.finditer(r'"[^"]*"|\'[^\']*\'', line):
                start = f"{line_no}.{match.start()}"
                end = f"{line_no}.{match.end()}"
                self.text.tag_add("string", start, end)

            # 注释高亮
            comment_idx = line.find("//")
            if comment_idx != -1:
                start = f"{line_no}.{comment_idx}"
                end = line_end
                self.text.tag_add("comment", start, end)

    # 绘制 VSCode 风格缩进线（原逻辑不变）
    def draw_indent_lines(self):
        self.canvas.delete("all")
        lines = self.text.get("1.0", "end-1c").split("\n")
        char_width = self.text.winfo_width() / (
            len(lines[0]) if lines and len(lines[0]) > 0 else 1) if lines else 8
        tab_width = 4  # 一个tab等于4个空格

        # 获取可见区域的行号
        first_visible_line = int(self.text.index("@0,0").split(".")[0])
        last_visible_line = int(self.text.index(f"@{self.text.winfo_width()},{self.text.winfo_height()}").split(".")[0])

        # 计算每行缩进级别
        indent_levels = []
        for i, line in enumerate(lines):
            leading_spaces = len(line) - len(line.lstrip(' '))
            indent_levels.append(leading_spaces // tab_width)

        # 绘制缩进线
        for i in range(first_visible_line - 1, last_visible_line):
            if i < 0 or i >= len(lines):
                continue

            line_no = i + 1
            info = self.text.dlineinfo(f"{line_no}.0")
            if info is None:
                continue

            y_start = info[1]
            y_end = info[1] + info[3]
            current_indent = indent_levels[i]

            # 绘制当前行的每一级缩进线
            for level in range(current_indent):
                x = self.text.winfo_x() + 10 + level * tab_width * char_width

                # 确定缩进线的结束位置
                line_end_y = y_end
                for j in range(i + 1, len(lines)):
                    if indent_levels[j] <= level:
                        next_info = self.text.dlineinfo(f"{j + 1}.0")
                        if next_info:
                            line_end_y = next_info[1]
                        break
                    else:
                        next_info = self.text.dlineinfo(f"{j + 1}.0")
                        if next_info:
                            line_end_y = next_info[1] + next_info[3]
                        else:
                            line_end_y = y_end

                self.canvas.create_line(x, y_start, x, line_end_y, fill="#3c3c3c", width=1)


def main():
    root = tk.Tk()
    root.withdraw()
    root.title("app.py")
    # 选择文件
    filepath = filedialog.askopenfilename(title="选择一个文件",
                                          filetypes=[("所有文件", "*.*")])

    if not filepath:
        messagebox.showinfo("提示", "未选择文件，程序退出。")
        root.destroy()
        return

    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            code_text = f.read()
    except Exception as e:
        messagebox.showerror("错误", f"读取文件失败：{e}")
        root.destroy()
        return

    root.deiconify()
    # 最大化窗口
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    root.geometry(f"{screen_width}x{screen_height}+0+0")

    app = PseudoEditor(root, code_text)
    root.mainloop()


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        messagebox.showerror("错误", str(e))