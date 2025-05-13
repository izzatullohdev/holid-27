import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface Item {
  createdAt: string; // ISO date
}

function getMonthlyData(data: Item[]): number[] {
  const counts = Array(12).fill(0);
  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const month = date.getMonth();
    counts[month]++;
  });
  return counts;
}

export default function MonthlyCombinedChart() {
  const [projectData, setProjectData] = useState<number[]>(Array(12).fill(0));
  const [certificateData, setCertificateData] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const fetchData = async (url: string, setter: (data: number[]) => void) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (json?.data && Array.isArray(json.data)) {
          const monthly = getMonthlyData(json.data);
          setter(monthly);
        } else {
          console.error("Invalid data structure:", json);
        }
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    fetchData("http://localhost:3000/api/admin/projects", setProjectData);
    fetchData("http://localhost:3000/api/admin/certificates", setCertificateData);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465fff", "#00b894"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  const series = [
    {
      name: "Projects",
      data: projectData,
    },
    {
      name: "Certificates",
      data: certificateData,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Monthly Projects vs Certificates
      </h3>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}
