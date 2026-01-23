import { useDataContext } from '../providers/DataProvider'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { toLocalDateString } from '../../utils/helpers'
import RecentlyCompletedTable from './RecentlyCompletedTable'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ProgressBar() {
  const { grids } = useDataContext()

  const completedTasks = []

  const projectGrids = grids.filter(
    (grid) => grid.gridType === 'project' && !grid.templateCategory
  )

  projectGrids.forEach((project) => {
    // Flatten Harada grid structure: project.grids contains pillars (arrays),
    // each pillar contains cells (objects). Double flat() gets all cells.
    const flattened = project.grids
      .flat()
      .flat()
      .filter((task) => task.completedAt && task.slot !== 'middle-center')
    completedTasks.push(...flattened)
  })

  const generateDateLabels = () => {
    const labels = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      labels.push(toLocalDateString(date))
    }
    return labels.reverse()
  }

  const currentWeek = generateDateLabels()
  const hashCount = {}

  for (const task of completedTasks) {
    const day = new Date(task.completedAt)
    const localeDateString = toLocalDateString(day)
    if (currentWeek.includes(localeDateString)) {
      hashCount[localeDateString] = hashCount[localeDateString] + 1 || 1
    }
  }

  const chartData = currentWeek.map((day) => hashCount[day] || 0)

  const data = {
    labels: generateDateLabels(),
    datasets: [
      {
        label: 'Completed Tasks (Past 7 Days)',
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        min: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          boxWidth: 0, // Removes the width of the color box
          boxHeight: 0, // Removes the height of the color box
        },
      },
    },
  }

  return (
    <>
      {grids.length > 0 && completedTasks.length > 0 ? (
        <>
          <Bar data={data} options={options} id={'progress-bar'} />
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">Task History</h3>
            <RecentlyCompletedTable data={grids} />
          </div>
        </>
      ) : (
        grids.length > 0 &&
        completedTasks.length === 0 && (
          <div className="p-20 flex justify-center items-center border rounded bg-secondary text-white">
            <div className="text-center">
              <h2 className="mb-3 font-bold text-xl">
                You haven't completed any tasks, yet!
              </h2>
              <p>
                Once you start marking off completed tasks, you'll see a graph
                of your weekly progress.
              </p>
            </div>
          </div>
        )
      )}
    </>
  )
}
