# Adoptopia (frontend)
## version 1.1.1
# เกี่ยวกับ project
> 

## ผู้จัดทำ
* อารียา สังข์ทอง 6210400752
* นายชยางกูร ฤทธิเดช 6210402381
* นายณรงค์ฤทธ์ ธรรมปาโล 6210402402
* สิรวิชญ์ วงษ์ศุทธิภากร 6210406700
#
### Project-Adoptopia (frontend) => https://github.com/Ford-Narongrit/Adoptopia-frontend
### Project-Adoptopia (Backend) => https://github.com/Ford-Narongrit/Adoptopia-backend
# Project setup in Local

```
npm install
cp .env.example .env
```

go config .env to connect database `VUE_APP_APIURL=`

### Compiles for development

```
npm run serve
```
Open http://localhost:8080 with your browser to see the result.

# Project setup with docker

- `docker build -t adoptopia-frontend .`
- `docker run -it -p 8080:8080 --rm --name adoptopia-frontend -d adoptopia-frontend`
