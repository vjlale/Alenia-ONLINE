from flask import Flask, request, render_template_string, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
allowed_origins = os.environ.get('CORS_ORIGINS')
if allowed_origins:
    origins = [origin.strip() for origin in allowed_origins.split(',') if origin.strip()]
    CORS(app, resources={r"/api/*": {"origins": origins}})
else:
    CORS(app)
DB = os.environ.get('CRM_DB_PATH', 'crm_leads.db')

# Inicializar la base de datos
def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT NOT NULL,
        rubro TEXT NOT NULL,
        fecha TEXT NOT NULL
    )''')
    # Migración ligera: agregar columna nombre si falta
    try:
        c.execute('ALTER TABLE leads ADD COLUMN nombre TEXT')
    except sqlite3.OperationalError:
        pass
    conn.commit()
    conn.close()

# Inicializar BD al arrancar
init_db()

@app.route('/')
def home():
    return {'message': 'CRM KONTROL+ funcionando', 'version': '1.1', 'endpoints': ['/api/lead', '/api/leads', '/leads']}

@app.route('/api/lead', methods=['POST'])
def api_lead():
    # Diagnóstico: registrar headers y body (no imprimir datos sensibles en prod)
    try:
        raw_body = request.get_data(as_text=True)
    except Exception:
        raw_body = ''
    print('--- /api/lead REQUEST START ---')
    print('Headers:', dict(request.headers))
    print('Raw body:', raw_body)

    # Permitir tanto form-data como JSON
    if request.is_json:
        data = request.get_json(silent=True) or {}
        nombre = data.get('nombre', '')
        email = data.get('email')
        rubro = data.get('rubro')
    else:
        nombre = request.form.get('nombre', '')
        email = request.form.get('email')
        rubro = request.form.get('rubro')

    missing = []
    if not email:
        missing.append('email')
    if not rubro:
        missing.append('rubro')
    if missing:
        print('Missing fields:', missing)
        return {'ok': False, 'error': 'Faltan datos', 'missing': missing}, 400
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('INSERT INTO leads (nombre, email, rubro, fecha) VALUES (?, ?, ?, ?)', (nombre, email, rubro, fecha))
    conn.commit()
    conn.close()
    return {'ok': True}

@app.route('/api/leads', methods=['GET'])
def api_leads():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('SELECT nombre, email, rubro, fecha FROM leads ORDER BY id DESC')
    rows = c.fetchall()
    conn.close()
    
    leads = [
        {"nombre": nombre or "", "email": email, "rubro": rubro, "fecha": fecha}
        for nombre, email, rubro, fecha in rows
    ]
    return jsonify(leads)

@app.route('/leads')
def leads():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute('SELECT nombre, email, rubro, fecha FROM leads ORDER BY id DESC')
    rows = c.fetchall()
    conn.close()
    
    html = '''
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>CRM KONTROL+ - Panel Admin</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background: #0033cc; color: white; }
            tr:nth-child(even) { background: #f8f9fa; }
            .stats { background: #e9ecef; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <h1>🎯 CRM KONTROL+ - Panel de Administración</h1>
        <div class="stats">
            <strong>Total de descargas registradas: {{rows|length}}</strong>
        </div>
        <table>
            <tr><th>Nombre</th><th>Email</th><th>Rubro</th><th>Fecha de registro</th></tr>
            {% for nombre, email, rubro, fecha in rows %}
            <tr><td>{{nombre or ''}}</td><td>{{email}}</td><td>{{rubro}}</td><td>{{fecha}}</td></tr>
            {% endfor %}
        </table>
        <p><em>Actualización automática cada vez que se accede.</em></p>
    </body>
    </html>
    '''
    return render_template_string(html, rows=rows)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
