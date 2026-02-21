import json
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

    configured_model = os.getenv("OPENROUTER_MODEL", "openrouter/free")
    fallback_models_env = os.getenv("OPENROUTER_FALLBACK_MODELS", "openrouter/free")
    fallback_models = [m.strip() for m in fallback_models_env.split(",") if m.strip()]
    candidate_models = []
    for candidate in [configured_model, *fallback_models]:
        if candidate and candidate not in candidate_models:
            candidate_models.append(candidate)

    resume_text = load_resume_text()
    system_prompt = build_system_prompt(resume_text)
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("SITE_URL", "http://localhost"),
        "X-Title": os.getenv("SITE_NAME", "Portfolio Assistant"),
    }

    last_error_message = "OpenRouter request failed"

    for model in candidate_models:
        payload = {
            "model": model,
            "temperature": 0.1,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message.strip()},
            ],
        }

        try:
            response = requests.post(OPENROUTER_URL, json=payload, headers=headers, timeout=30)
            if not response.ok:
                error_message = f"OpenRouter request failed with status {response.status_code}"
                try:
                    error_payload = response.json()
                    if isinstance(error_payload, dict):
                        api_error = error_payload.get("error", {})
                        if isinstance(api_error, dict) and api_error.get("message"):
                            error_message = str(api_error["message"])
                except (json.JSONDecodeError, ValueError, TypeError):
                    pass

                last_error_message = error_message
                # Model-specific unavailability should try the next fallback model.
                if (
                    "no endpoints found" in error_message.lower()
                    or response.status_code in (404, 429, 503)
                ):
                    continue
                raise ChatServiceError(error_message)

            data = response.json()
            reply = data["choices"][0]["message"]["content"].strip()
            return reply or "I don't know."
        except requests.RequestException as exc:
            last_error_message = f"OpenRouter request failed: {exc}"
            continue
        except (KeyError, IndexError, TypeError, ValueError) as exc:
            raise ChatServiceError("Unexpected OpenRouter response format") from exc

    raise ChatServiceError(
        f"{last_error_message}. Configure OPENROUTER_MODEL or OPENROUTER_FALLBACK_MODELS with available models."
    )
