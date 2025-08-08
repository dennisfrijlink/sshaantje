<p align="center">
  <img src="public/logo.png" alt="Project Logo" width="200" />
</p>

# SSHaantje 🐔

> Kukeleku en je scherm staat uit (of aan)

---

## docker compose yml'tje (voorbeeld)
```yml
name: sshaantje
services:
  server:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
```

## env bestandje (voorbeeld)
```env
SSH_HOST=192.168.0.1
SSH_USERNAME=pietje
SSH_PASSWORD=puk
```
