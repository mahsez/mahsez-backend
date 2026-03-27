import type { Request, Response } from 'express';
// import httpStatus from 'http-status';

const NotFound = (req: Request, res: Response) => {
  //   res.status(404).send('Route not found');
  //   return res.status(httpStatus.NOT_FOUND).json({
  //     success: false,
  //     message: 'API Not Found !!',
  //     error: '',
  //   });

  res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>404 - Not Found</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .container {
            text-align: center;
          }
          h1 {
            font-size: 100px;
            margin: 0;
            color: #38bdf8;
          }
          p {
            font-size: 20px;
            margin: 10px 0 20px;
          }
          a {
            text-decoration: none;
            background: #38bdf8;
            color: #000;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
          }
          a:hover {
            background: #0ea5e9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>404</h1>
          <p>Oops! API Not Found !! 🚫</p>
          <a href="/">Go Home</a>
        </div>
      </body>
      </html>
    `);
};

export default NotFound;
