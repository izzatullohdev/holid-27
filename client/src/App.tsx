import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouterLayout from "./layouts/RouterLayout";
import Home from "./pages/Home";
import Experiences from "./pages/Experience";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";
import ParticlesBg from "particles-bg";
const App = () => {
  const experiences = [
    {
      title: "Full Stack Dasturchi",
      company: "Freelance",
      duration: "2023 - Hozirgi vaqt",
      description:
        "Turli xil mijozlar uchun freelance asosida to‘liq sikldagi veb-ilovalarni ishlab chiqdim. Frontendda React.js, Next.js, TypeScript, Tailwind CSS va i18next kabi texnologiyalardan foydalandim. Backend qismida esa Node.js, Express.js, TypeScript, Sequelize va PostgreSQL bilan ishladim. Avtomatlashtirilgan CRUD tizimlar, JWT bilan autentifikatsiya, RESTful API, admin panel, to‘lov tizimlari va cloud storage (Cloudinary, Firebase) bilan integratsiyalarni amalga oshirdim. SEO optimizatsiya, mobilga mos responsive dizayn va loyiha yakunida mijozga to‘liq texnik hujjat taqdim etaman.",
    },
    {
      title: "Full Stack Dasturchi va Ustoz",
      company: "Django Academy",
      duration: "2023 - 2025",
      description:
        "Frontend va backend yo‘nalishida o‘quvchilarga amaliy bilimlar berdim. Darslarimda HTML, CSS, JavaScript, TypeScript, Tailwind CSS, React.js, Node.js, Express.js, MongoDB va PostgreSQL kabi texnologiyalar asosida real loyihalar yaratish orqali o‘rgatdim. Har bir mavzuni oddiydan murakkabgacha bosqichma-bosqich tushuntirib, talabalarni mustaqil fikrlovchi, haqiqiy dasturchi bo‘lishga yo‘naltirdim. Dars berish menga ilhom beradi — bu ishim emas, bu mening qonimda. Onam o‘qituvchi bo‘lgani sababli, pedagogik yondashuv menga begona emas. Har bir yangi o‘rgangan texnologiyamni iloji boricha soddalashtirib, o‘quvchilarga yetkazishni o‘z burchim deb bilaman.",
    },
    {
      title: "Full Stack Dasturchi",
      company: "USAT - Fan va texnologiyalar universiteti",
      duration: "2023 - 2025",
      description:
        "USAT universiteti tarkibida faoliyat yurituvchi Django Academy'da dars beraman. Bosh vaqtlarimda esa universitetning ichki IT loyihalarini ishlab chiqish bilan shug‘ullanaman. Tizimlar asosan React.js, Node.js, Express.js, TypeScript,  MongoDB va PostgreSQL asosida quriladi. Maqsad – universitetdagi qog‘ozbozlik jarayonlarini avtomatlashtirish va raqamli tizimga o‘tishda hissa qo‘shish. Dasturchilarni aynan shu universitet talabalari ichidan yetishtirib chiqarishga va ularga real amaliyot asosida yordam berishga intilamiz.",
    },
    {
      title: "Frontend Dasturchi",
      company: "Digital City",
      duration: "2023.03.03 - 2023.07.03",
      description:
        "Digital City — Andijon viloyatidagi IT Park bo‘lib, bu yerda frontend dasturchi sifatida faoliyat yuritdim. Asosiy vazifalarim HTML, CSS, JavaScript,TypeScript, Tailwind CSS va React.js yordamida foydalanuvchi interfeyslarini yaratish edi. Shuningdek, dasturlash bo‘yicha o‘quvchilarga darslar o‘tdim. Kompaniyaga freelanserlar orqali yoki davlat buyurtmasi asosida kelgan loyihalarda ishtirok etib, real mijozlar bilan ishlash tajribasini orttirdim.",
    },
    {
      title: "Frontend Dasturchi",
      company: "ICode Academy",
      duration: "2022.02.01 - 2023.03.01",
      description:
        "ICode Academy — Andijon viloyatidagi yetakchi IT o‘quv markazlaridan biri bo‘lib, u yerda frontend dasturchi sifatida ishladim. Asosiy vazifalarim HTML, CSS, JavaScript, TypeScript, Tailwind CSS va React.js texnologiyalari orqali foydalanuvchi interfeyslarini ishlab chiqishdan iborat edi. O‘quvchilarga amaliy ko‘nikmalar berish bilan birga, tashqaridan kelgan real loyihalarda ham faol ishtirok etdim. Markaz nafaqat o‘quv jarayoni, balki mustaqil mijozlardan va tashkilotlardan kelgan buyurtmalar ustida ishlash uchun ham faoliyat yuritardi.",
    },
    {
      title: "Frontend Dasturchi",
      company: "NamMTI – Namangan muhandislik-texnologiya instituti",
      duration: "2020.11.15 - 2021.06.01",
      description:
        "NamMTIda frontend dasturchi sifatida institut ichki tizimlarini raqamlashtirish va avtomatlashtirish ustida ishladim. Asosan HTML, CSS va JavaScript yordamida foydalanuvchi interfeyslarini ishlab chiqdim. Loyihalarning asosiy maqsadi institutning ichki jarayonlarini tizimlashtirish va qog‘ozbozlikni kamaytirish edi.",
    },
  ];
  const projectsData = [
    {
      title: "Planetarium API",
      description:
        "Node.js va Express.js asosida API yaratish, MongoDB bilan ishlash.",
      technologies: ["Node.js", "Express.js", "MongoDB", "JWT"],
      github: "https://github.com/yourrepo/planetarium",
    },
    {
      title: "Chat App",
      description: "WebSocket yordamida real-time chat platforma yaratish.",
      technologies: ["React", "Node.js", "Socket.io", "Tailwind"],
      demo: "https://yourchatapp.com",
    },
    {
      title: "Portfolio Website",
      description: "Shaxsiy portfolio veb-sayti React va Tailwind bilan.",
      technologies: ["React", "Tailwind", "TypeScript"],
      github: "https://github.com/yourrepo/portfolio",
      demo: "https://yourportfolio.com",
    },
  ];
  const certificatesData = [
    {
      title: "Nodejs Dasturlash Sertifikati",
      organization: "Mohirdev",
      year: "2023",
      //   image: "../assets/nodejs.pdf",
      link: "../assets/nodejs.pdf",
    },
    {
      title: "Backend Development Sertifikati",
      organization: "Coursera",
      year: "2024",
      //   image: "https://your-certificate-image-link.com/backend.jpg",
      link: "https://coursera.org/certificate/backend",
    },
    {
      title: "Google Developer Sertifikati",
      organization: "Google",
      year: "2023",
      //   image: "https://your-certificate-image-link.com/google.jpg",
      link: "https://google.com/certificate/developer",
    },
  ];
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "experience",
          element: <Experiences experiences={experiences} />,
        },
        {
          path: "projects",
          element: <Projects projects={projectsData} />,
        },
        {
          path: "certificates",
          element: <Certificates certificates={certificatesData} />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ]);
  return (
    <div className="min-h-screen w-full">
      <RouterProvider router={router} />
      <div className="hidden md:block">
        <ParticlesBg type="cobweb" color="#646262" bg={true} />
      </div>
    </div>
  );
};

export default App;
