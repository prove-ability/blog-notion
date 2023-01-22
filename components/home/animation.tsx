import Lottie from "react-lottie-player";

import lottieJson from "../../public/love-you-coffee.json";

export default function Animation() {
  return <Lottie loop animationData={lottieJson} play />;
}
