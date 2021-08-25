import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Button, Space } from 'antd';
import Reactpip from 'react-picture-in-picture';
import './style.css';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import styled from 'styled-components';
import {
  RiFullscreenLine,
  RiRecordCircleLine,
  RiSettings5Line,
  RiPictureInPictureFill
} from 'react-icons/ri';
import { FaRegLightbulb } from 'react-icons/fa';
import { FiCamera, FiMicOff, FiBell } from 'react-icons/fi';
import { BsMicFill } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';

const StyledButton = styled(Button)`
  background: transparent;
  border: none;
`;
const StyledSpace = styled(Space)`
  display: flex;
  background: #000;
  width: 100px;
  align-items: center;
  flex-direction: column;
`;
const videoType = 'video/webm';

const App = () => {
  const [active, setActive] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [mute, setMute] = useState(true);
  const handle = useFullScreenHandle();
  const [recording, setRecording] = useState(false);
  const [mic, setMic] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleClickingSpeaker = () => {
    setSpeaker(!speaker);
    var vid = document.getElementById('video');
    setMute(!mute);
    vid.muted = mute;
  };

  const captureBtn = () => {
    var video = document.getElementById('video');
    var canvas = document.getElementById('output');
    var table = document.getElementById('tablee');
    console.log(video, canvas, table);
    if (canvas.getContext) {
      var context = canvas.getContext('2d');
      context.drawImage(video, 0, 0);
      // table.append(`<tr><td><img src='${canvas.toDataURL()}'></td></tr>`);
      // setImage([...image], canvas.toDataURL());
    }
  };
  const getMicrophone = async () => {
    const mic = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setMic(mic);
  };

  const stopMicrophone = () => {
    mic.getTracks().forEach(track => track.stop());
    setMic(null);
  };

  const toggleMicrophone = () => {
    if (mic) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }} className={'d-flex'}>
        <FullScreen handle={handle}>
          <Reactpip id="video" isActive={active}>
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/webm" />
          </Reactpip>
        </FullScreen>
        <StyledSpace
          size={16}
          direction="vertical"
          className="videoBtnsWrapper"
        >
          <StyledButton
            type="default"
            onClick={handle.enter}
            icon={
              <RiFullscreenLine style={{ fontSize: '1.5rem', color: '#fff' }} />
            }
          />
          <StyledButton
            type="default"
            icon={
              <RiSettings5Line style={{ fontSize: '1.5rem', color: '#fff' }} />
            }
          />
          <StyledButton
            type="default"
            shape="circle"
            icon={
              <FaRegLightbulb style={{ fontSize: '1.5rem', color: '#fff' }} />
            }
          >
            <br />
            <span style={{ color: '#fff' }}>Light</span>
          </StyledButton>
          <>
            {!recording && (
              <StyledButton
                type="default"
                shape="circle"
                icon={
                  <RiRecordCircleLine
                    style={{ fontSize: '1.5rem', color: '#fff' }}
                  />
                }
              >
                <br />
                <span style={{ color: '#fff' }}>Record</span>
              </StyledButton>
            )}
            {recording && (
              <StyledButton
                type="default"
                shape="circle"
                icon={
                  <BiStopCircle style={{ fontSize: '1.5rem', color: '#fff' }} />
                }
              >
                <br />
                <span style={{ color: '#fff' }}>Stop</span>
              </StyledButton>
            )}
          </>
          <StyledButton
            type="default"
            id="capture"
            onClick={captureBtn}
            icon={<FiCamera style={{ fontSize: '1.5rem', color: '#fff' }} />}
          >
            <br />
            <span style={{ color: '#fff' }}>Photo</span>
          </StyledButton>
          <StyledButton
            type="default"
            shape="circle"
            onClick={toggleMicrophone}
          >
            {mic ? (
              <BsMicFill style={{ fontSize: '1.5rem', color: '#fff' }} />
            ) : (
              <FiMicOff style={{ fontSize: '1.5rem', color: '#fff' }} />
            )}
            <br />
            <span style={{ color: '#fff' }}>Talk</span>
          </StyledButton>
          <StyledButton
            type="default"
            shape="circle"
            onClick={handleClickingSpeaker}
          >
            {speaker ? (
              <GiSpeaker style={{ fontSize: '1.5rem', color: '#fff' }} />
            ) : (
              <GiSpeakerOff style={{ fontSize: '1.5rem', color: '#fff' }} />
            )}
            <br />
            <span style={{ color: '#fff' }}>Speaker</span>
          </StyledButton>
          <StyledButton
            type="default"
            shape="circle"
            icon={
              <AiOutlineEye style={{ fontSize: '1.5rem', color: '#fff' }} />
            }
          >
            <br />
            <span style={{ color: '#fff' }}>Privacy</span>
          </StyledButton>
          <StyledButton
            type="default"
            shape="circle"
            style={{ marginTop: '1rem' }}
            icon={<FiBell style={{ fontSize: '1.5rem', color: '#fff' }} />}
          >
            <br />
            <span style={{ color: '#fff' }}>Deter</span>
          </StyledButton>
          <StyledButton
            type="default"
            title="PictureInPicture"
            onClick={() => setActive(!active)}
            icon={
              <RiPictureInPictureFill
                style={{ fontSize: '1.5rem', color: '#fff' }}
              />
            }
          />
        </StyledSpace>
      </div>
      <canvas
        style={{ width: '300px' }}
        id="output"
        width="1920"
        height="1080"
      />
    </div>
  );
};

export default App;
