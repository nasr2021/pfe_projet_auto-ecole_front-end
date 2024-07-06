import { Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Heart, MessageSquare, Share2 } from 'react-feather'
import { Card, CardBody, CardText, Row, Col, UncontrolledTooltip, Input, Label, Button } from 'reactstrap'

const ProfileEdit = ({ data }) => {

      return (
        <Card className='post' >
          <CardBody>
         
          
              <div  className='d-flex align-items-start mb-1'>
                {/* <Avatar img={comment.avatar} className='mt-25 mr-75' imgHeight='34' imgWidth='34' /> */}
                <div className='profile-user-info w-100'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <h6 className='mb-0'></h6>
                   
                  </div>
                  <small></small>
                </div>
              </div>
            {/* ))} */}
            <fieldset className='form-label-group mb-50'>
              <Input  type='textarea' rows='3' placeholder='Add Comment' />
              <Label >Add Comment</Label>
            </fieldset>
            <Button.Ripple color='primary' size='sm'>
              Post 
            </Button.Ripple>
          </CardBody>
        </Card>
      )
}
export default ProfileEdit
