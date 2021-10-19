# Adoptopia

### Project-final Webtech (frontend)

## Project setup

```
npm install
cp .env.example .env
```

go config .env to connect database

Open http://localhost:8080 with your browser to see the result.

### Compiles for development

```
npm run serve
```

### Compiles for production

```
npm run build
```

### structure

```
.
|-- pubilc
|
|-- src
|   |- assests (เก็บ CSS กับ image)
|   |- components
|   |- layout
|   |- router
|   |- store
|   |- views
|   |- App.vue
|   |- main.js
|-- tailwind.config.js (เพิ่ม config tailwind ในนี้)
```

## route

- /
- /login
- /register
- /user/id

## docker

- `docker build -t adoptopia-frontend .`
- `docker run -it -p 8080:8080 --rm --name adoptopia-frontend -d adoptopia-frontend`
