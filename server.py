from flask import Flask, request

app = Flask(__name__)

@app.route('/chatbot', methods=['GET'])
def chatbot_endpoint():
    question = request.args.get('q')  # Get the 'q' query parameter

    # Your chatbot logic here (process the question)
    if question == "who are you?":
        response = "I'm a simple chatbot here to help!"
    else:
        response = "I'm still learning, can you ask something different?"

    return response
