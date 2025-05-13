"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table"
import Badge from "../../ui/badge/Badge"
import Button from "../../ui/button/Button"
import { FaCode, FaExternalLinkAlt, FaGithub, FaEdit, FaTrash } from "react-icons/fa"
import Alert from "../../ui/alert/Alert" // Import Alert

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubLink: string
  liveDemoLink: string
}

export default function BasicTableOne() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [alerts, setAlerts] = useState<any[]>([]) // Alert state

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("❌ Token topilmadi.")
        setLoading(false)
        return
      }

      try {
        const res = await fetch("http://localhost:3000/api/admin/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("❌ So‘rovda xatolik")

        const data = await res.json()
        setProjects(data.data)
      } catch (error) {
        console.error("❌ Ma'lumotlarni olishda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Add this useEffect after the existing useEffect for fetching projects
  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        // Remove the oldest alert (first one in the array)
        setAlerts(alerts.slice(1))
      }, 2000) // 2 seconds

      // Clean up the timer when component unmounts or when alerts change
      return () => clearTimeout(timer)
    }
  }, [alerts])

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await fetch(`http://localhost:3000/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setProjects(projects.filter((project) => project.id !== id))
        setAlerts([...alerts, { variant: "success", title: "Deleted", message: "Project successfully deleted!" }])
      } else {
        setAlerts([...alerts, { variant: "error", title: "Error", message: "Failed to delete project." }])
      }
    } catch (error) {
      console.error("❌ Error deleting project:", error)
      setAlerts([...alerts, { variant: "error", title: "Error", message: "Failed to delete project." }])
    }
  }

  // Replace the handleUpdate function with this improved version that includes better error handling and debugging
  const handleUpdate = async (id: number) => {
    const token = localStorage.getItem("token")
    if (!token) {
      setAlerts([...alerts, { variant: "error", title: "Error", message: "Authentication token not found." }])
      return
    }

    try {
      setLoading(true)
      console.log(`Fetching project with ID: ${id}`)

      // Log the full request URL for debugging
      const requestUrl = `http://localhost:3000/api/admin/projects/${id}`
      console.log(`Request URL: ${requestUrl}`)

      const res = await fetch(requestUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Log response status for debugging
      console.log(`Response status: ${res.status}`)

      if (!res.ok) {
        const errorText = await res.text().catch(() => "Could not read error response")
        console.error(`Error response: ${errorText}`)
        throw new Error(`Failed to fetch project: ${res.status} - ${errorText}`)
      }

      const data = await res.json()
      console.log("Received project data:", data)

      // Check the structure of the response
      if (!data) {
        throw new Error("No data received from the server")
      }

      // Check if we're getting data or data.data (API might be wrapping the response)
      const projectData = data.data || data

      if (!projectData || !projectData.id) {
        console.error("Invalid project data structure:", projectData)
        throw new Error("Invalid project data received")
      }

      setSelectedProject(projectData)
      setIsModalOpen(true)
    } catch (error) {
      console.error("❌ Error fetching project for update:", error)
      // More detailed error message
      const errorMessage =
        error instanceof Error ? `Failed to fetch project: ${error.message}` : "Failed to fetch project for update."
      setAlerts([...alerts, { variant: "error", title: "Error", message: errorMessage }])
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) return

    const token = localStorage.getItem("token")
    if (!token) {
      setAlerts([...alerts, { variant: "error", title: "Error", message: "Authentication token not found." }])
      return
    }

    // Validate form data
    if (!selectedProject.title.trim() || !selectedProject.description.trim()) {
      setAlerts([
        ...alerts,
        { variant: "error", title: "Validation Error", message: "Title and description are required." },
      ])
      return
    }

    const payload = {
      title: selectedProject.title.trim(),
      description: selectedProject.description.trim(),
      technologies: selectedProject.technologies.filter((tech) => tech.trim() !== ""),
      githubLink: selectedProject.githubLink.trim(),
      liveDemoLink: selectedProject.liveDemoLink.trim(),
    }

    try {
      setIsSubmitting(true)
      const res = await fetch(`http://localhost:3000/api/admin/projects/${selectedProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.message || `Update failed with status: ${res.status}`)
      }

      // Show success message
      setAlerts([...alerts, { variant: "success", title: "Updated", message: "Project updated successfully!" }])

      // Close modal
      setIsModalOpen(false)

      // Refresh project list
      const updatedProjectsRes = await fetch("http://localhost:3000/api/admin/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!updatedProjectsRes.ok) {
        throw new Error("Failed to refresh project list")
      }

      const updatedProjectsData = await updatedProjectsRes.json()
      setProjects(updatedProjectsData.data)
    } catch (error) {
      console.error("❌ Error updating project:", error)
      setAlerts([
        ...alerts,
        {
          variant: "error",
          title: "Error",
          message: error instanceof Error ? error.message : "Failed to update project.",
        },
      ])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="fixed top-0 mx-auto z-999999 flex w-full max-w-sm flex-col gap-4 p-4">
        {alerts.map((alert, index) => (
          <Alert key={index} variant={alert.variant} title={alert.title} message={alert.message} />
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p className="p-5 text-center text-gray-500">Yuklanmoqda...</p>
          ) : (
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Project
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Technologies
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-3">
                          <FaCode className="text-xl text-blue-500" />
                          <span className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                            {project.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                        {project.description}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} size="sm" color="info">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start space-x-2">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="gap-2">
                            <FaGithub className="text-sm" />
                            GitHub
                          </Button>
                        </a>
                        <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="gap-2">
                            <FaExternalLinkAlt className="text-sm" />
                            Live Demo
                          </Button>
                        </a>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdate(project.id)}
                          className="text-yellow-500 hover:bg-yellow-100"
                        >
                          <FaEdit className="text-sm" />
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(project.id)}
                          className="text-red-500 hover:bg-red-100"
                        >
                          <FaTrash className="text-sm" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 p-5">
                      Ma'lumotlar topilmadi.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Update Project</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={selectedProject.title}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      title: e.target.value,
                    })
                  }
                  placeholder="Project Title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={selectedProject.description}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="Project Description"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="technologies"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Technologies (comma separated)
                </label>
                <input
                  id="technologies"
                  type="text"
                  value={selectedProject.technologies.join(", ")}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      technologies: e.target.value.split(",").map((tech) => tech.trim()),
                    })
                  }
                  placeholder="React, Node.js, MongoDB"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub Link
                </label>
                <input
                  id="githubLink"
                  type="url"
                  value={selectedProject.githubLink}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      githubLink: e.target.value,
                    })
                  }
                  placeholder="https://github.com/username/repo"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="liveDemoLink"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Live Demo Link
                </label>
                <input
                  id="liveDemoLink"
                  type="url"
                  value={selectedProject.liveDemoLink}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      liveDemoLink: e.target.value,
                    })
                  }
                  placeholder="https://your-demo-site.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Updating..." : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
