import React from 'react';
import ErrorPage from '@/pages/ErrorPage';

interface ErrorBoundaryProps {
  children: React.ReactNode,
  hasError: false,
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={ new Error('An unexpected error has occurred.') } />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
