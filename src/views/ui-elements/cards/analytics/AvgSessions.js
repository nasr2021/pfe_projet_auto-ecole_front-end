import { useEffect, useState } from 'react'
import axios from 'axios'
import { kFormatter } from '@utils'
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Progress
} from 'reactstrap'
import Chart from 'react-apexcharts'

const AvgSessions =  ({ data })  => {
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   axios.get('/card/card-analytics/avg-sessions').then(res => setData(res.data))
  // }, [])

  // const options = {
  //     chart: {
  //       sparkline: { enabled: true },
  //       toolbar: { show: false }
  //     },
  //     grid: {
  //       show: false,
  //       padding: {
  //         left: 0,
  //         right: 0
  //       }
  //     },
  //     states: {
  //       hover: {
  //         filter: 'none'
  //       }
  //     },
  //     colors: ['#ebf0f7', '#ebf0f7', props.primary, '#ebf0f7', '#ebf0f7', '#ebf0f7'],
  //     plotOptions: {
  //       bar: {
  //         columnWidth: '45%',
  //         distributed: true,
  //         endingShape: 'rounded'
  //       }
  //     },
  //     tooltip: {
  //       x: { show: false }
  //     },
  //     xaxis: {
  //       type: 'numeric'
  //     }
  //   },
  //   series = [
  //     {
  //       name: 'Sessions',
  //       data: [75, 125, 225, 175, 125, 75, 25]
  //     }
  //   ]

  return data !== null ? (
    <Card>
      <CardBody>
  
        <Row className='pt-50'>
          <Col className='mb-2' md='6' sm='12'>
            <p className='mb-50'>nombre_fois_code: {data.nombre_fois_code}</p>
            <Progress className='avg-session-progress mt-25' value={(data.nombre_fois_code / 100) * 100} />
          </Col>
          <Col className='mb-2' md='6' sm='12'>
            <p className='mb-50'>nombre_fois_conduit: {data.nombre_fois_conduit}</p>
            <Progress className='avg-session-progress progress-bar-warning mt-25' value={(data.nombre_fois_conduit / 100) * 100} />
          </Col>
          <Col md='6' sm='12'>
            <p className='mb-50'>nombre_heures_conduit: {data.nombre_heures_conduit}</p>
            <Progress className='avg-session-progress progress-bar-danger mt-25' value={(data.nombre_heures_conduit / 300) * 100} />
          </Col>
          <Col md='6' sm='12'>
            <p className='mb-50'>nombre_heures_code: {data.nombre_heures_code}</p>
            <Progress className='avg-session-progress progress-bar-success mt-25' value={(data.nombre_heures_code / 300) * 100} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  ) : null
}
export default AvgSessions