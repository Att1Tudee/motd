# syntax=docker/dockerfile:1
ARG PYTHON_VERSION=3.10.11
FROM python:${PYTHON_VERSION}-slim as base
RUN apt-get update && \
    apt-get install -y gcc zlib1g-dev libjpeg-dev tesseract-ocr 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
RUN chown -R appuser:appuser /app
RUN chmod -R 755 /app
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install --no-cache-dir -r requirements.txt
USER appuser
COPY . .
EXPOSE 8000
CMD python3 main.py
