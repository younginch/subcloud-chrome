export default function ToastComponent() {
  return (
    <div
      className="position-fixed bottom-0 start-50 translate-middle-x p-3"
      style={{ zIndex: 3001, justifyContent: 'center' }}
    >
      <div
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          borderRadius: '10px',
        }}
      >
        <div
          id="0-toast-header"
          className="toast-header"
          style={{
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        >
          <svg
            viewBox="0 0 740 640"
            focusable="false"
            width="30px"
            height="30px"
            fill="white"
          >
            <g>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M344.63086,89.46647c91.75941,0,166.99546,56.97585,174.1405,129.39647c48.80328,9.93893,86.14452,65.01781,86.14452,131.47472c0,65.94489-36.76806,120.68639-85.01855,131.23697l-.11278,75.68546-116.8136-66.32496c-98.01612,0-232.3118,0-232.3118,0-66.69551,0-121.48678-67.103-121.48678-140.59748s54.06739-133.07352,120.7629-133.07352c.24146,0,.48275.00078.72388.00234c8.08456-71.65973,82.88761-127.80002,173.9717-127.80002l.00001.00002ZM322.22452,328.77159v-50.63286h-155.01571v50.63286h155.01571Zm189.08987,0v-50.63286h-137.29741v50.63286h137.29741Zm0,92.09558v-50.63286h-180.40573v50.63286h180.40573Zm-231.35227,0v-50.63286h-112.75331v50.63286h112.75331Z"
                fill="inherit"
                strokeWidth="0"
              />
            </g>
          </svg>
          <p
            className="fw-bold me-auto fs-4 m-0 ms-2"
            style={{ color: 'white' }}
          >
            SubCloud
          </p>
          <button
            type="button"
            className="btn-close me-2"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
        <div className="toast-body">
          <p
            className="fs-3 m-0 ps-2"
            id="toast-message"
            style={{ color: 'white' }}
          >
            Hello, world! This is a toast message.
          </p>
        </div>
      </div>
    </div>
  );
}
