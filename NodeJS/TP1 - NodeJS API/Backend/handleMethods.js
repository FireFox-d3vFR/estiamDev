const todos = [
  {
    userId: 1,
    id: 1,
    title: "Mise en place d'une API avec NodeJS",
    completed: true,
  },
];

module.exports.todos = todos;

module.exports.handleMethods = (req, res) => {
  searchParams = req.url.split("/");
  console.log(searchParams);

  // Récupérer si todos est bien dans l'url
  const isTodos = searchParams.length >= 2 && searchParams[1] === "todos";
  // Récupérer l'id s'il est dans l'url
  const todoId =
    searchParams.length === 3 && searchParams[1] === "todos"
      ? Number(searchParams[2])
      : undefined;

  // Si dans l'url il y a todos
  if (isTodos) {
    switch (req.method) {
      case "GET":
        console.log("GET");
        handleGet(req, res, todoId);
        break;

      case "POST":
        console.log("POST");
        handlePost(req, res);
        break;

      case "PUT":
        console.log("PUT");
        handlePut(req, res, todoId);
        break;

      case "DELETE":
        console.log("DELETE");
        handleDelete(req, res, todoId);
        break;

      default:
        console.log("405");
        res.writeHead(405);
        res.end("Method not implemented");
    }
  } else {
    console.log("404");
    res.writeHead(404);
    res.end("Not found");
  }
};

function handleGet(req, res, todoId) {
  console.log("GET reçu");
  // Si l'id n'est pas indiqué dans l'url
  // retourne le GET ALL
  if (todoId === undefined) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Default-Encoding": "utf-8",
    });
    res.end(JSON.stringify(todos));
  } else {
    // GET ONE
    const todo = todos.find((item) => item.id === todoId);

    if (todo) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Default-Encoding": "utf-8",
      });
      res.end(JSON.stringify(todo));
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}

async function handlePost(req, res) {
  console.log("POST reçu");

  try {
    // Récupérer le json qui est dans le body de la requête
    const body = await getBody(req);

    // test si le json est au bon format
    if (checkJSON(body)) {
      // ajoute un nouvel id
      if (todos.length >= 1) {
        body.id = todos[todos.length - 1].id + 1;
      } else {
        body.id = 1;
      }

      // ajoute le nouveau todo dans la liste
      todos.push(body);
      res.writeHead(201, {
        "Content-Type": "application/json",
        "Default-Encoding": "utf-8",
      });
      res.end(JSON.stringify(body));
    } else {
      res.writeHead(400);
      res.end();
    }
  } catch (error) {
    // Gérer les erreurs de corps de requête vide
    console.log("Erreur lors de la gestion de la requête POST:", error);
    res.writeHead(400);
    res.end();
  }
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req
      .on("data", (data) => {
        body += data;
      })
      .on("end", () => {
        // Vérifie si le corps de la requête est vide
        if (body.trim().length === 0) {
          reject("Empty request body");
        } else {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        }
      });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

function checkJSON(json) {
  if (
    json.hasOwnProperty("userId") &&
    json.hasOwnProperty("title") &&
    json.hasOwnProperty("completed")
  ) {
    return true;
  }
  return false;
}

async function handlePut(req, res, todoId) {
  console.log("PUT reçu");

  let index = todos.findIndex((item) => item.id === todoId);

  // si le todo existe
  if (index != -1) {
    // récupérer le json qui est dans le body de la requête
    const body = await getBody(req);

    // mettre à jour les données du todo
    todos[index].userId = body.userId;
    todos[index].title = body.title;
    todos[index].completed = body.completed;

    res.writeHead(201, {
      "Content-Type": "application/json",
      "Default-Encoding": "utf-8",
    });
    res.end(JSON.stringify(body));
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
}

function handleDelete(req, res, todoId) {
  console.log("DELETE reçu");

  let index = todos.findIndex((item) => item.id === todoId);

  // si le todo existe
  if (index != -1) {
    // supprime le todo du tableau
    todos.splice(index, 1);
    res.writeHead(200);
    res.end();
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
}
