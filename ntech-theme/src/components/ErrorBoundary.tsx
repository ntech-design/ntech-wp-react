import { Component, ComponentChildren } from 'preact';
import ErrorPage from '@/pages/ErrorPage';

interface ErrorBoundaryProps {
  children: ComponentChildren,
  hasError: false,
}

class ErrorBoundary extends Component<{ children: ComponentChildren }, { hasError: boolean }> {
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
