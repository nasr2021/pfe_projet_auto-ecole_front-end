
// export default OrdersBarChart
import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Card, CardBody } from 'reactstrap'

const Orders = ({ OrderSuperAdmin }) => {
  // Logging the order data for debugging purposes
  console.log('OrderSuperAdmin', OrderSuperAdmin)

  // Calculating the total number of demands
  const totalDemandes = OrderSuperAdmin.reduce((acc, curr) => acc + curr.totalDemande, 0)

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
          columnWidth: '50', // Ajustez au besoin
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
      colors: ['#00BFFF'], // Ajustez la couleur selon vos besoins
      xaxis: {
        categories: OrderSuperAdmin.map(data => data.semaine),
        labels: {
          show: true,
          style: {
            colors: '#000000'
          },
          formatter(value, timestamp) {
            return `${value}`
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
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
        data: OrderSuperAdmin.map(data => ((data.totalDemande / totalDemandes) * 100).toFixed(2))
      }
    ]
  }
  
  
  return (
    <Card className='card-tiny-line-stats'>
      <CardBody>
        <h6>Order par mois superadmin</h6>
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

Orders.propTypes = {
    OrderSuperAdmin: PropTypes.arrayOf(
    PropTypes.shape({
      semaine: PropTypes.string.isRequired,
      nombreDemande: PropTypes.number.isRequired,
      totalDemande: PropTypes.number.isRequired
    })
  )
}

export default Orders