FROM python:3.9-slim

WORKDIR /app/backend

COPY requirements.txt ./requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/backend/requirements.txt

COPY src ./src

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]
