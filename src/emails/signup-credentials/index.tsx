import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'

interface SignUpCredentialsEmailTemplateProps {
  actionLabel: string
  buttonText: string
  userName: string
  href: string
  logo: string
  logoTitle: string
  password: string
}

export const SignUpCredentialsEmailTemplate = ({
  actionLabel,
  logo,
  logoTitle,
  buttonText,
  userName,
  href,
  password,
}: SignUpCredentialsEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{actionLabel}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row style={header}>
              <Column>
                <Img
                  // src={`${env.PAYLOAD_URL}/favicon.ico`}
                  src={logo}
                  width='40'
                  height='40'
                  alt='ContentQL'
                />
              </Column>
              <Column>
                <Text style={title}>{logoTitle}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
          </Section>
          <Section style={infoSection}>
            <Text style={infoText}>Hello, {userName}</Text>

            <Text style={infoText}>
              Thank you for signing up! Below are your account credentials:
              <strong>Username:</strong> {userName}
              <br />
              <strong>Password:</strong> {password}
            </Text>

            <Text style={infoText}>
              For security reasons, we strongly recommend updating your password
              immediately. You can do this by logging into your account and
              navigating to the password change section.
            </Text>

            <Button href={href} style={button}>
              {buttonText}
            </Button>

            <Text style={infoText}>
              If you have any questions or need assistance, feel free to reach
              out to our support team.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const SignUpCredentials = (props: SignUpCredentialsEmailTemplateProps) =>
  render(<SignUpCredentialsEmailTemplate {...props} />, { pretty: true })

const infoSection = {
  marginBottom: '24px',
}

const header = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
}

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f1f5f9',
  marginLeft: '10px',
}

const main = {
  backgroundColor: '#fff',
  color: '#f1f5f9',
  margin: 'auto',
  padding: '10px 0px',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
  maxWidth: '600px',
  backgroundColor: '#F5F5F5',
  margin: 'auto',
  padding: '24px',
}

const hr = {
  borderColor: '#334155',
  margin: '20px 0',
}

const infoText = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#f1f5f9',
  textAlign: 'left' as const,
}

const button = {
  fontSize: '16px',
  backgroundColor: '#0F172A',
  color: '#f1f5f9',
  lineHeight: 1.5,
  borderRadius: '8px',
  padding: '12px 24px',
  transition: 'background-color 0.2s ease-in-out',
  marginTop: '8px',
  marginBottom: '8px',
}
