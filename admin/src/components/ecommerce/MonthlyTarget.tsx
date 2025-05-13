import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

export default function MonthlyTarget() {
  const [adminRegisterPercent, setAdminRegisterPercent] = useState<number>(0);

  const MONTHLY_TARGET = 50; // Oylik maqsad (masalan, 50 admin ro‘yxatdan o‘tishi kerak)

  useEffect(() => {
    const fetchAdminRegistrations = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/register", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        // Konsolda tekshirish
        console.log("Response JSON:", json);

        if (Array.isArray(json.data)) {
          const currentMonthAdmins = json.data.filter((admin: any) => {
            const created = new Date(admin.createdAt);
            const now = new Date();
            return (
              created.getFullYear() === now.getFullYear() &&
              created.getMonth() === now.getMonth()
            );
          });

          // Ro'yxatdan o'tgan adminlar sonini va foizni hisoblash
          const registeredCount = currentMonthAdmins.length;
          console.log("Registered this month:", registeredCount); // Konsolda adminlar sonini tekshirib ko'ring

          const percent = Math.min(
            100,
            Math.round((registeredCount / MONTHLY_TARGET) * 100)
          );

          // Konsolda foizni tekshirib ko'ring
          console.log("Registration Percent:", percent);

          setAdminRegisterPercent(percent);
        }
      } catch (error) {
        console.error("Error fetching admin data", error);
      }
    };

    fetchAdminRegistrations();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: (val: any) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#00B8D9"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Admin Registrations"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
      <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
        Monthly Admin Registrations
      </h3>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Adminlar ro'yxatdan o'tishi holati
      </p>

      {/* RadialBar chart */}
      <Chart
        options={options}
        series={[adminRegisterPercent]}
        type="radialBar"
        height={330}
      />

      {/* Foiz ko'rsatkichi va maqsad */}
      <p className="mt-6 text-center text-sm text-gray-500">
        {adminRegisterPercent}% of {MONTHLY_TARGET} admins registered this month
      </p>
    </div>
  );
}
