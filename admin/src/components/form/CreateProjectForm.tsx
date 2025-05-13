"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Alert from "../../components/ui/alert/Alert"

function CreateProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemoLink: "",
  })

  const [alert, setAlert] = useState<{
    show: boolean
    variant: "success" | "error" | "warning" | "info"
    title: string
    message: string
  } | null>(null)

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    if (!token) {
      setAlert({
        show: true,
        variant: "error",
        title: "Xatolik",
        message: "Token topilmadi. Iltimos, tizimga kiring.",
      })
      return
    }

    setLoading(true)
    setAlert(null)

    const technologiesArray = formData.technologies.split(",").map((t) => t.trim())

    const payload = {
      title: formData.title,
      description: formData.description,
      technologies: technologiesArray,
      githubLink: formData.githubLink,
      liveDemoLink: formData.liveDemoLink,
    }

    try {
      const res = await fetch("http://localhost:3000/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setAlert({
          show: true,
          variant: "success",
          title: "Muvaffaqiyatli",
          message: "Project muvaffaqiyatli yaratildi!",
        })

        setFormData({
          title: "",
          description: "",
          technologies: "",
          githubLink: "",
          liveDemoLink: "",
        })

        setTimeout(() => {
          navigate("/basic-tables")
        }, 2000)
      } else {
        const error = await res.json()
        setAlert({
          show: true,
          variant: "error",
          title: "Xatolik",
          message: error.message || "Yuborishda xatolik yuz berdi",
        })
      }
    } catch (err) {
      setAlert({
        show: true,
        variant: "error",
        title: "Tarmoq xatoligi",
        message: "Server bilan bog'lanishda muammo yuz berdi",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="absolute top-0 mx-auto z-999999 flex w-full max-w-sm flex-col gap-4 p-4">
        {alert && alert.show && (
          <Alert variant={alert.variant} title={alert.title} message={alert.message} />
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 border rounded-md shadow-sm bg-white dark:bg-gray-800"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          ➕ Yangi Project Qo'shish
        </h3>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Sarlavha"
          required
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tavsif"
          required
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />

        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="Texnologiyalar (vergul bilan ajrating: React, Node.js)"
          required
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />

        <input
          type="url"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          placeholder="GitHub havola"
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />

        <input
          type="url"
          name="liveDemoLink"
          value={formData.liveDemoLink}
          onChange={handleChange}
          placeholder="Live demo havola"
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
        >
          {loading ? "Yaratilyapti..." : "Saqlash"}
        </button>
      </form>
    </div>
  )
}

export default CreateProjectForm
