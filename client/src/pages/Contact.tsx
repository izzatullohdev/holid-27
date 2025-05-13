"use client"

import type React from "react"
import { useState } from "react"
import { Form, Input, Button, message } from "antd"
import { MailOutlined, PhoneOutlined, SendOutlined, MessageOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"

const Contact: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: {
    name: string
    email: string
    message: string
  }) => {
    setLoading(true)

    try {
      // Format the data as required by the API
      const formData = {
        username: values.name, // Map name to username as required by API
        email: values.email,
        message: values.message,
      }

      // Send data to the API endpoint
      const response = await fetch("http://localhost:3000/api/user/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Xabar yuborishda xatolik yuz berdi")
      }

      message.success("Xabaringiz muvaffaqiyatli yuborildi!")
      form.resetFields()
    } catch (error) {
      console.error("Xatolik:", error)
      message.error("Xabar yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-2xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        📩 Bog'lanish
      </motion.h2>

      {/* Kontakt ma'lumotlari */}
      <motion.div
        className="mb-6 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-gray-700 flex items-center gap-2">
          <MailOutlined className="text-blue-500" />
          <a href="mailto:your@email.com" className="text-blue-500">
            your@email.com
          </a>
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <PhoneOutlined className="text-blue-500" />
          <a href="tel:+998900001122" className="text-blue-500">
            +998 90 000 11 22
          </a>
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <MessageOutlined className="text-blue-500" />
          <a href="https://t.me/yourusername" target="_blank" className="text-blue-500" rel="noreferrer">
            @yourusername
          </a>
        </p>
      </motion.div>

      {/* Bog'lanish formasi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Ismingiz"
            rules={[{ required: true, message: "Iltimos, ismingizni kiriting!" }]}
          >
            <Input placeholder="Ismingizni kiriting" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Emailingiz"
            rules={[
              {
                required: true,
                type: "email",
                message: "Emailingizni to'g'ri kiriting!",
              },
            ]}
          >
            <Input placeholder="Emailingizni kiriting" />
          </Form.Item>

          <Form.Item name="message" label="Xabaringiz" rules={[{ required: true, message: "Xabaringizni yozing!" }]}>
            <Input.TextArea rows={4} placeholder="Xabaringizni kiriting..." />
          </Form.Item>

          <Form.Item>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={loading}>
                {loading ? "Yuborilmoqda..." : "Yuborish"}
              </Button>
            </motion.div>
          </Form.Item>
        </Form>
      </motion.div>
    </motion.div>
  )
}

export default Contact
