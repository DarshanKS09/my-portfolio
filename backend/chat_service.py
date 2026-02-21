import os
from pathlib import Path
from typing import Optional

import requests


ROOT_DIR = Path(__file__).parent
RESUME_PATH = ROOT_DIR / "resume.txt"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


class ChatServiceError(Exception):
    pass


def load_resume_text(path: Optional[Path] = None) -> str:
    resume_path = path or RESUME_PATH
    if not resume_path.exists():
        raise ChatServiceError(f"Resume file not found at {resume_path}")

    content = resume_path.read_text(encoding="utf-8").strip()
    if not content:
        raise ChatServiceError("Resume file is empty")
    return content


def build_system_prompt(resume_text: str) -> str:
    return (
        "You are the candidate's portfolio AI assistant. "
        "Answer questions using only the resume/portfolio facts below. "
        "If the answer is not explicitly supported by the provided content, reply exactly: "
        "\"I don't know.\" "
        "Do not guess, invent, or hallucinate. "
        "Keep responses concise, professional, and recruiter-friendly.\n\n"
        "Candidate Resume and Portfolio Facts:\n"
        f"{resume_text}"
    )


def generate_chat_reply(message: str) -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise ChatServiceError("OPENROUTER_API_KEY is not configured")

    model = os.getenv("OPENROUTER_MODEL", "meta-llama/llama-3.3-8b-instruct:free")
    resume_text = load_resume_text()
    system_prompt = build_system_prompt(resume_text)

    payload = {
        "model": model,
        "temperature": 0.1,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message.strip()},
        ],
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(OPENROUTER_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()
        reply = data["choices"][0]["message"]["content"].strip()
        return reply or "I don't know."
    except requests.RequestException as exc:
        raise ChatServiceError(f"OpenRouter request failed: {exc}") from exc
    except (KeyError, IndexError, TypeError, ValueError) as exc:
        raise ChatServiceError("Unexpected OpenRouter response format") from exc
