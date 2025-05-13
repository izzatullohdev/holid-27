"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, Typography, Button, Image } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Text } = Typography

interface Certificate {
  title: string
  info: string
  certificateLink: string
  image?: string
}

// Parent container uchun variantlar
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, // 0.2 soniyada bitta element chiqadi
  },
}

// Har bir sertifikat uchun animatsiya
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/certificates")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()

        if (Array.isArray(data)) {
          setCertificates(data)
        }
        else if (data && typeof data === "object") {
          const certificatesArray = data.certificates || data.data || data.results || []
          if (Array.isArray(certificatesArray)) {
            setCertificates(certificatesArray)
          } else {
            console.error("Unexpected API response format:", data)
            setCertificates([])
          }
        } else {
          console.error("Unexpected API response format:", data)
          setCertificates([])
        }
      } catch (error) {
        console.error("Error fetching certificates:", error)
        setCertificates([])
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 md:px-8 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Title level={2} className="!text-gray-800 text-center mb-8">
        🏅 Sertifikatlar
      </Title>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(certificates) && certificates.length > 0 ? (
          certificates.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="shadow-md transition-transform transform hover:scale-105"
                cover={
                  cert.image ? (
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      className="h-48 w-full object-cover rounded-t-lg"
                    />
                  ) : null
                }
              >
                <Title level={4} className="!text-gray-700 text-center">
                  {cert.title}
                </Title>
                <Text type="secondary" className="block text-center">
                  {cert.info}
                </Text>

                {cert.certificateLink && (
                  <div className="mt-4 flex justify-center">
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      href={cert.certificateLink}
                      target="_blank"
                      className="flex items-center"
                    >
                      Ko'rish
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <Text type="secondary">Sertifikatlar topilmadi</Text>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Certificates
