"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table"
import Button from "../../ui/button/Button"
import { FaEnvelope } from "react-icons/fa"
import Alert from "../../ui/alert/Alert"

interface Contact {
  id: number
  username: string
  email: string
  message: string
  createdAt: string
  updatedAt: string
}

export default function BasicTableThree() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [alerts, setAlerts] = useState<any[]>([])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
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

  // Fetch contacts on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("❌ Token topilmadi.")
        setLoading(false)
        return
      }

      try {
        const res = await fetch("http://localhost:3000/api/admin/contacts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("❌ So'rovda xatolik")

        const data = await res.json()
        setContacts(data.data || data)
      } catch (error) {
        console.error("❌ Ma'lumotlarni olishda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContact(null)
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
                    Username
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Date
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
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-theme-sm text-gray-800 dark:text-white/90">
                            {contact.username}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                        {contact.email}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                        {formatDate(contact.createdAt)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(contact)}
                          className="text-blue-500 hover:bg-blue-100"
                        >
                          <FaEnvelope className="text-sm mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 p-5">
                      Ma'lumotlar topilmadi.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Contact Details</h3>
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
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</h4>
                <p className="text-gray-800 dark:text-white">{selectedContact.username}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                <p className="text-gray-800 dark:text-white">{selectedContact.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Message</h4>
                <p className="text-gray-800 dark:text-white whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Received on</h4>
                <p className="text-gray-800 dark:text-white">{formatDate(selectedContact.createdAt)}</p>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
