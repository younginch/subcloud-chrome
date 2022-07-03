export default function ToastComponent() {
  return (
    <div
      className="position-fixed bottom-0 start-50 translate-middle-x p-3"
      style={{ zIndex: 11, justifyContent: 'center' }}
    >
      <div
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div id="0-toast-header" className="toast-header">
          <img
            width="25px"
            height="25px"
            src="https://user-images.githubusercontent.com/17401630/167251131-09b68be9-391c-4b3f-a9fa-85242d63173c.png"
            className="rounded me-2"
            alt="..."
          />
          <p className="fw-bold me-auto fs-4 m-0" style={{ color: 'white' }}>
            SubCloud
          </p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
        <div className="toast-body">
          <p className="fs-4 m-0" id="toast-message" style={{ color: 'white' }}>
            Hello, world! This is a toast message.
          </p>
        </div>
      </div>
    </div>
  );
}
