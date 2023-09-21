from flask import Flask, Response, stream_with_context
from flask_cors import CORS, cross_origin
import time
import random
import string

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def generate_random_text():
    """Generate random text of 10 characters."""
    return ''.join(random.choice(string.ascii_letters) for _ in range(10))

@app.route('/ping', methods=['GET'])
@cross_origin()
def ping_endpoint():
    def generate():
        for _ in range(5):
            time.sleep(0.5)  # 500ms delay
            random_text = generate_random_text()
            yield random_text + '\n'
    
    return stream_with_context(generate())

if __name__ == '__main__':
    app.run(debug=True)