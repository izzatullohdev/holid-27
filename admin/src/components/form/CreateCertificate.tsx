"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Alert from "../../components/ui/alert/Alert"

function CreateCertificateForm() {
  const [formData, setFormData] = useState({
    title: "",
    info: "",
    certificateLink: "",
  })

  const [alert, setAlert] = useState<{
    show: boolean
    variant: "success" | "error" | "warning" | "info"
    title: string
    message: string
  } | null>(null)

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (alert?.show) {
      const timer = setTimeout(() => setAlert(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [alert])

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

    if (formData.title.trim().length < 2 || formData.title.trim().length > 50) {
      setAlert({
        show: true,
        variant: "error",
        title: "Xatolik",
        message: "Sarlavha 2 dan 50 gacha belgidan iborat bo'lishi kerak.",
      })
      return
    }

    if (formData.info.trim().length > 50) {
      setAlert({
        show: true,
        variant: "error",
        title: "Xatolik",
        message: "Ma'lumot 50 belgidan oshmasligi kerak.",
      })
      return
    }

    setLoading(true)
    setAlert(null)

    const payload = {
      title: formData.title.trim(),
      info: formData.info.trim(),
      certificateLink: formData.certificateLink.trim(),
    }

    try {
      const res = await fetch("http://localhost:3000/api/admin/certificates", {
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
          message: "Sertifikat muvaffaqiyatli yaratildi!",
        })

        setFormData({
          title: "",
          info: "",
          certificateLink: "",
        })

        setTimeout(() => navigate("/basic-tables"), 2000)
      } else {
        const error = await res.json()
        setAlert({
          show: true,
          variant: "error",
          title: "Xatolik",
          message: error.message || "Yuborishda xatolik yuz berdi",
        })
      }
    } catch {
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
      {/* Alert */}
      <div className="absolute top-0 mx-auto z-50 flex w-full max-w-sm flex-col gap-4 p-4">
        {alert?.show && <Alert variant={alert.variant} title={alert.title} message={alert.message} />}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-md shadow-sm bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">➕ Yangi Sertifikat Qo'shish</h3>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sarlavha
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Sertifikat sarlavhasi"
            required
            maxLength={50}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formData.title.length}/50 belgidan (min: 2)</p>
        </div>

        {/* Info */}
        <div>
          <label htmlFor="info" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ma'lumot
          </label>
          <input
            type="text"
            id="info"
            name="info"
            value={formData.info}
            onChange={handleChange}
            placeholder="Sertifikat haqida ma'lumot"
            required
            maxLength={50}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formData.info.length}/50 belgidan</p>
        </div>

        {/* Link */}
        <div>
          <label htmlFor="certificateLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sertifikat Havolasi
          </label>
          <input
            type="text"
            id="certificateLink"
            name="certificateLink"
            value={formData.certificateLink}
            onChange={handleChange}
            placeholder="Sertifikat havolasi"
            required
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Yaratilyapti..." : "Saqlash"}
        </button>
      </form>
    </div>
  )
}

export default CreateCertificateForm
