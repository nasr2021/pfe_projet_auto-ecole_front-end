
// export default OrdersBarChart
import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Card, CardBody } from 'reactstrap'

const OrdersBarChart = ({ order }) => {
  // Logging the order data for debugging purposes
  console.log('orderss', order)

  // Calculating the total number of demands
  const totalDemandes = order.reduce((acc, curr) => acc + curr.nombreDemande, 0)

  // Calculate data for chart
  const chartData = {
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%', // Adjust as needed
          startingShape: 'rounded',
          colors: {
            backgroundBarColors: ['#f3f3f3', '#f3f3f3', '#f3f3f3', '#f3f3f3', '#f3f3f3'],
            backgroundBarRadius: 5
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#00BFFF'], // Adjust color as needed
      xaxis: {
        categories: order.map(data => data.semaine),
        labels: {
          show: true,
          style: {
            colors: '#000000'
          },
          formatter(value) {
            return `${value}`
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          show: true,
          style: {
            colors: '#000000'
          },
          formatter(value) {
            return `${value}`
          }
        }
      },
      tooltip: {
        y: {
          formatter(val) {
            return `${val}`
          }
        }
      },
      legend: {
        show: true
      }
    },
    series: [
      {
        // name: 'Demande',
        data: order.map(data => ((data.nombreDemande / totalDemandes) * 100).toFixed(2))
      }
    ]
  }
  return (
    <Card className='card-tiny-line-stats'>
      <CardBody>
        <h6>Order par mois</h6>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height="200"
        />
      </CardBody>
    </Card>
  )
}

OrdersBarChart.propTypes = {
  order: PropTypes.arrayOf(
    PropTypes.shape({
      semaine: PropTypes.string.isRequired,
      nombreDemande: PropTypes.number.isRequired,
      idDemande: PropTypes.number,
      type: PropTypes.string,
      idUser: PropTypes.number,
      date_creation: PropTypes.string,
      idForfait: PropTypes.number,
      statut: PropTypes.string,
      idAutoecole: PropTypes.number,
      idNotification: PropTypes.any
    })
  )
}

export default OrdersBarChart