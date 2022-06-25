import Layout from './layout';

export default function YoutubeModal() {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ zIndex: 5000 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ width: 'fit-content' }}>
          <Layout />
        </div>
      </div>
    </div>
  );
}
