const users = {}; // Store users in memory

const respondJSON = (response, status, object = null) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  if (object) {
    response.end(JSON.stringify(object));
  } else {
    response.end();
  }
};

const getUsers = (request, response) => {
  console.log(`${request.method} request received at /getUsers`);

  if (request.method === 'HEAD') {
    return respondJSON(response, 200);
  }

  return respondJSON(response, 200, { users });
};

const addUser = (request, response) => {
  console.log(`${request.method} request received at /addUser`);

  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    try {
      const { name, age } = JSON.parse(body);

      if (!name || !age) {
        return respondJSON(response, 400, { message: 'Missing name or age', id: 'missingParams' });
      }

      if (users[name]) {
        users[name].age = age;
        return respondJSON(response, 204); // No Content for updates
      }

      users[name] = { name, age };
      return respondJSON(response, 201, { message: 'User added successfully' });
    } catch (error) {
      return respondJSON(response, 400, { message: 'Invalid JSON format', id: 'invalidJSON' });
    }
  });
};

const notFound = (request, response) => {
  console.log(`${request.method} request received at ${request.url}`);

  if (request.method === 'HEAD') {
    return respondJSON(response, 404);
  }

  return respondJSON(response, 404, { message: 'Page not found', id: 'notFound' });
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
