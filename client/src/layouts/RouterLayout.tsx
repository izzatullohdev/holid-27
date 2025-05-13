import { useState, useEffect } from "react";
import { Button, Layout, Drawer } from "antd";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaProjectDiagram,
  FaBriefcase,
  FaUser,
  FaCertificate,
  FaEnvelope,
  FaBars,
} from "react-icons/fa";
import { RiTelegram2Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const { Header, Footer } = Layout;

const fadeInUp = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const RouterLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024); // Planshet va mobil uchun (1024px dan kichik ekranlar)
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <motion.div
        className="container mx-auto w-full bg-white md:w-3xl lg:w-3xl lg:my-5 rounded "
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <Header className="flex justify-between items-center px-4 md:px-6 shadow-md rounded-lg relative">
          {/* Hamburger Button (faqat mobil va planshet uchun) */}
          {isMobile && (
            <Button
              className="text-2xl"
              icon={<FaBars />}
              onClick={() => setMenuOpen(true)}
            />
          )}

          {/* Logo */}
          {isMobile && (
            <div className="flex items-center gap-2">
              <Button icon={<FaUser />} className="ml-4">
                Resume
              </Button>
            </div>
          )}
          {/* Desktop Menu */}
          <nav className="hidden md:flex justify-between w-full gap-6 items-center ">
            <NavLink to="/" className="flex items-center gap-2">
              <FaUser /> Me
            </NavLink>
            <NavLink to="experience" className="flex items-center gap-2">
              <FaBriefcase /> Experience
            </NavLink>
            <NavLink to="projects" className="flex items-center gap-2">
              <FaProjectDiagram /> Projects
            </NavLink>
            <NavLink to="certificates" className="flex items-center gap-2">
              <FaCertificate /> Certificates
            </NavLink>
            <NavLink to="contact" className="flex items-center gap-2">
              <FaEnvelope /> Contact
            </NavLink>
            <Button icon={<FaUser />} className="ml-4">
              Resume
            </Button>
          </nav>
        </Header>
      </motion.div>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
      >
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={"flex items-center gap-2"}
          >
            <FaUser /> Me
          </NavLink>
          <NavLink
            to="experience"
            onClick={() => setMenuOpen(false)}
            className={"flex items-center gap-2"}
          >
            <FaBriefcase /> Experience
          </NavLink>
          <NavLink
            to="projects"
            onClick={() => setMenuOpen(false)}
            className={"flex items-center gap-2"}
          >
            <FaProjectDiagram /> Projects
          </NavLink>
          <NavLink
            to="certificates"
            onClick={() => setMenuOpen(false)}
            className={"flex items-center gap-2"}
          >
            <FaCertificate /> Certificates
          </NavLink>
          <NavLink
            to="contact"
            onClick={() => setMenuOpen(false)}
            className={"flex items-center gap-2"}
          >
            <FaEnvelope /> Contact
          </NavLink>
          <Button
            icon={<FaUser />}
            onClick={() => setMenuOpen(false)}
            className={"flex items-center gap-2"}
          >
            Resume
          </Button>
        </nav>
      </Drawer>

      {/* Main Content */}
      <motion.main
        className="container mx-auto my-2 rounded min-h-[70vh]"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Outlet />
      </motion.main>

      {/* Footer */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Footer className="p-6 mt-8 relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <motion.div
            className="container mx-auto text-center w-full md:w-3/4 lg:w-3xl bg-white backdrop-blur-lg rounded-xl flex flex-col md:flex-row justify-center items-center py-5 px-6 shadow-lg border border-white/20 "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Ijtimoiy tarmoqlar */}
            <motion.div
              className="flex justify-center items-center gap-6 text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/izzatbek-madaminov-b14505257/"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-blue-300 transition"
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/withholid27/"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-pink-400 transition"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@holid27"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-red-400 transition"
              >
                <FaYoutube />
              </motion.a>
              <motion.a
                href="https://t.me/izzatullohdev"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-blue-400 transition"
              >
                <RiTelegram2Line />
              </motion.a>
            </motion.div>
          </motion.div>
        </Footer>
      </motion.div>
    </Layout>
  );
};

export default RouterLayout;
