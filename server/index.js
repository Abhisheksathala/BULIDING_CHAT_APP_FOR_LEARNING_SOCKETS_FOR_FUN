import app from './app.js';
import connectDB from './src/database/Database.js';

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('hello');
    });
    app.listen(PORT, () => {
      console.log('listening on port ' + PORT);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  });
