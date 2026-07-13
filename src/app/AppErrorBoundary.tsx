import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Portfolio interface failed", error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <p className="eyebrow">Interface recovery</p>
          <h1>This page could not finish loading.</h1>
          <p>The portfolio is still available. Reload the page or return to the homepage.</p>
          <div className="button-row">
            <button className="button button-primary" type="button" onClick={() => window.location.reload()}>
              Reload page
            </button>
            <a className="button button-secondary" href="/">
              Return home
            </a>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
