from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    # GANTI NAMA DI SINI! 👇
    data = {
        'nama': '{{NAMA}}',  # ⬅️ Ganti dengan nama teman kamu
        'tanggal': '31 December'
    }
    return render_template('index.html', **data)

if __name__ == '__main__':
    # Port untuk production (Render)
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)