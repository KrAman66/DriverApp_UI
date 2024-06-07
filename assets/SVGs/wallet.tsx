import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WalletSvg(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 21c3 0 5-2.4 5-6V9c0-3.288-1.67-5.58-4.25-5.94-.24-.048-.49-.06-.75-.06H7c-.28 0-.55.024-.81.072C3.64 3.456 2 5.736 2 9v6c0 3.6 2 6 5 6h10zm2-11.4h3v4.8h-3c-1.1 0-2-1.08-2-2.4 0-1.32.9-2.4 2-2.4z"
        fill={props.color}
      />
    </Svg>
  )
}

export default WalletSvg