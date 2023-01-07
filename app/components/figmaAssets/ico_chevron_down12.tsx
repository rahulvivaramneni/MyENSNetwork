import React from 'react'

export default function IcoChevronDown12() {
  return (
    <div className="h-6 w-6 [transform:scaleY(-1)_matrix(-1,0,0,1,0,0)]">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="24"
          y="24"
          width="24"
          height="24"
          rx="12"
          transform="rotate(-180 24 24)"
          fill="#E0E0E0"
        />
        <path
          d="M8 14L12 10L16 14"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
