import React, { useState } from "react";
import { X } from "lucide-react";

export const ApplicationModal = ({
  onSubmit,
  onClose,
  membership = "elite",
}) => {
  // Function to render the correct membership logo based on membership type
  const renderMembershipLogo = () => {
    if (membership === "elite") {
      return (
        <div className="flex justify-center w-full">
          <div className="flex justify-center w-full sm:w-3/4 md:w-1/2">
            <svg
              className="w-full h-auto max-w-[200px]"
              viewBox="0 0 413.04 372.72"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <path
                d="M146.91,298.89c-24.84,3.51-57.73,14.04-81.42,21.64,1.8-9.16,6.77-28.49,6.77-28.49,0,0-17.95-8.98-28.99-15.45,30.11-9.68,52.51-15.12,84.17-19.1l4.96,9.13,14.51,32.26h0Z"
                fill="url(#linear-gradient)"
              />
              <polygon
                points="145.29 304.46 84.3 297.02 84.3 269.99 131.99 268.08 145.29 304.46 145.29 304.46"
                fill="#6d4703"
              />
              <path
                d="M258.05,298.89c25.58,3.51,59.45,14.04,83.85,21.64-1.86-9.16-6.97-28.49-6.97-28.49,0,0,18.48-8.98,29.86-15.45-31-9.68-54.07-15.12-86.68-19.1l-5.11,9.13-14.94,32.26h0Z"
                fill="url(#linear-gradient)"
              />
              <polygon
                points="260.78 304.46 323.72 297.02 323.72 269.99 274.51 268.08 260.78 304.46 260.78 304.46"
                fill="#6d4703"
              />
              <polygon
                points="330.81 112.31 319.85 106.44 319.97 80.16 288.97 69.14 289.02 57.73 204 30.53 118.66 56.91 118.61 68.32 87.49 79.04 87.37 105.31 76.35 111.09 75.61 263.72 75.51 274.62 202.44 347.2 248.05 321.7 248.02 321.73 330.02 275.87 330.81 112.31"
                fill="#e8e7e2"
              />
              <polygon
                points="311.39 111.45 311.52 86.08 280.51 75.06 280.56 63.86 203.91 39.33 127.01 63.12 126.95 74.32 95.84 85.04 95.72 110.41 84.7 116.18 83.96 269.78 202.47 337.54 321.62 270.93 322.36 117.33 311.39 111.45"
                fill="#232066"
              />
              <path
                d="M101.43,259.7l101.13,57.82,101.68-56.84.64-132.95-10.97-5.88.11-23.49-31.01-11.02.05-10.78-59.26-18.96-59.45,18.39-.05,10.78-31.11,10.72-.11,23.49-11.02,5.77-.64,132.95Z"
                fill="#fff"
              />
              <path
                d="M323.05,296.89c-38.63-13.49-78.94-20.33-119.9-20.33s-81.27,6.84-119.9,20.33l-17.48-48.55c44.25-15.52,90.45-23.38,137.38-23.38s93.13,7.86,137.38,23.38l-17.48,48.55h0Z"
                fill="url(#linear-gradient-4)"
              />
              <g>
                <polygon
                  points="189.97 148.32 153.51 148.32 151.88 150.12 191.55 150.12 189.97 148.32"
                  fill="#241d5d"
                />
                <polygon
                  points="176.87 193.11 166.5 193.11 171.69 198.41 176.87 193.11"
                  fill="#241d5d"
                />
                <polygon
                  points="192.16 143.89 151.37 143.89 131.12 163.92 171.61 205.2 188.13 188.31 185.51 188.31 171.6 202.52 133.76 163.94 152.14 145.76 191.38 145.76 197.7 152.18 200.32 152.18 192.16 143.89"
                  fill="#241d5d"
                />
              </g>
              <g>
                <polygon
                  points="164.42 172.72 178.25 172.72 178.25 167.35 164.42 167.35 164.42 160.88 180.08 160.88 180.08 155.35 157.56 155.35 157.56 185.15 180.64 185.15 180.64 179.61 164.42 179.61 164.42 172.72"
                  fill="#241d5d"
                />
                <polygon
                  points="193.03 155.35 186.13 155.35 186.13 185.15 207.97 185.15 207.97 179.53 193.03 179.53 193.03 155.35"
                  fill="#241d5d"
                />
                <rect
                  x="211.84"
                  y="155.35"
                  width="6.9"
                  height="29.8"
                  fill="#241d5d"
                />
                <polygon
                  points="222.44 160.97 231.98 160.97 231.98 185.15 238.88 185.15 238.88 160.97 248.42 160.97 248.42 155.35 222.44 155.35 222.44 160.97"
                  fill="#241d5d"
                />
                <polygon
                  points="258.97 179.61 258.97 172.72 272.81 172.72 272.81 167.35 258.97 167.35 258.97 160.88 274.64 160.88 274.64 155.35 252.12 155.35 252.12 185.15 275.2 185.15 275.2 179.61 258.97 179.61"
                  fill="#241d5d"
                />
              </g>
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="43.27"
                  y1="289.01"
                  x2="146.91"
                  y2="289.01"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#a6773e" />
                  <stop offset=".11" stopColor="#c9a255" />
                  <stop offset=".24" stopColor="#f0d16d" />
                  <stop offset=".31" stopColor="#ffe377" />
                  <stop offset=".37" stopColor="#f6d971" />
                  <stop offset=".48" stopColor="#e1be63" />
                  <stop offset=".62" stopColor="#bd944d" />
                  <stop offset=".7" stopColor="#a6773e" />
                  <stop offset="1" stopColor="#dab65f" />
                </linearGradient>
                <linearGradient
                  id="linear-gradient-2"
                  x1="258.05"
                  x2="364.79"
                  xlinkHref="#linear-gradient"
                />
                <linearGradient
                  id="linear-gradient-3"
                  x1="197.27"
                  y1="292.89"
                  x2="209.04"
                  y2="292.89"
                  xlinkHref="#linear-gradient"
                />
                <linearGradient
                  id="linear-gradient-4"
                  x1="65.78"
                  y1="260.93"
                  x2="340.54"
                  y2="260.93"
                  xlinkHref="#linear-gradient"
                />
              </defs>
            </svg>
          </div>
        </div>
      );
    } else if (membership === "max") {
      return (
        <div className="flex justify-center w-full">
          <div className="flex justify-center w-full sm:w-3/4 md:w-1/2">
            <svg
              className="w-full h-auto max-w-[200px]"
              viewBox="0 0 413.04 372.72"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <path
                d="M145.58,298.89c-24.84,3.51-57.73,14.04-81.42,21.64,1.8-9.16,6.77-28.49,6.77-28.49,0,0-17.95-8.98-28.99-15.45,30.11-9.68,52.51-15.12,84.17-19.1l4.96,9.13,14.51,32.26h0Z"
                fill="url(#linear-gradient)"
              />
              <polygon
                points="143.96 304.46 82.97 297.02 82.97 269.99 130.65 268.08 143.96 304.46 143.96 304.46"
                fill="#6d4703"
              />
              <path
                d="M256.71,298.89c25.58,3.51,59.45,14.04,83.85,21.64-1.86-9.16-6.97-28.49-6.97-28.49,0,0,18.48-8.98,29.86-15.45-31-9.68-54.07-15.12-86.68-19.1l-5.11,9.13-14.94,32.26h0Z"
                fill="url(#linear-gradient)"
              />
              <polygon
                points="259.45 304.46 322.38 297.02 322.38 269.99 273.18 268.08 259.45 304.46 259.45 304.46"
                fill="#6d4703"
              />
              <polygon
                points="329.48 112.31 318.51 106.44 318.64 80.16 287.63 69.14 287.69 57.73 202.67 30.53 117.33 56.91 117.27 68.32 86.16 79.04 86.03 105.31 75.01 111.09 74.28 263.72 74.17 274.62 201.11 347.2 246.71 321.7 246.68 321.73 328.69 275.87 329.48 112.31"
                fill="#e8e7e2"
              />
              <polygon
                points="310.06 111.45 310.18 86.08 279.18 75.06 279.23 63.86 202.57 39.33 125.67 63.12 125.62 74.32 94.51 85.04 94.39 110.41 83.37 116.18 82.62 269.78 201.13 337.54 320.28 270.93 321.02 117.33 310.06 111.45"
                fill="#dc6bbc"
              />
              <path
                d="M100.1,259.7l101.13,57.82,101.68-56.84.64-132.95-10.97-5.88.11-23.49-31.01-11.02.05-10.78-59.26-18.96-59.45,18.39-.05,10.78-31.11,10.72-.11,23.49-11.02,5.77-.64,132.95Z"
                fill="#fff"
              />
              <path
                d="M321.72,296.89c-38.63-13.49-78.94-20.33-119.9-20.33s-81.27,6.84-119.9,20.33l-17.48-48.55c44.25-15.52,90.45-23.38,137.38-23.38s93.13,7.86,137.38,23.38l-17.48,48.55h0Z"
                fill="url(#linear-gradient-4)"
              />
              <path
                d="M199.17,171.94l2.05-.52c.71-.91,1.73-1.47,2.84-1.53l.44-.03,2-4.8,1.9,4.6c.51.03,1.02.17,1.48.43l3.52,1.95c.17.09.37.11.54.04l2.77-1.05-6.2-13.86h-7.95l-6.37,14.29,1.57.47c.45.13.93.14,1.38.03Z"
                fill="#dc6bbc"
              />
              <path
                d="M218.58,184.34c.12.96-.26,1.91-1.02,2.48-.39.29-.86.47-1.34.5-.04.22-.13.44-.22.64l1.64,3.96h8.44l-4.54-10.15-2.96,2.56Z"
                fill="#dc6bbc"
              />
              <path
                d="M195.16,188.03c-.98-.77-1.24-2.22-.6-3.3l.31-.51-3.38-2.18-4.4,9.88h8.24l1.3-3.12c-.39-.06-.75-.22-1.07-.47l-.4-.31Z"
                fill="#dc6bbc"
              />
              <polygon
                points="177.63 157.16 164.82 178.75 151.8 157.16 145.15 157.16 145.15 191.92 152.7 191.92 152.7 171.51 162.88 188.25 166.5 188.25 176.74 171.06 176.78 191.92 184.33 191.92 184.23 157.16 177.63 157.16"
                fill="#dc6bbc"
              />
              <polygon
                points="263.1 191.92 250.13 173.95 262.25 157.16 253.51 157.16 245.69 168.41 237.72 157.16 228.58 157.16 240.77 174.22 227.94 191.92 237.17 191.92 245.43 179.84 253.81 191.92 263.1 191.92"
                fill="#dc6bbc"
              />
              <path
                d="M198.35,184.24l-.4-.31c-.19-.15-.41-.22-.63-.22-.07,0-.13,0-.2.02-.23.05-.44.17-.6.35,0,.01-.02.03-.03.04-.03.04-.06.08-.08.12l-.71,1.19c-.3.51-.18,1.18.27,1.54l.4.31c.24.19.54.26.83.2.3-.06.55-.24.71-.51l.19-.31s0,0,0-.01l.53-.89c.29-.51.17-1.17-.28-1.52Z"
                fill="#dc6bbc"
              />
              <path
                d="M201.36,185.28l-.3-.24c-.19-.15-.41-.22-.63-.22-.07,0-.13,0-.2.02-.3.06-.55.24-.71.51l-.43.73-.53.88s0,0,0,0c-.3.51-.18,1.18.27,1.54l.3.24c.24.19.54.26.83.2.3-.06.55-.24.71-.51l.24-.4s0,0,0,0l.72-1.21c.3-.51.18-1.18-.27-1.53Z"
                fill="#dc6bbc"
              />
              <path
                d="M204.46,187.73c0-.35-.15-.7-.44-.93l-.26-.2c-.19-.15-.4-.22-.63-.22-.07,0-.13,0-.2.02-.29.06-.55.24-.71.51l-.13.21-.72,1.21c-.3.51-.19,1.18.27,1.54l.26.2c.24.19.54.26.83.2.3-.06.55-.24.71-.51l.39-.65s0,0,0,0l.07-.11.4-.66c.11-.19.17-.4.17-.61Z"
                fill="#dc6bbc"
              />
              <path
                d="M206.41,188.14c-.19-.15-.4-.22-.63-.22-.07,0-.13,0-.2.02-.3.06-.55.24-.71.51l-.59.98c-.3.51-.19,1.18.27,1.54.24.19.54.26.83.2.29-.06.55-.24.71-.51l.59-.98s0,0,0,0c0,0,0,0,0,0,.11-.18.16-.39.16-.6,0-.35-.15-.7-.44-.93Z"
                fill="#dc6bbc"
              />
              <path
                d="M212.74,173.21l-3.52-1.94c-.36-.2-.76-.29-1.16-.27l-3.94.23c-.97.06-1.82.67-2.23,1.61l-1.67,3.78c-.24.54-.06,1.18.42,1.49.45.29,1.02.19,1.37-.23l2.32-2.8c.28-.34.68-.53,1.1-.53.12,0,.24.02.37.05l2.93.8c.22.06.43.15.63.27l4.78,2.91c.67.41,1.22,1,1.61,1.71,0,0,0,0,0,0l1.72,3.2,3.5-3.03-3.65-8.17-2.89,1.02c-.55.21-1.16.16-1.68-.12Z"
                fill="#dc6bbc"
              />
              <path
                d="M216.72,185.74c.53-.4.68-1.15.36-1.75l-1.82-3.4c-.34-.62-.83-1.14-1.41-1.5l-4.78-2.91c-.15-.09-.32-.17-.49-.21l-2.93-.8c-.33-.09-.69.02-.91.3l-2.32,2.8c-.52.63-1.39.77-2.06.34-.72-.46-.99-1.42-.63-2.23l1.58-3.59-1.83.46c-.69.18-1.42.16-2.1-.04l-1.64-.49-3.7,8.09,4.22,2.73c.21-.2.47-.33.76-.39.44-.09.9.02,1.25.31l.4.31c.32.25.52.6.61.98.23-.24.52-.41.84-.47.44-.09.9.02,1.25.3l.3.24c.38.3.61.74.65,1.21.15-.09.32-.16.49-.19.44-.09.9.02,1.25.3l.26.2c.38.3.61.75.65,1.22.15-.09.31-.15.49-.19.44-.09.9.02,1.26.3.63.49.83,1.39.51,2.12.2.27.51.43.84.43.22,0,.44-.07.62-.21.45-.34.59-.99.31-1.51l-1.74-3.26c-.07-.14-.03-.32.1-.4.13-.08.3-.03.37.11l1.74,3.26.33.61c.17.33.46.55.81.64.35.08.7,0,.98-.21.52-.39.68-1.13.37-1.72l-2.23-4.16c-.07-.14-.03-.32.1-.4.13-.08.3-.03.37.11l2.22,4.14.12.22c.18.33.46.56.81.64.35.08.7,0,.99-.21.53-.4.68-1.15.36-1.75l-.28-.52-2.2-4.11c-.07-.14-.03-.32.1-.4.13-.08.3-.03.37.11l2.2,4.11c.22.41.64.67,1.08.67.26,0,.5-.08.72-.24Z"
                fill="#dc6bbc"
              />
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="41.93"
                  y1="289.01"
                  x2="145.58"
                  y2="289.01"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#a6773e" />
                  <stop offset=".11" stopColor="#c9a255" />
                  <stop offset=".24" stopColor="#f0d16d" />
                  <stop offset=".31" stopColor="#ffe377" />
                  <stop offset=".37" stopColor="#f6d971" />
                  <stop offset=".48" stopColor="#e1be63" />
                  <stop offset=".62" stopColor="#bd944d" />
                  <stop offset=".7" stopColor="#a6773e" />
                  <stop offset="1" stopColor="#dab65f" />
                </linearGradient>
                <linearGradient
                  id="linear-gradient-2"
                  x1="256.71"
                  x2="363.45"
                  xlinkHref="#linear-gradient"
                />
                <linearGradient
                  id="linear-gradient-3"
                  x1="195.94"
                  y1="292.89"
                  x2="207.71"
                  y2="292.89"
                  xlinkHref="#linear-gradient"
                />
                <linearGradient
                  id="linear-gradient-4"
                  x1="64.45"
                  y1="260.93"
                  x2="339.2"
                  y2="260.93"
                  xlinkHref="#linear-gradient"
                />
              </defs>
            </svg>
          </div>
        </div>
      );
    } else if (membership === "quickpay") {
      return (
        <div className="flex justify-center w-full">
          <div className="flex justify-center w-full sm:w-3/4 md:w-1/2">
            <svg
              className="w-full h-auto max-w-[200px]"
              viewBox="0 0 413.04 372.72"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <path
                d="M148.87,298.89c-24.84,3.51-57.73,14.04-81.42,21.64,1.8-9.16,6.77-28.49,6.77-28.49,0,0-17.95-8.98-28.99-15.45,30.11-9.68,52.51-15.12,84.17-19.1l4.96,9.13,14.51,32.26h0Z"
                fill="url(#linear-gradient)"
              />
              <polygon
                points="147.25 304.46 86.26 297.02 86.26 269.99 133.95 268.08 147.25 304.46 147.25 304.46"
                fill="#6d4703"
              />
              <path
                d="M260.01,298.89c25.58,3.51,59.45,14.04,83.85,21.64-1.86-9.16-6.97-28.49-6.97-28.49,0,0,18.48-8.98,29.86-15.45-31-9.68-54.07-15.12-86.68-19.1l-5.11,9.13-14.94,32.26h0Z"
                fill="url(#linear-gradient)"
              />
              <polygon
                points="262.75 304.46 325.68 297.02 325.68 269.99 276.47 268.08 262.75 304.46 262.75 304.46"
                fill="#6d4703"
              />
              <polygon
                points="332.77 112.31 321.81 106.44 321.93 80.16 290.93 69.14 290.98 57.73 205.96 30.53 120.62 56.91 120.57 68.32 89.45 79.04 89.33 105.31 78.31 111.09 77.57 263.72 77.47 274.62 204.41 347.2 250.01 321.7 249.98 321.73 331.98 275.87 332.77 112.31"
                fill="#e8e7e2"
              />
              <polygon
                points="313.35 111.45 313.48 86.08 282.47 75.06 282.53 63.86 205.87 39.33 128.97 63.12 128.92 74.32 97.81 85.04 97.68 110.41 86.66 116.18 85.92 269.78 204.43 337.54 323.58 270.93 324.32 117.33 313.35 111.45"
                fill="#93c12f"
              />
              <path
                d="M103.39,259.7l101.13,57.82,101.68-56.84.64-132.95-10.97-5.88.11-23.49-31.01-11.02.05-10.78-59.26-18.96-59.45,18.39-.05,10.78-31.11,10.72-.11,23.49-11.02,5.77-.64,132.95Z"
                fill="#fff"
              />
              <path
                d="M325.02,296.89c-38.63-13.49-78.94-20.33-119.9-20.33s-81.27,6.84-119.9,20.33l-17.48-48.55c44.25-15.52,90.45-23.38,137.38-23.38s93.13,7.86,137.38,23.38l-17.48,48.55h0Z"
                fill="url(#linear-gradient-4)"
              />
              <g>
                <rect
                  x="127.74"
                  y="162.42"
                  width="12.8"
                  height="2.37"
                  rx=".95"
                  ry=".95"
                  fill="#93c12f"
                />
                <rect
                  x="121.2"
                  y="167.87"
                  width="16.75"
                  height="2.37"
                  rx=".95"
                  ry=".95"
                  fill="#93c12f"
                />
                <rect
                  x="127.74"
                  y="173.32"
                  width="12.8"
                  height="2.37"
                  rx=".95"
                  ry=".95"
                  fill="#93c12f"
                />
              </g>
              <g>
                <path
                  d="M159.69,177.68l3.16,4h-2.62l-2.17-2.76c-1.74,1.07-3.7,1.61-5.88,1.61-3.16,0-5.82-1.08-7.99-3.25-2.17-2.16-3.26-4.78-3.26-7.85,0-2.05.5-3.95,1.49-5.7.99-1.75,2.35-3.12,4.06-4.11,1.71-.99,3.59-1.48,5.64-1.48,3.16,0,5.82,1.08,7.99,3.24,2.17,2.16,3.25,4.81,3.25,7.96,0,1.64-.3,3.14-.89,4.51-.59,1.36-1.52,2.64-2.78,3.83ZM158.38,176.01c1.86-1.81,2.79-4.04,2.79-6.69,0-1.69-.39-3.22-1.18-4.59-.79-1.37-1.9-2.46-3.33-3.29-1.43-.82-2.94-1.23-4.52-1.23s-3.1.41-4.51,1.23c-1.41.82-2.51,1.92-3.3,3.32-.79,1.4-1.19,2.95-1.19,4.66,0,2.53.87,4.67,2.62,6.42,1.75,1.75,3.86,2.62,6.33,2.62,1.69,0,3.24-.41,4.64-1.23l-4.75-6.03h2.59l3.81,4.81Z"
                  fill="#93c12f"
                />
                <path
                  d="M167.76,158.68h2.13v12.87c0,1.53.03,2.48.09,2.86.11.84.35,1.54.74,2.11.39.57.98,1.04,1.78,1.42.8.38,1.61.57,2.42.57.71,0,1.38-.15,2.03-.45.65-.3,1.19-.71,1.62-1.25.43-.53.75-1.17.96-1.93.15-.54.22-1.65.22-3.33v-12.87h2.13v12.87c0,1.9-.19,3.44-.56,4.62-.37,1.17-1.12,2.2-2.23,3.07s-2.47,1.3-4.05,1.3c-1.72,0-3.19-.41-4.42-1.23-1.23-.82-2.05-1.91-2.46-3.26-.26-.83-.39-2.33-.39-4.49v-12.87Z"
                  fill="#93c12f"
                />
                <path
                  d="M186.81,158.68h2.13v21.32h-2.13v-21.32Z"
                  fill="#93c12f"
                />
                <path
                  d="M213.68,162.63l-1.68,1.29c-.93-1.21-2.04-2.12-3.34-2.75-1.3-.62-2.73-.93-4.28-.93-1.7,0-3.28.41-4.72,1.22-1.45.82-2.57,1.91-3.37,3.29-.8,1.38-1.2,2.93-1.2,4.64,0,2.6.89,4.77,2.67,6.51,1.78,1.74,4.03,2.61,6.75,2.61,2.99,0,5.48-1.17,7.49-3.51l1.68,1.28c-1.06,1.35-2.39,2.4-3.98,3.14-1.59.74-3.36,1.11-5.33,1.11-3.73,0-6.67-1.24-8.83-3.72-1.81-2.1-2.71-4.63-2.71-7.59,0-3.12,1.09-5.75,3.28-7.88s4.93-3.2,8.22-3.2c1.99,0,3.79.39,5.39,1.18,1.6.79,2.92,1.89,3.94,3.31Z"
                  fill="#93c12f"
                />
                <path
                  d="M217.96,158.68h2.17v8l8.52-8h2.86l-10.24,9.56,11.04,11.75h-2.84l-9.34-9.93v9.93h-2.17v-21.32Z"
                  fill="#93c12f"
                />
                <path
                  d="M235.32,158.68h4.3c2.33,0,4.01.22,5.04.64,1.03.43,1.84,1.13,2.43,2.09.59.96.89,2.11.89,3.46,0,1.49-.39,2.72-1.17,3.71-.78.99-1.83,1.67-3.17,2.06-.78.22-2.21.33-4.28.33v9.03h-4.06v-21.32ZM239.38,167.01h1.29c1.01,0,1.72-.07,2.12-.22.4-.15.71-.39.93-.72.23-.33.34-.74.34-1.21,0-.82-.32-1.43-.96-1.8-.46-.28-1.32-.42-2.58-.42h-1.14v4.38Z"
                  fill="#93c12f"
                />
                <path
                  d="M258.46,158.68h4.12l8.2,21.32h-4.22l-1.67-4.39h-8.7l-1.73,4.39h-4.22l8.22-21.32ZM260.54,164.33l-2.86,7.32h5.7l-2.84-7.32Z"
                  fill="#93c12f"
                />
                <path
                  d="M272.4,158.68h4.36l3.98,7.67,3.96-7.67h4.3l-6.24,12.09v9.23h-4.09v-9.23l-6.27-12.09Z"
                  fill="#93c12f"
                />
              </g>
              <g>
                <path
                  d="M218.23,183.96h1.34c.54,0,.96.06,1.25.19.29.13.52.33.69.59.17.27.25.56.25.88,0,.3-.07.58-.22.83-.15.25-.36.45-.65.6.35.12.63.26.82.42.19.16.34.36.45.59.11.23.16.48.16.75,0,.55-.2,1.01-.6,1.39-.4.38-.94.57-1.61.57h-1.87v-6.81ZM218.9,184.63v2.18h.39c.47,0,.82-.04,1.04-.13.22-.09.4-.23.53-.42s.19-.4.19-.63c0-.31-.11-.56-.33-.73s-.57-.27-1.04-.27h-.79ZM218.9,187.49v2.61h.84c.5,0,.86-.05,1.09-.15.23-.1.42-.25.56-.46.14-.21.21-.43.21-.67,0-.3-.1-.57-.3-.79-.2-.23-.47-.38-.82-.46-.23-.06-.64-.08-1.21-.08h-.39Z"
                  fill="#93c12f"
                />
                <path
                  d="M226.44,183.96h.78l1.74,2.81,1.72-2.81h.79l-2.16,3.56v3.26h-.67v-3.26l-2.2-3.56Z"
                  fill="#93c12f"
                />
                <path
                  d="M241.85,183.96h1.36c.78,0,1.3.03,1.57.1.39.1.71.29.95.59.25.3.37.67.37,1.12s-.12.83-.36,1.12c-.24.29-.57.49-1,.6-.31.07-.89.11-1.73.11h-.49v3.17h-.68v-6.81ZM242.53,184.63v2.31h1.15c.47.01.81-.03,1.02-.11.22-.08.39-.22.51-.41.12-.19.19-.4.19-.64s-.06-.44-.19-.63-.29-.32-.49-.4c-.2-.08-.53-.12-.99-.12h-1.2Z"
                  fill="#93c12f"
                />
                <path d="M250.69,183.96h.68v6.81h-.68v-6.81Z" fill="#93c12f" />
                <path
                  d="M256.26,190.77v-6.81h.15l4.53,5.22v-5.22h.67v6.81h-.15l-4.5-5.16v5.16h-.7Z"
                  fill="#93c12f"
                />
                <path
                  d="M272.93,185.22l-.54.41c-.3-.39-.65-.68-1.07-.88-.42-.2-.87-.3-1.37-.3-.54,0-1.05.13-1.51.39-.46.26-.82.61-1.08,1.05s-.38.93-.38,1.48c0,.83.28,1.52.85,2.08.57.56,1.29.83,2.16.83.95,0,1.75-.37,2.39-1.12l.54.41c-.34.43-.76.77-1.27,1-.51.24-1.08.35-1.7.35-1.19,0-2.13-.4-2.82-1.19-.58-.67-.87-1.48-.87-2.43,0-1,.35-1.84,1.05-2.52.7-.68,1.58-1.02,2.63-1.02.64,0,1.21.13,1.72.38.51.25.93.6,1.26,1.06Z"
                  fill="#93c12f"
                />
                <path
                  d="M277.61,183.96h.68v2.86h3.47v-2.86h.68v6.81h-.68v-3.29h-3.47v3.29h-.68v-6.81Z"
                  fill="#93c12f"
                />
              </g>
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="45.23"
                  y1="289.01"
                  x2="148.87"
                  y2="289.01"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#a6773e" />
                  <stop offset=".11" stopColor="#c9a255" />
                  <stop offset=".24" stopColor="#f0d16d" />
                  <stop offset=".31" stopColor="#ffe377" />
                  <stop offset=".37" stopColor="#f6d971" />
                  <stop offset=".48" stopColor="#e1be63" />
                  <stop offset=".62" stopColor="#bd944d" />
                  <stop offset=".7" stopColor="#a6773e" />
                  <stop offset="1" stopColor="#dab65f" />
                </linearGradient>
                <linearGradient
                  id="linear-gradient-2"
                  x1="260.01"
                  x2="366.75"
                  xlinkHref="#linear-gradient"
                />
                <linearGradient
                  id="linear-gradient-3"
                  x1="199.24"
                  y1="292.89"
                  x2="211"
                  y2="292.89"
                  xlinkHref="#linear-gradient"
                />
                <linearGradient
                  id="linear-gradient-4"
                  x1="67.74"
                  y1="260.93"
                  x2="342.5"
                  y2="260.93"
                  xlinkHref="#linear-gradient"
                />
              </defs>
            </svg>
          </div>
        </div>
      );
    }

    // Default logo if membership is unknown
    return (
      <div className="bg-blue-100 p-4 rounded-full">
        <div className="bg-blue-800 rounded-lg p-3">
          <span className="text-white font-bold">PINCH</span>
          <div className="bg-yellow-400 h-1 mt-1"></div>
        </div>
      </div>
    );
  };

  // State for tracking screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Effect to handle resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-6 md:p-10"
      style={{
        backgroundImage:
          "url('https://static.wixstatic.com/media/e16f16_3e21b9e78fde4eeaa1f865b0eba72cd3~mv2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg relative mx-auto max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="flex justify-center mb-4 mt-6 sm:mb-6 sm:mt-2">
          {renderMembershipLogo()}
        </div>

        <h2 className="text-lg font-semibold text-center mb-4">
          Thank you for your interest in this role.
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please answer the following questions:
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(e.target);

            // Obtener días disponibles de los checkboxes
            const availableDays = Array.from(
              document.querySelectorAll('input[name="availableDays"]:checked')
            ).map((cb) => cb.value);

            // Formatear los datos
            const formValues = {
              teamSize: formData.get("teamSize"),
              experienceYears: formData.get("experienceYears"),
              hasPropertyExperience: formData.get("experience") === "yes",
              companyName: formData.get("companyName"),
              lastCleanedYear: formData.get("lastCleanedYear"),
              availableDays: availableDays,
              unavailableTimes: formData.get("unavailableTimes"),
            };

            // Enviar el formulario
            onSubmit(formValues);
          }}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              1. How many cleaners are on your team
            </label>
            <select
              name="teamSize"
              className="w-full p-2 border rounded text-gray-800 text-sm sm:text-base"
              required>
              <option value="2-5">2-5 cleaners</option>
              <option value="6-10">6-10 cleaners</option>
              <option value="11-20">11-20 cleaners</option>
              <option value="20+">20+ cleaners</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              2. How many years have you been cleaning?
            </label>
            <select
              name="experienceYears"
              className="w-full p-2 border rounded text-gray-800 text-sm sm:text-base"
              required>
              <option value="<1">Less than 1 year</option>
              <option value="1-2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              3. Do you have current experience cleaning for property management
              companies?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="experience"
                id="exp-yes"
                value="yes"
                className="mr-2 h-4 w-4"
                defaultChecked
              />
              <label htmlFor="exp-yes" className="mr-4 text-sm sm:text-base">
                Yes
              </label>

              <input
                type="radio"
                name="experience"
                id="exp-no"
                value="no"
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="exp-no" className="text-sm sm:text-base">No</label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              What was the name of the company?
            </label>
            <input
              type="text"
              name="companyName"
              className="w-full p-2 border rounded text-gray-800 text-sm sm:text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              What year was the last time you cleaned for that company?
            </label>
            <input
              type="text"
              name="lastCleanedYear"
              className="w-full p-2 border rounded text-gray-800 text-sm sm:text-base"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              4. Please Mark the days you ARE AVAILABLE to work?
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`day-${day}`}
                    name="availableDays"
                    value={day}
                    className="mr-1 h-4 w-4"
                    defaultChecked={[
                      "Mon",
                      "Wed",
                      "Thur",
                      "Fri",
                      "Sun",
                    ].includes(day)}
                  />
                  <label htmlFor={`day-${day}`} className="text-sm sm:text-base">{day}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-sm sm:text-base">
              5. Are there any times of the day that you CAN NOT work?
            </label>
            <select
              name="unavailableTimes"
              className="w-full p-2 border rounded text-gray-800 text-sm sm:text-base"
              required>
              <option value="mornings">Yes, mornings (6 AM - 12 PM)</option>
              <option value="afternoons">Yes, afternoons (12 PM - 6 PM)</option>
              <option value="evenings">Yes, evenings (6 PM - 12 AM)</option>
              <option value="none">No, I'm available any time</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 text-sm sm:text-base">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;