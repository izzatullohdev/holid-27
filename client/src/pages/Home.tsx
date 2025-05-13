import React from "react";
import { Card, Typography, List, Divider } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const experiences = [
  {
    title: "Full Stack Dasturchi",
    description:
      "MERN stack, React.js, Node.js, Express.js, MongoDB va PostgreSQL.",
  },
  {
    title: "Backend Dasturchi",
    description:
      "Node.js, Express.js, TypeScript, JWT, Zod, Sequelize, Prisma,REST API, Database Design",
  },
  {
    title: "Frontend Dasturchi",
    description:
      "Html, Css, JavaScript, Tailwind CSS, React.js, TypeScript, Ant Design, Context API, Redux Toolkit.",
  },
];

const projects = [
  {
    title: "The Auto Ulov",
    description:
      "Backend: Python PostgreSQL, Django REST Framework. Frontend: React.js. ",
    description2:
      "Loyihaning Asosiy maqsadi: Arendaga berilgan va rentcar larni nasiyaga berilgan mashinalarni arendaga berish hisobUshbu loyiha foydalanuvchilarga zamonaviy va qulay tarzda avtomobillarni onlayn ijaraga olish imkonini beruvchi veb-platformani yaratishga qaratilgan. Maqsad — foydalanuvchilarga tez, xavfsiz va tushunarli xizmat ko‘rsatish, ijarani bron qilish, to‘lov qilish va kerakli mashinani topishni soddalashtirish.",
  },
  {
    title: "Ndinoff Dori ishlab chiqarish kompaniyasi",
    description:
      "Backend: Python PostgreSQL, Django REST Framework. Frontend: React.js. ",
    description2:
      "Ndinoff Dori ishlab chiqarish kompaniyasining asosiy maqsadi — reagentlar va sanoat materiallarini onlayn xarid qilish imkonini beruvchi zamonaviy e-commerce platforma. Loyihaning asosiy maqsadi — sanoat, ilm-fan va laboratoriyalar uchun kerakli mahsulotlarni tez va oson topish, taqqoslash va buyurtma qilish imkonini berish.",
  },
  {
    title: '"Movarounnahr" choyxonasi uchun online menyu',
    description:
      "Backend: Node js Express js TypeScript, PostgreSQL. Frontend: React.js, Tailwind CSS.",
    description2: `"Movarounnahr" choyxonasi uchun online menyu — loyihaning maqsadi: mijozlar choyxonaga kelganida onlayn tarzda menyuni ko‘rishlari, tanlagan taomining narxini oldindan bilishlari va umumiy hisobni ko‘rib turishlari mumkin bo‘ladi. Bu loyiha hozircha birinchi versiyada. Keyingi versiyalarda buyurtma qilingan mahsulotlar avtomatik ravishda chek chiqarish qurilmasi orqali bosib chiqarilishi rejalashtirilgan.`,
  },
  {
    title: "Best Care - Towards a Healthy Life",
    description:
      "Backend: Python PostgreSQL, Django REST Framework. Frontend: React.js. ",
    description2:
      "Best Care — foydalanuvchilarga sog‘liqni saqlash bilan bog‘liq mahsulotlar, xizmatlar va yangiliklarni bir joyda taqdim etuvchi zamonaviy, ko‘p tilli (uz, ru, en) veb-platforma. Loyiha asosan foydalanuvchilarga sog‘lom turmush tarzini qo‘llab-quvvatlovchi mahsulotlar haqida ma'lumot berish, ularni taqqoslash va kerak bo‘lsa bog‘lanish imkonini berish uchun yaratilgan.",
  },
];

const skills = [
  {
    category: "Dasturlash tillari",
    details: "JavaScript (ES6+), TypeScript",
  },
  {
    category: "Texnologiyalar",
    details: "Node.js, Express.js, React.js, Redux, WebSocket",
  },
  { category: "Ma'lumotlar bazalari", details: "MongoDB, PostgreSQL" },
  { category: "DevOps & Deployment", details: "Timeweb Cloud, GitHub Actions" },
  {
    category: "Boshqa",
    details: "Telegram bot yaratish, CSRF va xavfsizlik masalalari",
  },
];

const learning = [
  {
    title: "O‘rganayotgan yo‘nalishlar",
    description: "Go mantiqiy fikrlash va algoritmlar.",
  },
  {
    title: "Shaxsiy maqsadlar",
    description: "Google kompaniyasiga ishga kirish, IT o‘quv markazi ochish.",
  },
];

const Home: React.FC = () => {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }} // Sahifa tark etilganda chiqish animatsiyasi
      transition={{ duration: 0.8 }}
    >
      <Card className="max-w-3xl w-full shadow-lg">
        <header className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Chiqarishda yo‘qoladi
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Title level={2}>Madaminov Izzatulloh</Title>
            <Text type="secondary">Full Stack (MERN) & Backend Dasturchi</Text>
          </motion.div>
        </header>

        <Divider>📍 Tajribalar</Divider>
        <List
          itemLayout="vertical"
          dataSource={experiences}
          renderItem={(item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }} // Sahifa o‘chganda yo‘qoladi
              transition={{ delay: index * 0.2 }}
            >
              <List.Item>
                <Title level={4}>{item.title}</Title>
                <Text>{item.description}</Text>
              </List.Item>
            </motion.div>
          )}
        />

        <Divider>📍 Loyihalar</Divider>
        <List
          itemLayout="vertical"
          dataSource={projects}
          renderItem={(item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }} // Sahifa tark etilganda chiqib ketadi
              transition={{ delay: index * 0.2 }}
            >
              <List.Item>
                <Title level={4}>{item.title}</Title>
                <Text>{item.description}</Text>
                <div className="border-b border-gray-300 my-2"></div>
                <Text>{item.description2}</Text>
              </List.Item>
            </motion.div>
          )}
        />

        <Divider>📍 Ko'nikmalar</Divider>
        <List
          dataSource={skills}
          renderItem={(item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }} // Sahifa tark etilganda yo‘qoladi
              transition={{ delay: index * 0.2 }}
            >
              <List.Item>
                <Text strong>{item.category}:</Text> {item.details}
              </List.Item>
            </motion.div>
          )}
        />

        <Divider>📍 Ma'lumot</Divider>
        <List
          dataSource={learning}
          renderItem={(item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }} // Sahifa o‘chganda yo‘qoladi
              transition={{ delay: index * 0.2 }}
            >
              <List.Item>
                <Text strong>{item.title}:</Text> {item.description}
              </List.Item>
            </motion.div>
          )}
        />
      </Card>
    </motion.div>
  );
};

export default Home;
