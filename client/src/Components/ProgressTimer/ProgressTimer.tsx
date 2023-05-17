import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

interface ProgressBarProps {
  timer: number;
  active: boolean;
  setActive: (restart:boolean) => void;
}
const ProgressTimer = ({ timer, active, setActive }: ProgressBarProps) => {
  const [progressPercentage, setProgressPercentage] = useState<number>(100);
  
  useEffect(() => {
    if (active && progressPercentage > 0) {
      countDown();
    } else if (progressPercentage <= 0) {
      setActive(false);
      setProgressPercentage(100);
    }
    else {
      setProgressPercentage(100);
    }
  }, [progressPercentage, active]);

  const countDown = () => {
    setTimeout(() => {
      setProgressPercentage(prev => prev - 100 / timer);
    }, 1000);
  }

  if (progressPercentage > 50) {
    return <ProgressBar hidden={progressPercentage < 50} variant="success" animated now={progressPercentage} />
  } else if (progressPercentage > 25) {
    return <ProgressBar hidden={progressPercentage > 50} variant="warning" animated now={progressPercentage} />
  } else {
    return <ProgressBar hidden={progressPercentage > 50} variant="danger" animated now={progressPercentage} />
  }
}

export default ProgressTimer;