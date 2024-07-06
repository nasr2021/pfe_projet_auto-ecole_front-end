import Chart from 'react-apexcharts'
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'
import React from 'react'
const Earnings = ({ success, statestique }) => {
  console.log('statestique', statestique)
  const { nombreMoniteurs, nombreCondidats, nombreCars, nomberAutoecolesUser } = statestique

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    labels: ['Moniteurs', 'Condidats', 'Cars'],
    stroke: { width: 0 },
    colors: ['#28c76f66', '#28c76f33', success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`
              }
            },
            total: {
              show: false,
              offsetY: 15,
              label: 'Total',
              formatter(w) {
                return `${((nombreMoniteurs + nombreCondidats + nombreCars) / 3).toFixed(0)}%`
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  }

  const series = [nombreMoniteurs, nombreCondidats, nombreCars]

  return (
    <Card className='earnings-card'>
      <CardBody>
        <Row>
          <Col xs='6'>
            <CardTitle className='mb-1'>All User</CardTitle>
            <h5 className='mb-1'>{statestique.nomberAutoecolesUser}</h5>
          </Col>
          <Col xs='6'>
            <Chart options={options} series={series} type='donut' height={120} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Earnings
