import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeSvg(props: any) {
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
        d="M14.278 2.748l5.754 3.83C21.131 7.308 22 8.885 22 10.167v6.442c0 2.423-2.068 4.39-4.615 4.39H6.615C4.068 21 2 19.024 2 16.601v-6.556c0-1.197.79-2.717 1.788-3.458l5.005-3.715c1.509-1.112 3.916-1.169 5.485-.124zM11.25 17.2c0 .39.34.712.749.712.41 0 .749-.323.749-.712v-2.85c0-.39-.34-.713-.75-.713-.409 0-.748.323-.748.712v2.85z"
        fill={props.color}
      />
    </Svg>
  )
}

export default HomeSvg