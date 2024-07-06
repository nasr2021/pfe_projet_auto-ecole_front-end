import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Card, CardBody } from 'reactstrap'

// const User = ({ info, user }) => {


//   // Calculating the series data based on eventStat
//   const totalDemandes = user.reduce((acc, curr) => acc + (curr.totalDemande || 0), 0)
//   const seriesData = user.map(data => ((data.totalDemande || 0) / totalDemandes * 100).toFixed(2))

//   const options = {
//     chart: {
//       toolbar: {
//         show: false
//       },
//       zoom: {
//         enabled: false
//       },
//       type: 'line',
//       stacked: false
//     },
//     colors: [info],
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       width: 3,
//       curve: 'smooth'
//     },
//     markers: {
//       size: 2,
//       colors: info,
//       strokeColors: info,
//       strokeWidth: 2,
//       strokeOpacity: 1,
//       strokeDashArray: 0,
//       fillOpacity: 1,
//       discrete: [
//         {
//           seriesIndex: 0,
//           dataPointIndex: 5,
//           fillColor: '#ffffff',
//           strokeColor: info,
//           size: 5
//         }
//       ],
//       shape: 'circle',
//       radius: 2,
//       hover: {
//         size: 3
//       }
//     },
//     grid: {
//       borderColor: '#EBEBEB',
//       strokeDashArray: 5,
//       xaxis: {
//         lines: {
//           show: true
//         }
//       },
//       yaxis: {
//         lines: {
//           show: false
//         }
//       },
//       padding: {
//         top: -30,
//         bottom: -10
//       }
//     },
//     xaxis: {
//       categories: user.map(data => data.semaine),
//       labels: {
//         show: true,
//         style: {
//           fontSize: '0px'
//         }
//       },
//       axisBorder: {
//         show: false
//       },
//       axisTicks: {
//         show: false
//       }
//     },
//     yaxis: {
//       show: false
//     },
//     tooltip: {
//       x: {
//         show: false
//       },
//       y: {
//         formatter(val) {
//           return `${val}%`
//         }
//       }
//     }
//   }
//   console.log('User data:', user)
// console.log('Series data:', seriesData)
// console.log('Total demandes:', totalDemandes)
//   return (
//     <Card className='card-tiny-line-stats'>
//       <CardBody>
//         <h6>User par semaine</h6>
//         <Chart
//           options={options}
//           series={[{ name: 'User', data: seriesData }]}
//           type="line"
//           height="200"
//         />
//       </CardBody>
//     </Card>
//   )
// }

// User.propTypes = {
//   user: PropTypes.arrayOf(
//     PropTypes.shape({
//       semaine: PropTypes.string.isRequired,
//       totalDemande: PropTypes.number,
//       nombreDemande: PropTypes.number
//     })
//   ).isRequired,
//   info: PropTypes.string.isRequired
// }
const User = ({ info, user }) => {
  // Calculating the series data based on totalUtilisateurs
  const totalDemandes = user.reduce((acc, curr) => acc + (curr.totalUtilisateurs || 0), 0)
  const seriesData = totalDemandes > 0 ? user.map(data => ((data.totalUtilisateurs || 0) / totalDemandes * 100).toFixed(2)) : user.map(() => 0)

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
      categories: user.map(data => data.semaine),
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
          return `${val}%`
        }
      }
    }
  }

  console.log('User data:', user)
  console.log('Series data:', seriesData)
  console.log('Total demandes:', totalDemandes)

  return (
    <Card className='card-tiny-line-stats'>
      <CardBody>
        <h6>User par semaine</h6>
        <Chart
          options={options}
          series={[{ name: 'User', data: seriesData }]}
          type="line"
          height="200"
        />
      </CardBody>
    </Card>
  )
}

User.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      semaine: PropTypes.string.isRequired,
      totalUtilisateurs: PropTypes.number,
      nombreUtilisateurs: PropTypes.number
    })
  ).isRequired,
  info: PropTypes.string.isRequired
}
export default User

