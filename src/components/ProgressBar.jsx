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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ProgressBar() {
  const { grids } = useDataContext()
  console.log(grids)
  const completedTasks = []

  const projectGrids = grids.filter(
    (grid) => grid.gridType === 'project' && !grid.templateCategory
  )

  projectGrids.forEach((project) => {
    const flattened = project.grids
      .flat()
      .flat()
      .filter((task) => task.completedAt)
    completedTasks.push(...flattened)
  })

  const generateDateLabels = () => {
    const labels = []

    for (let i = 0; i < 7; i++) {
      const date = new Date()

      date.setDate(date.getDate() - i)

      // toISOString() returns "2025-12-27T18:30:00.000Z"
      // .split('T')[0] takes only "2025-12-27"
      labels.push(date.toISOString().split('T')[0])
    }

    return labels.reverse()
  }

  const currentWeek = generateDateLabels()

  const hashCount = {}

  for (const task of completedTasks) {
    const day = task.completedAt.split('T')[0]
    if (currentWeek.includes(day)) {
      hashCount[day] = hashCount[day] + 1 || 1
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
  return (
    <>
      {grids.length > 0 && completedTasks.length > 0 ? (
        <Bar data={data} id={'progress-bar'} />
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
