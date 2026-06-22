import { defineConfig } from 'vite';
import mysql from 'mysql2/promise';

export default defineConfig({
  plugins: [
    {
      name: 'mysql-proxy',
      configureServer(server) {
        server.middlewares.use('/api/jdbc', (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const { host, port, database, user, password, sql, params } = JSON.parse(body);
                
                const connection = await mysql.createConnection({
                  host: host || 'oop.ibu.edu.ba',
                  port: parseInt(port) || 3306,
                  database: database || 'oopgroup1',
                  user: user || 'oopuser',
                  password: password || 'ooppassWD',
                  connectTimeout: 5000
                });
                
                const [rows] = await connection.execute(sql, params || []);
                await connection.end();
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: rows }));
              } catch (err) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ]
});
