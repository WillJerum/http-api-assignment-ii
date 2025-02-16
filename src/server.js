const http = require('http');
const url = require('url'); // Import URL module

const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url, true); // Parse the URL

  switch (parsedUrl.pathname) { // Use pathname instead of full URL
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCss(request, response);
      break;
    case '/getUsers': // Corrected this line
      apiHandler.getUsers(request, response);
      break;
    case '/addUser':
      apiHandler.addUser(request, response);
      break;
    default:
      apiHandler.notFound(request, response); // Handle 404
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
