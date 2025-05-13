import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
  const [projectCount, setProjectCount] = useState<number>(0);
  const [certificateCount, setCertificateCount] = useState<number>(0);

  // Fetch project and certificate data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found.");
          return;
        }

        // Fetch projects data
        const projectRes = await fetch("http://localhost:3000/api/admin/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const projectData = await projectRes.json();

        // Get the length of 'data' array
        if (projectData && Array.isArray(projectData.data)) {
          setProjectCount(projectData.data.length); // Set project count from data.length
        } else {
          console.error("Invalid data for projects:", projectData);
        }

        // Fetch certificates data
        const certificateRes = await fetch("http://localhost:3000/api/admin/certificates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const certificateData = await certificateRes.json();

        // Get the length of 'data' array
        if (certificateData && Array.isArray(certificateData.data)) {
          setCertificateCount(certificateData.data.length); // Set certificate count from data.length
        } else {
          console.error("Invalid data for certificates:", certificateData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Project Metric */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Projects</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {projectCount}
            </h4>
          </div>
        </div>
      </div>

      {/* Certificate Metric */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Certificates</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {certificateCount}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
