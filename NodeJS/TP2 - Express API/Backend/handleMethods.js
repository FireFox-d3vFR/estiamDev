const todos = [
  {
    userId: 1,
    id: 1,
    title: "Todo #1",
    completed: true,
  },
];

module.exports.handleGetAll = (req, res) => {
  res.status(200).json(todos);
};
module.exports.handleGetOne = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    res.status(404).json({ error: "Todo n'existe pas" });
  } else {
    res.status(200).json(todo);
  }
};

module.exports.handlePost = (req, res) => {
  const { userId, title, completed } = req.body;
  const newTodo = {
    userId,
    id: todos.length + 1, // générer un nouvel ID en incrémentant la longueur du tableau
    title,
    completed,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

module.exports.handlePut = (req, res) => {
  const id = parseInt(req.params.id);
  const { userId, title, completed } = req.body;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
  } else {
    todos[index] = { userId, id, title, completed };
    res.status(200).json(todos[index]);
  }
};

module.exports.handleDelete = (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
  } else {
    todos.splice(index, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  }
};
