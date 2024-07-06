import { Award } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import { useDispatch } from 'react-redux'
import { isUserLoggedIn } from '@utils'
import { useEffect, useState } from 'react'
const CardCongratulations = () => {
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)
  const [userRole, setUserRole] = useState(null)
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(sessionStorage.getItem('user'))
      console.log("userData1", sessionStorage.getItem('user'))
      console.log('user', userData)
      setUserRole(sessionStorage.getItem('role'))
      console.log("userRole", sessionStorage.getItem('role'))
      console.log('userRole', userRole)
    }
  }, [userData])
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Welcome {userData} </h1>
          {/* <CardText className='m-auto w-75'>
            You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.
          </CardText> */}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
