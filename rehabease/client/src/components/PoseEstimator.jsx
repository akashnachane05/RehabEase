// src/components/PoseEstimator.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posedetection from '@tensorflow-models/pose-detection';

const PoseEstimator = () => {
  const videoRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const loadModel = async () => {
      const model = posedetection.SupportedModels.MoveNet;
      const detectorConfig = { modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
      const detector = await posedetection.createDetector(model, detectorConfig);
      setDetector(detector);
    };

    loadModel();
  }, []);

  useEffect(() => {
    const startVideo = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const detectPose = async () => {
    if (detector && videoRef.current) {
      const poses = await detector.estimatePoses(videoRef.current);
      if (poses.length > 0) {
        const pose = poses[0];
        const leftWrist = pose.keypoints.find(k => k.name === 'left_wrist');
        const leftShoulder = pose.keypoints.find(k => k.name === 'left_shoulder');
        
        if (leftWrist.y < leftShoulder.y) {
          setFeedback('Good job! Your arm is raised.');
        } else {
          setFeedback('Raise your arm higher.');
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectPose();
    }, 100);
    return () => clearInterval(interval);
  }, [detector]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" style={{ display: 'block' }} />
      <p className="text-sm text-gray-600 mt-2">{feedback}</p>
    </div>
  );
};

export default PoseEstimator;