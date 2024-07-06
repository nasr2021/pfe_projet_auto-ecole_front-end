
import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap'
import Chart from 'react-apexcharts'

const RevenueReport = ({ revenu, primary, warning }) => {
  console.log('rev', revenu)
  
  const revenueOptions = {
    chart: {
      stacked: true,
      type: 'bar',
      toolbar: { show: false }
    },
    grid: {
      padding: {
        top: -20,
        bottom: -10
      },
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      categories: revenu.map(data => data.mois),
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '0.86rem'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: true, 
      formatter(val) {
        return val.toFixed(0)
      },
      style: {
        fontSize: '12px',
        colors: ['#ffffff']
      }
    },
    colors: [primary, warning],
    tooltip: {
      y: {
        formatter(val) {
          return `${val}`
        }
      }
    },
    legend: {
      show: true
    },
    plotOptions: {
      bar: {
        columnWidth: '17%',
        endingShape: 'rounded'
      },
      distributed: true
    },
    yaxis: {
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '0.86rem'
        }
      },
      min: 0,
      max: 2000,
      tickAmount: 10, // Each tick represents 1000 units
      tickPlacement: 'on',
      title: {
        text: 'Total Revenue',
        style: {
          color: '#b9b9c3'
        }
        
      }
    }
  }
  const budgetSeries = [
    {
    name: 'Total',
    data: revenu.map(data => data.total)
  }
]

  return (
    revenu && revenu.length > 0 ? (
      <Card className='card-revenue-budget'>
        <Row className='mx-0'>
          <Col className='revenue-report-wrapper' md='12' xs='12'>
            <div className='d-sm-flex justify-content-between align-items-center mb-3'>
              <CardTitle className='mb-50 mb-sm-0'>Revenue Report</CardTitle>
              <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center mr-2'>
                  <span className='bullet bullet-primary mr-50 cursor-pointer'></span>
                  <span>Total</span>
                </div>
              </div> 
            </div>
            <Chart id='revenue-report-chart' type='bar' height='230' options={revenueOptions} series={budgetSeries} />
          </Col>
        </Row>
      </Card>
    ) : null
  )
}

RevenueReport.propTypes = {
  revenu: PropTypes.arrayOf(
    PropTypes.shape({
      mois: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired
    })
  ).isRequired,
  primary: PropTypes.string.isRequired,
  warning: PropTypes.string.isRequired
}

export default RevenueReport

