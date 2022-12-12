import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Bar, Scatter } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import CountUp from "react-countup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const optionsBubble = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Fake Data Points",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Fake Usage",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataBubble = {
  datasets: [
    {
      label: "A dataset",
      data: Array.from({ length: 100 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
      })),
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

export const dataBar = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const stats = [
  {
    id: 1,
    name: "Total Subscribers",
    stat: faker.datatype.number({ min: 1000, max: 10000 }),
    icon: UsersIcon,
    change: faker.datatype.number({ min: 10, max: 200 }),
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: faker.datatype.float({ min: 1, max: 100, precision: 0.01 }),
    icon: EnvelopeOpenIcon,
    change: `${faker.datatype.float({ min: 1, max: 10, precision: 0.1 })}%`,
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Click Rate",
    stat: faker.datatype.float({ min: 1, max: 100, precision: 0.01 }),
    icon: CursorArrowRaysIcon,
    change: `${faker.datatype.float({ min: 1, max: 10, precision: 0.1 })}%`,
    changeType: "decrease",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const DisplayDashboardData = ({ DashboardData }) => {
  const [loading, setLoading] = useState(true);
  const onStart = () => {
    setLoading(true);
  };
  const onEnd = () => {
    setLoading(false);
  };
  const containerProps = {
    "aria-busy": loading,
  };

  return (
    <div>
      {DashboardData === "Dashboard" ? (
        <div>
          <div className="mb-5">
            <div className="flex justify-between">
              <h1 className="my-auto text-2xl font-semibold text-gray-900">
                {DashboardData}
              </h1>
              <h3 className="my-auto font-Poppin text-lg font-medium leading-6 text-gray-900">
                Last 30 days
              </h3>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-5  lg:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-blue-500 p-3">
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="ml-16 truncate font-Merriweather text-sm font-medium text-gray-500">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="font-Poppin text-2xl font-semibold text-gray-900">
                      {item.name === "Total Subscribers" ? (
                        <CountUp
                          start={0}
                          end={item.stat}
                          duration="4"
                          separator=","
                          useEasing={true}
                          useGrouping={true}
                          onStart={onStart}
                          onEnd={onEnd}
                          containerProps={containerProps}
                        />
                      ) : (
                        <CountUp
                          start={0}
                          end={item.stat}
                          duration="3"
                          separator=","
                          decimal="."
                          useEasing={true}
                          useGrouping={true}
                          decimals={2}
                          suffix="%"
                          onStart={onStart}
                          onEnd={onEnd}
                          containerProps={containerProps}
                        />
                      )}
                    </p>
                    <p
                      className={classNames(
                        item.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600",
                        "ml-2 flex items-baseline text-sm font-semibold"
                      )}
                    >
                      {item.changeType === "increase" ? (
                        <ArrowUpIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                          aria-hidden="true"
                        />
                      )}

                      <span className="sr-only">
                        {" "}
                        {item.changeType === "increase"
                          ? "Increased"
                          : "Decreased"}{" "}
                        by{" "}
                      </span>
                      {item.change}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-100 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        <button
                          type="button"
                          className="font-Poppin font-medium text-blue-600 hover:text-blue-500"
                        >
                          View all
                          <span className="sr-only"> {item.name} stats</span>
                        </button>
                      </div>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
              <Bar options={optionsBar} data={dataBar} />
            </div>
            <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
              <Scatter options={optionsBubble} data={dataBubble} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="my-auto text-2xl font-semibold text-gray-900">
            {DashboardData}
          </h1>
        </div>
      )}
    </div>
  );
};

export default DisplayDashboardData;
