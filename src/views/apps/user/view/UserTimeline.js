// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import { getEventUser } from '../../calendar/store/actions'
import { useDispatch, useSelector } from 'react-redux'
// ** Images
import ceo from '@src/assets/images/avatars/12-small.png'
import pdf from '@src/assets/images/icons/file-icons/pdf.png'
import { useEffect } from 'react'
// ** Third Party Components
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

const UserTimeline = ({id}) => {
  const dispatch = useDispatch()
  const event = useSelector(state => state.calendar.eventUser)

  useEffect(() => {
    if (id) {
      dispatch(getEventUser(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    console.log('Event user data updated:', event)
  }, [event])
 
  // const dispatch = useDispatch()
  //   useEffect(() => {
  //     console.log("Fetching data...")
  //     dispatch(getEventUser(id)) }, [dispatch])
  //     const event = useSelector((state) => state.calendar.eventUser) || []
// ** Timeline Data
const data = event ? event.map(row => ({
  title: row.nom_evenement,
  selector: 'nom_evenement',
  content: row.moniteur && row.moniteur.user ? row.moniteur.user.username : '',
  meta: `${new Date(row.date_debut).toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })} - ${new Date(row.date_fin).toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })}`,
  metaClassName: 'mr-1',
  color: 'info'
})) : []

console.log('data', data)

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4' className='mb-2'>
          User Timeline
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Timeline data={data} />
      </CardBody>
    </Card>
  )
}

export default UserTimeline
