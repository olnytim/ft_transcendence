#!/usr/bin/env python3
"""
Скрипт для генерации безопасного Django SECRET_KEY
Использование: python tools/generate_secret_key.py
"""

import secrets
import string

def generate_secret_key(length=50):
    """Генерирует безопасный SECRET_KEY для Django"""
    alphabet = string.ascii_letters + string.digits + '!@#$%^&*(-_=+)'
    return ''.join(secrets.choice(alphabet) for _ in range(length))

if __name__ == '__main__':
    secret_key = generate_secret_key()
    print(f"DJANGO_SECRET_KEY={secret_key}")
