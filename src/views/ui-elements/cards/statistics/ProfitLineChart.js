import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Card, CardBody } from 'reactstrap'

const ProfitLineChart = ({ info, eventStat }) => {
  // Calculating the series data based on eventStat
  const seriesData = eventStat.map(data => ((data.nombreEvenements / eventStat.reduce((acc, curr) => acc + curr.nombreEvenements, 0)) * 100).toFixed(2))

  // const options = {
  //   chart: {
  //     toolbar: {
  //       show: false
  //     },
  //     zoom: {
  //       enabled: false
  //     },
  //     type: 'line',
  //     stacked: false
  //   },
  //   colors: [info],
  //   dataLabels: {
  //     enabled: false
  //   },
  //   stroke: {
  //     width: 3,
  //     curve: 'smooth'
  //   },
  //   markers: {
  //     size: 2,
  //     colors: info,
  //     strokeColors: info,
  //     strokeWidth: 2,
  //     strokeOpacity: 1,
  //     strokeDashArray: 0,
  //     fillOpacity: 1,
  //     discrete: [
  //       {
  //         seriesIndex: 0,
  //         dataPointIndex: 5,
  //         fillColor: '#ffffff',
  //         strokeColor: info,
  //         size: 5
  //       }
  //     ],
  //     shape: 'circle',
  //     radius: 2,
  //     hover: {
  //       size: 3
  //     }
  //   },
  //   grid: {
  //     borderColor: '#EBEBEB',
  //     strokeDashArray: 5,
  //     xaxis: {
  //       lines: {
  //         show: true
  //       }
  //     },
  //     yaxis: {
  //       lines: {
  //         show: false
  //       }
  //     },
  //     padding: {
  //       top: -30,
  //       bottom: -10
  //     }
  //   },
  //   xaxis: {
  //     categories: eventStat.map(data => data.semaine),
  //     labels: {
  //       show: true,
  //       style: {
  //         fontSize: '0px'
  //       }
  //     },
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     }
  //   },
  //   yaxis: {
  //     show: false
  //   },
  //   tooltip: {
  //     x: {
  //       show: false
  //     },
  //     y: {
  //       formatter : function (val) {
  //         return `${val}%`
  //       }
  //     }
  //   }
  // }
  const options = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      type: 'line',
      stacked: false
    },
    colors: [info],
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    markers: {
      size: 2,
      colors: info,
      strokeColors: info,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 5,
          fillColor: '#ffffff',
          strokeColor: info,
          size: 5
        }
      ],
      shape: 'circle',
      radius: 2,
      hover: {
        size: 3
      }
    },
    grid: {
      borderColor: '#EBEBEB',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: -30,
        bottom: -10
      }
    },
    xaxis: {
      categories: eventStat.map(data => data.semaine),
      labels: {
        show: true,
        style: {
          fontSize: '0px'
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
      show: false
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter(val) {
          return `${val * 100}%`
        }
      }
    }
  }
  
  return ( 
    <Card className='card-tiny-line-stats'>
      <CardBody>
        <h6>Events par semaine</h6>
        <Chart
          options={options}
          series={[{ name: 'Evenements', data: seriesData }]}
          type="line"
          height="200"
        />
      </CardBody>
    </Card>
  )
}

ProfitLineChart.propTypes = {
  eventStat: PropTypes.arrayOf(
    PropTypes.shape({
      idAutoEcole: PropTypes.number.isRequired,
      semaine: PropTypes.string.isRequired,
      nombreEvenements: PropTypes.number.isRequired,
      idEvenement: PropTypes.number.isRequired,
      nom_evenement: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      idUser: PropTypes.number.isRequired,
      idCompteConnecte: PropTypes.number.isRequired,
      idMoniteur: PropTypes.number.isRequired,
      idVoiture: PropTypes.number.isRequired,
      idNotification: PropTypes.number.isRequired
    })
  ).isRequired,
  info: PropTypes.string.isRequired
}

export default ProfitLineChart
