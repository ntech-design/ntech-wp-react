import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import ContentStyles from '@/components/ContentStyles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';

type ErrorType = {
  error: Error;
}

const MainContent = styled('main')({
  display: 'block',
  width: '100%',
});

function ErrorPage({ error }: ErrorType) {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <ContentStyles>
        <MainContent role="main">
          <h1>Error 500</h1>
          { error &&
            <Alert variant="standard" color="error" icon={false}>
              <AlertTitle color="error" variant="h3">Something went wrong</AlertTitle>
              <p style={{ marginTop: '1.5rem', marginBottom: 0 }}>{ error.message }</p>
            </Alert>
          }
          <Link to="/" className="btn-lifted" style={{ marginTop: '2rem' }}>Home</Link>
        </MainContent>
      </ContentStyles>
    </Container>
  );
}

export default ErrorPage;
