/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  AiFillCaretDown,
  AiFillCloseCircle,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import Rating from 'react-rating';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { useEffect, useRef, useState } from 'react';
import sendRating from '../utils/api/sendRating';

type Props = {
  duration: number;
  subId: string;
};

export default function ReviewComponent({ duration, subId }: Props) {
  const clockRef = useRef<any>();
  const [rating, setRating] = useState<number>(3);

  const whiteList = [' ', ',', '.', '?'];
  const releaseList = [
    'Enter',
    'Backspace',
    'Process',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
  ];
  const blackList = [
    'Shift',
    'Alt',
    'Control',
    'Meta',
    'Tab',
    'CapsLock',
    'ArrowUp',
    'ArrowDown',
    'ArrowRight',
    'ArrowLeft',
  ];

  const handleStart = () => clockRef.current.start();
  const handlePause = () => clockRef.current.pause();
  const changeRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    const message = (
      document.getElementById('floatingTextarea') as HTMLTextAreaElement
    ).value;
    await sendRating(subId, rating, message);
    document.getElementById('subcloud-review-placer')?.remove();
    document.getElementById('subcloud-main-modal')?.remove();
  };

  useEffect(() => {
    clockRef.current.start();
  }, [clockRef]);

  const renderer = ({ total, completed }: CountdownRenderProps) => {
    if (completed) {
      document.getElementById('subcloud-review-placer')?.remove();
    }
    return (
      <div
        style={{
          marginLeft: '-10px',
          marginRight: '-10px',
          width: `${(total * 280) / duration}px`,
          backgroundColor: '#ff6666',
          height: '3px',
        }}
      />
    );
  };

  return (
    <div
      id="subcloud-review-placer"
      className="bootstrap"
      onMouseEnter={handlePause}
      onMouseLeave={handleStart}
    >
      <div
        className="d-flex flex-column subcloud-hoverable-glassmorphism"
        style={{
          width: '280px',
          padding: '10px 10px 0px 10px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          className="d-flex flex-row"
          style={{
            justifyContent: 'space-between',
          }}
        >
          <h4 style={{ color: 'black', fontSize: '18px', fontWeight: 600 }}>
            자막을 평가해주세요
          </h4>
          <div
            id="review-close-button"
            onClick={() =>
              document.getElementById('subcloud-review-placer')?.remove()
            }
          >
            <AiFillCloseCircle size="18px" />
          </div>
        </div>
        <div
          className="d-flex flex-row"
          style={{
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <Rating
            emptySymbol={<AiOutlineStar size="30px" />}
            fullSymbol={<AiFillStar size="30px" fill="#FFE900" />}
            onChange={changeRating}
            initialRating={rating}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{
              fontSize: '14px',
            }}
            onClick={handleSubmit}
          >
            리뷰 전송
          </button>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              style={{
                fontSize: '15px',
                height: 'fit-content',
                padding: '5px 10px 10px 5px',
                marginBottom: '10px',
              }}
              onKeyDown={(e) => {
                if (releaseList.includes(e.key)) {
                  return;
                }
                if (
                  whiteList.includes(e.key) ||
                  (e.key >= '0' && e.key <= '9') ||
                  (e.key >= 'a' && e.key <= 'z') ||
                  (e.key >= 'A' && e.key <= 'Z')
                ) {
                  e.preventDefault();
                  const textarea = document.getElementById(
                    'floatingTextarea'
                  ) as HTMLTextAreaElement;
                  if (blackList.includes(e.key)) return;
                  textarea.value += e.key;
                }
              }}
            />
          </div>
        </div>
        <div
          className="d-flex flex-row"
          id="subcloud-message-toggle"
          style={{
            justifyContent: 'flex-end',
            marginLeft: '-10px',
            marginRight: '-10px',
            backgroundColor: 'rgba(50,50,50,.2)',
            padding: '5px 10px 0px 10px',
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px',
          }}
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={() =>
            document.getElementById('subcloud-message-toggle')?.remove()
          }
        >
          <AiFillCaretDown size="18px" style={{ marginTop: '-4px' }} />
        </div>
        <Countdown
          date={Date.now() + duration}
          intervalDelay={0}
          precision={2}
          renderer={renderer}
          ref={clockRef}
          autoStart={false}
        />
      </div>
    </div>
  );
}
