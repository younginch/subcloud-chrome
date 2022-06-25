import React from 'react';
import './controllar.css';

export default function Coltrollar() {
  return (
    <div className="mainContainer">
      <div className="d-flex justify-content-end mb-4">
        <div className="d-flex" style={{ alignItems: 'flex-start' }}>
          <p
            className="fs-4 mainColor m-0 fw-bold"
            style={{ height: 'fit-content' }}
          >
            자막 요청 언어
          </p>
        </div>
        <div
          className="d-flex ms-3"
          style={{ alignItems: 'center', marginTop: '-2px' }}
        >
          <select
            className="form-select form-select-lg me-2"
            style={{ width: 'max-content', marginTop: '-16px' }}
            id="requestLanguage"
          >
            <option selected value="ko">
              한국어(Korean)
            </option>
            <option value="en">영어(English)</option>
            <option value="cn">중국어(Chinese)</option>
            <option value="es">스페인어(Spanish)</option>
            <option value="jp">일본어(Japanese)</option>
          </select>
          <div className="d-flex flex-column">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ marginTop: '-3px' }}
            >
              Launch demo modal
            </button>
            <p className="fs-6 m-0 fw-bold" style={{ height: 'fit-content' }}>
              Powered by SubCloud
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
