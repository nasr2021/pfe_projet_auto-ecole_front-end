
 import React from 'react'
import Avatar from '@components/avatar'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'
import { TrendingUp, User, Box, DollarSign, Folder, Clock, File } from 'react-feather'

// const StatsCard = ({ statsData }) => {
//   const data = [
//     {
//       title: 'Nombre de fois code',
//       subtitle: statsData.nombre_fois_code,
//       color: 'light-primary',
//       icon: <TrendingUp size={24} />
//     },
//     {
//       title: 'Nombre de fois conduit',
//       subtitle: statsData.nombre_fois_conduit,
//       color: 'light-info',
//       icon: <User size={24} />
//     },
//     {
//       title: 'Nombre d\'heures code',
//       subtitle: statsData.nombre_heures_code,
//       color: 'light-danger',
//       icon: <Box size={24} />
//     },
//     {
//       title: 'Nombre d\'heures conduit',
//       subtitle: statsData.nombre_heures_conduit,
//       color: 'light-success',
//       icon: <DollarSign size={24} />
//     }
//   ]

//   const renderData = () => {
//     return data.map((item, index) => (
//       <Col
//         key={index}
//         md='6'
//         sm='12'
//         className={`mb-2 mb-${index !== data.length - 1 ? '0' : '2'}`}
//       >
//         <Media>
//           <Avatar color={item.color} icon={item.icon} className='mr-2' />
//           <Media className='my-auto' body>
//             <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
//             <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
//           </Media>
//         </Media>
//       </Col>
//     ))
//   }

//   return (
//     <Card className='card-statistics'>
//       <CardHeader>
//         <CardTitle tag='h4'>Statistics</CardTitle>
//       </CardHeader>
//       <CardBody className='statistics-body'>
//         <Row>{renderData()}</Row>
//       </CardBody>
//     </Card>
//   )
// }

// export default StatsCard

const StatsCard = ({ statsData }) => {
  const mapStatsDataToIcon = (key) => {
    switch (key) {
      case 'totalFoisCode':
      case 'nombre_fois_code':
      case   'Active driving school':
        case ' number of code hours':
          case 'nombre_heur_code': 
        return <File size={24} />
      case 'totalFoisConduit':
    
        case 'Inactive driving school':
          case 'number of driving hours':
        return <Clock size={24} />
      case 'totalHeuresCode':
        
   
        case 'totalAutoEcoles':
        
          case 'All driving school':
        return <Folder size={24} />
      case 'totalHeuresConduit':
    
      case 'All Services':
        case 'Drive Count':
        return <TrendingUp size={24} />
         default:

          // case 'number of driving hours':
        return <File size={24} />
    }
  }

  const mapStatsDataToColor = (key) => {
    switch (key) {
      case 'totalFoisCode':
      case 'nombre_fois_code':
      case 'Active driving school':
        return 'light-primary'
      case 'totalFoisConduit':
      case 'Drive Count':
        case 'Inactive driving school':
        return 'light-info'
      case 'totalHeuresCode':
      case 'number of code hours':
        case 'All driving school':
        return 'light-danger'
      case 'totalHeuresConduit':
      case 'number of driving hours':
        case 'All Services':
        return 'light-success'
      case 'countAutoEcolesBeforeToday':
      case 'countAutoEcolesAfterToday':
      case 'totalAutoEcoles':
      case 'countServices':
        return 'light-warning' // Vous pouvez remplacer par les couleurs appropriées
      default:
        return 'light-primary'
    }
  }

  const renderData = () => {
    return Object.keys(statsData).map((key, index) => (
      <Col
        key={index}
        md='6'
        sm='12'
        className={`mb-2 mb-${index !== Object.keys(statsData).length - 1 ? '0' : '2'}`}
      >
        <Media>
          <Avatar color={mapStatsDataToColor(key)} icon={mapStatsDataToIcon(key)} className='mr-2' />
          <Media className='my-auto' body>
            <h4 className='font-weight-bolder mb-0'>{key.replace(/_/g, ' ')}</h4>
            <CardText className='font-small-3 mb-0'>{statsData[key]}</CardText>
          </Media>
        </Media>
      </Col>
    ))
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistics</CardTitle>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
