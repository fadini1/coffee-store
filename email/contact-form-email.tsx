import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text
} from '@react-email/components';

import { Tailwind } from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
};

const ContactFormEmail: React.FC<ContactFormEmailProps> = ({ 
  name,
  email, 
  message 
}) => {
  return (
    <Html>
      <Head />

      <Preview>
        {name} contacted you from Sunset!
      </Preview>

      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Heading>
                You&apos;ve received a new message from {email}!
              </Heading>

              <Text>
                {message}
              </Text>

              <Hr />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
};

export default ContactFormEmail;