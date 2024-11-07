import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js'; // sequelize와 models를 가져옵니다.
import itemRoutes from './routes/itemRoutes.js';
import monsterRoutes from './routes/monsterRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());

// 라우트 설정
app.use('/api/item', itemRoutes);
app.use('/api/monster', monsterRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/skill', skillRoutes);

// Sequelize 연결 확인 (루트 경로)
app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).send("Database connection failed.");
  }
});

// Sequelize 데이터베이스와 동기화
sequelize.sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
