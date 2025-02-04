import {app} from './app.js'
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});


//fetch method gitub API get
// app.get("/api/v1/github", (req, res, next) => {
//   fetch("https://api.github.com/users/xetnopnawab")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//        console.log(data);
//       res.send(data);
//     })
//     .catch(() => console.log(`error`));
// });

//Axios method
app.get("/api/v1/github", (req, res, next) => {
  axios
    .get("https://api.github.com/users/xetnopnawab")
    .then((response) => {
      res.send(response.data);
    })

    .catch((error) => {
      console.log(error);
    });
});

app.get("/api/v1/jokes", (req, res, next) => {
  const jokes = [
    {
      id: 1,
      title: "A joke",
      content: "This is joke",
    },
    {
      id: 2,
      title: "Another jokes",
      content: "This is another joke",
    },
    {
      id: 3,
      title: "Third joke",
      content: "This is Third joke",
    },
    {
      id: 4,
      title: "Fourth joke",
      content: "This is Fourth joke",
    },
    {
      id: 5,
      title: "A joke",
      content: "This is joke",
    },
    {
      id: 6,
      title: "A joke Morn",
      content: "This is joke add 6",
    },
  ];
  res.send(jokes);
});

app.get("/", (req, res, next) => {
  res.send("hello user");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is running on port https://localhost:${process.env.PORT}`
  );
});