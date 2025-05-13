"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, Typography, Button, Tag, Spin } from "antd"
import { GithubOutlined, LinkOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"

const { Title, Paragraph } = Typography

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubLink?: string
  liveDemoLink?: string
  createdAt: string
  updatedAt: string
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/projects")

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data = await response.json()
        console.log("API Response:", data) // Log the response to see its structure

        // Check if data is an array
        if (Array.isArray(data)) {
          setProjects(data)
        }
        // Check if data has a property that is an array (common API pattern)
        else if (data && typeof data === "object") {
          // Try common property names that might contain the projects array
          const projectsArray = data.projects || data.data || data.items || data.results || []
          if (Array.isArray(projectsArray)) {
            setProjects(projectsArray)
          } else {
            // If we can't find an array, create an array with the single object if it looks like a project
            setProjects(data.title ? [data] : [])
          }
        } else {
          setProjects([])
        }
      } catch (err) {
        setError("Loyihalarni yuklashda xatolik yuz berdi")
        console.error("Error fetching projects:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Yuklanmoqda..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        <Title level={4}>{error}</Title>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 md:px-8 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title level={2} className="!text-gray-800 text-center mb-8">
        📂 Loyihalar
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="shadow-md transition-transform min-h-[250px] transform hover:scale-105">
                <Title level={4} className="!text-gray-700">
                  {project.title}
                </Title>
                <Paragraph className="text-gray-600">{project.description}</Paragraph>

                <div className="mt-3 flex flex-wrap">
                  {Array.isArray(project.technologies)
                    ? project.technologies.map((tech, i) => (
                        <Tag color="blue" key={i} className="px-3 py-1 text-sm">
                          {tech}
                        </Tag>
                      ))
                    : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {project.githubLink && (
                    <Button
                      type="default"
                      icon={<GithubOutlined />}
                      href={project.githubLink}
                      target="_blank"
                      className="flex items-center"
                    >
                      GitHub
                    </Button>
                  )}
                  {project.liveDemoLink && (
                    <Button
                      type="primary"
                      icon={<LinkOutlined />}
                      href={project.liveDemoLink}
                      target="_blank"
                      className="flex items-center"
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10">
            <Title level={4} className="text-gray-500">
              Loyihalar topilmadi
            </Title>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Projects
