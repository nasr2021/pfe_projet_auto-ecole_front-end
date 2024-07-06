import { Row, Col, Card, CardBody } from 'reactstrap'
import { PhoneCall, Mail, User } from 'react-feather'

const FaqContact = () => {
  return (
    <div id='faq-contact'>
      <Row className='mt-5 pt-75'>
        <Col className='text-center' sm='12'>
          <h2>Payment method</h2>
          <p className='mb-3'>
            {/* If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly! */}
          </p>
        </Col>
        <Col sm='6'>
          <Card className='text-center bg-light-secondary shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                <User size={18} />
              </div>
              <h4>Question:How can I pay the package ?</h4>
              <span className='text-body'>
              Answer: Go to the company to pay the package. After that, you will be able to use the package.
</span>
            </CardBody>
          </Card>
        </Col>
        <Col sm='6'>
          <Card className='text-center bg-light-secondary shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                <Mail size={18} />
              </div>
              <h4>Question: How does payment work for candidate accounts?</h4>
              <span className='text-body'>

Answer: After one year of use, you will pay once based on the number of candidate accounts created.</span>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default FaqContact
