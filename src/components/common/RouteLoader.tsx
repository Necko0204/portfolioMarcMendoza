export function RouteLoader() {
  return (
    <div className="route-loader" role="status" aria-live="polite">
      <span className="route-loader-mark" aria-hidden="true" />
      <span>Loading this view...</span>
    </div>
  );
}
