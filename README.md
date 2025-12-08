# Lib404

# Web Application Development - MSIS207.Q13.CTTT

### Lecturer: Nguyễn Thanh Bình

### Lecturer: Trần Vĩnh Khiêm

## Members

| Student ID |       Full Name        |         Gmail          |
| :--------: | :--------------------: | :--------------------: |
|  23520733  | Đinh Anh Khoa - Leader | 23520733@gm.uit.edu.vn |
|  23521677  |    Nguyễn Đức Trung    | 23521677@gm.uit.edu.vn |

## Project Information

1. Group introduction website: [Lib404](https://lib404.vercel.app/)
2. Repository (Front-end): [Link](https://github.com/Khoaaaakkk/Lib404-Client)
3. Repository (Back-end): [Link](https://github.com/Khoaaaakkk/Lib404-Back-end)
4. Api-doc: [Link](https://app.swaggerhub.com/apis-docs/uit-773/Lib404-api/1.0.12#/)
5. Api Url: [Link](https://lib404-back-end-53zq.onrender.com)
6. Drive: [Link]()

## Project Setup

1. Create a new folder `C:\Users\Administrator\Documents\Github` -> go to the created folder
   - -> run `git clone https://github.com/Khoaaaakkk/Lib404-Client` for Front-end,
   - -> run `git clone https://github.com/Khoaaaakkk/Lib404-Back-end` for Back-end.

2. Open CMD in the `Lib404-Back-end` folder and run the following commands:
   - `npm install`
   - `copy .env.example .env`

- For Development
  - `npm run dev`

- For Production
  - `npm run start`

3. Create databases: (in the `Lib404-Back-end` folder)
   - Access Mongodb Atlas [Link](https://www.mongodb.com/products/platform/atlas-database) -> create a new database named `Lib404`
   - Run the database creation script as: `node src/import/databas.js`
4. Open 2 CMD windows in the `website-private` folder:
   - Window 1: run the command -> `php artisan serve`
   - Window 2: run the command -> `npm run dev`
5. Open CMD in the `Lib404-Client` folder and run the following commands:
   - `cd client`
   - `npm install`

- For Development
  - `npm run dev`
- For Production
  - `npm run build`
  - `npm run start`

6. Access the website: `localhost:3000` Port 3000 is set by default
7. The server api: `localhost:8080` Port 8080 is set by default
8. Go to the account section -> login as Admin
   - username: `admin`
   - password: `12345678`

## Project Overview

As in UIT, the library during the rush hours is crowded and hard to find an available seats. Students often go to the library without knowing if there are spots to rest, which consume times and reduces study efficiency. Knowing that, we propose a website that monitor real-time occupation of the library, and even pre-reversed a seats in advanced.

## Objectives

Our project aims to enhance the experience for UIT students in the University's library in rush hours:

1. **Creating a user-friendly, easy-to-navigate website:** The design focuses on intuitive and engaging interfaces to facilitate easy navigation for users.
2. **Offering a student-friendly environment:** The website appears to classified groups of student by theirs academic years which can help student more proactive in networking amongs schoolmates.
3. **Propose a information security:** Other students/users can only view the academic years of other user but not their full StudentID.
4. **Optimizing website functionality:** Guaranteeing a seamless browsing experience on both computers and mobile devices, enhancing accessibility and user satisfaction.

## Technologies Used

### Frameworks and Libraries:

- NextJS-React (Front-end only)
- Axios (Api calling)
- Tailwinds CSS
- NodeJs
- Express (Back-end server)
- JWT (Authentication)

### Development Tools:

- Visual Studio Code
- MongoDB Atlas (Cloud deployment)
- Word
- Swagger
- StarUML
- Github
- Copilot

### Languages:

- Typescript (version 5.9.3+)
- JavaScript (ES2017)
- Css

### Database:

- MongoDB
