"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table"
import Button from "../../ui/button/Button"
import { FaCertificate, FaEdit, FaTrash } from "react-icons/fa"
import Alert from "../../ui/alert/Alert"

interface Certificate {
  id: number
  title: string
  info: string
  certificateLink: string
  createdAt: string
  updatedAt: string
}

export default function BasicTableTwo() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [alerts, setAlerts] = useState<any[]>([])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Effect for auto-dismissing alerts after 2 seconds
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

  // Fetch certificates on component mount
  useEffect(() => {
    const fetchCertificates = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("❌ Token topilmadi.")
        setLoading(false)
        return
      }

      try {
        const res = await fetch("http://localhost:3000/api/admin/certificates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("❌ So'rovda xatolik")

        const data = await res.json()
        setCertificates(data.data || data)
      } catch (error) {
        console.error("❌ Ma'lumotlarni olishda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await fetch(`http://localhost:3000/api/admin/certificates/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        setCertificates(certificates.filter((certificate) => certificate.id !== id))
        setAlerts([...alerts, { variant: "success", title: "Deleted", message: "Certificate successfully deleted!" }])
      } else {
        setAlerts([...alerts, { variant: "error", title: "Error", message: "Failed to delete certificate." }])
      }
    } catch (error) {
      console.error("❌ Error deleting certificate:", error)
      setAlerts([...alerts, { variant: "error", title: "Error", message: "Failed to delete certificate." }])
    }
  }

  const handleUpdate = async (id: number) => {
    const token = localStorage.getItem("token")
    if (!token) {
      setAlerts([...alerts, { variant: "error", title: "Error", message: "Authentication token not found." }])
      return
    }

    try {
      setLoading(true)
      console.log(`Fetching certificate with ID: ${id}`)

      const requestUrl = `http://localhost:3000/api/admin/certificates/${id}`
      console.log(`Request URL: ${requestUrl}`)

      const res = await fetch(requestUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(`Response status: ${res.status}`)

      if (!res.ok) {
        const errorText = await res.text().catch(() => "Could not read error response")
        console.error(`Error response: ${errorText}`)
        throw new Error(`Failed to fetch certificate: ${res.status} - ${errorText}`)
      }

      const data = await res.json()
      console.log("Received certificate data:", data)

      if (!data) {
        throw new Error("No data received from the server")
      }

      const certificateData = data.data || data

      if (!certificateData || !certificateData.id) {
        console.error("Invalid certificate data structure:", certificateData)
        throw new Error("Invalid certificate data received")
      }

      setSelectedCertificate(certificateData)
      // Add this after setting selectedCertificate
      console.log("Certificate data for update:", certificateData)
      console.log("Certificate link:", certificateData.certificateLink)
      setIsModalOpen(true)
    } catch (error) {
      console.error("❌ Error fetching certificate for update:", error)
      const errorMessage =
        error instanceof Error
          ? `Failed to fetch certificate: ${error.message}`
          : "Failed to fetch certificate for update."
      setAlerts([...alerts, { variant: "error", title: "Error", message: errorMessage }])
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCertificate(null)
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCertificate) return

    const token = localStorage.getItem("token")
    if (!token) {
      setAlerts([...alerts, { variant: "error", title: "Error", message: "Authentication token not found." }])
      return
    }

    // Validate form data
    if (!selectedCertificate.title.trim() || !selectedCertificate.info.trim()) {
      setAlerts([...alerts, { variant: "error", title: "Validation Error", message: "Title and info are required." }])
      return
    }

    // Validate title length (2-50 characters)
    if (selectedCertificate.title.trim().length < 2 || selectedCertificate.title.trim().length > 50) {
      setAlerts([
        ...alerts,
        { variant: "error", title: "Validation Error", message: "Title must be between 2 and 50 characters." },
      ])
      return
    }

    // Validate info length (max 50 characters)
    if (selectedCertificate.info.trim().length > 50) {
      setAlerts([
        ...alerts,
        { variant: "error", title: "Validation Error", message: "Info must not exceed 50 characters." },
      ])
      return
    }

    const payload = {
      title: selectedCertificate.title.trim(),
      info: selectedCertificate.info.trim(),
      certificateLink: selectedCertificate.certificateLink?.trim() || "",
    }

    try {
      setIsSubmitting(true)
      const res = await fetch(`http://localhost:3000/api/admin/certificates/${selectedCertificate.id}`, {
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
      setAlerts([...alerts, { variant: "success", title: "Updated", message: "Certificate updated successfully!" }])

      // Close modal
      setIsModalOpen(false)

      // Refresh certificate list
      const updatedCertificatesRes = await fetch("http://localhost:3000/api/admin/certificates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!updatedCertificatesRes.ok) {
        throw new Error("Failed to refresh certificate list")
      }

      const updatedCertificatesData = await updatedCertificatesRes.json()
      setCertificates(updatedCertificatesData.data || updatedCertificatesData)
    } catch (error) {
      console.error("❌ Error updating certificate:", error)
      setAlerts([
        ...alerts,
        {
          variant: "error",
          title: "Error",
          message: error instanceof Error ? error.message : "Failed to update certificate.",
        },
      ])
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
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
                    Certificate
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Info
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
                {certificates.length > 0 ? (
                  certificates.map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-3">
                          <FaCertificate className="text-xl text-green-500" />
                          <span className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                            {certificate.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                        {certificate.info}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(certificate.certificateLink, "_blank", "noopener,noreferrer")}
                          className="text-blue-500 hover:bg-blue-100"
                        >
                          <FaCertificate className="text-sm mr-2" />
                          View
                        </Button>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start space-x-2">
                      <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdate(certificate.id)}
                          className="text-yellow-500 hover:bg-yellow-100"
                        >
                          <FaEdit className="text-sm mr-2" />
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(certificate.id)}
                          className="text-red-500 hover:bg-red-100"
                        >
                          <FaTrash className="text-sm mr-2" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 p-5">
                      Ma'lumotlar topilmadi.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {isModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Update Certificate</h3>
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
                  value={selectedCertificate.title}
                  onChange={(e) =>
                    setSelectedCertificate({
                      ...selectedCertificate,
                      title: e.target.value,
                    })
                  }
                  placeholder="Certificate Title"
                  required
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">{selectedCertificate.title.length}/50 characters (min: 2)</p>
              </div>
              <div>
                <label htmlFor="info" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Info
                </label>
                <input
                  id="info"
                  type="text"
                  value={selectedCertificate.info}
                  onChange={(e) =>
                    setSelectedCertificate({
                      ...selectedCertificate,
                      info: e.target.value,
                    })
                  }
                  placeholder="Certificate Info"
                  required
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">{selectedCertificate.info.length}/50 characters</p>
              </div>
              <div>
                <label
                  htmlFor="certificateLink"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Certificate Link
                </label>
                <input
                  id="certificateLink"
                  type="text"
                  value={selectedCertificate.certificateLink || ""}
                  onChange={(e) =>
                    setSelectedCertificate({
                      ...selectedCertificate,
                      certificateLink: e.target.value,
                    })
                  }
                  placeholder="Certificate Link"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Updating..." : "Update Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
