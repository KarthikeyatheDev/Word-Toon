from flask import Flask, request, jsonify
from flask_cors import CORS
from diffusers import DiffusionPipeline
from diffusers import StableDiffusionPipeline
import torch
import base64
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

device = "cuda" if torch.cuda.is_available() else "cpu"

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")


def split_story_into_prompts(story):
    sentences = [s.strip() for s in story.split('.') if len(s.strip()) > 10]
    return sentences[:4]  # max 4 panels for MVP

def image_to_base64(image):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buffered.getvalue()).decode()

@app.route("/generate", methods=["POST"])
def generate_images():
    data = request.get_json()
    story = data.get("story", "")
    if not story:
        return jsonify({"error": "No story provided"}), 400

    prompts = split_story_into_prompts(story)
    images = []

    for i, prompt in enumerate(prompts):
        try:
            img = pipe(prompt).images[0]
            img_b64 = image_to_base64(img)
            images.append({"prompt": prompt, "image": img_b64})
        except Exception as e:
            images.append({"prompt": prompt, "error": str(e)})

    return jsonify({"panels": images})
if __name__ == "__main__":
    app.run(debug=True)
