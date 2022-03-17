import { SVGProps } from "react";

export function PlaySVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-2 14.5l6-4.5l-6-4.5v9z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function PauseSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm1-4h2V8h-2v8z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function StepForwardSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path d="M5 5v14h3V5m2 0v14l11-7" fill="currentColor"></path>
    </svg>
  );
}

export function Reset(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path
        d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function Random(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        d="M80 123.996A4.002 4.002 0 0 1 75.996 128H52.004A4.002 4.002 0 0 1 48 123.996v-23.992A4.002 4.002 0 0 1 52.004 96h23.992A4.002 4.002 0 0 1 80 100.004v23.992zm32 80a4.002 4.002 0 0 1-4.004 4.004H84.004A4.002 4.002 0 0 1 80 203.996v-23.992A4.002 4.002 0 0 1 84.004 176h23.992a4.002 4.002 0 0 1 4.004 4.004v23.992zm96-64a4.002 4.002 0 0 1-4.004 4.004h-23.992a4.002 4.002 0 0 1-4.004-4.004v-23.992a4.002 4.002 0 0 1 4.004-4.004h23.992a4.002 4.002 0 0 1 4.004 4.004v23.992zm-96 16a4.002 4.002 0 0 0 4.004 4.004h23.992a4.002 4.002 0 0 0 4.004-4.004v-23.992a4.002 4.002 0 0 0-4.004-4.004h-23.992a4.002 4.002 0 0 0-4.004 4.004v23.992zm32-80A4.002 4.002 0 0 0 148.004 80h23.992A4.002 4.002 0 0 0 176 75.996V52.004A4.002 4.002 0 0 0 171.996 48h-23.992A4.002 4.002 0 0 0 144 52.004v23.992z"
        fillRule="evenodd"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function Help(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path
        d="M4.834 4.834c-5.89 5.89-5.89 15.442 0 21.333s15.44 5.888 21.33-.002c5.89-5.89 5.893-15.44.002-21.33c-5.89-5.89-15.44-5.89-21.332 0zm20.625.708a14.164 14.164 0 0 1 2.103 2.726l-4.08 4.08A8.528 8.528 0 0 0 21.57 9.43a8.52 8.52 0 0 0-2.92-1.913l4.08-4.08a14.15 14.15 0 0 1 2.73 2.105zm-15.32 15.32a7.588 7.588 0 0 1-.002-10.725a7.592 7.592 0 0 1 10.725 0a7.595 7.595 0 0 1 0 10.724a7.59 7.59 0 0 1-10.724.002zM5.54 25.46a14.19 14.19 0 0 1-2.105-2.73l4.08-4.08a8.583 8.583 0 0 0 4.832 4.832l-4.082 4.08c-.97-.58-1.89-1.27-2.726-2.103zM8.268 3.434l4.082 4.082a8.558 8.558 0 0 0-4.832 4.831l-4.082-4.08c.58-.97 1.27-1.89 2.105-2.728a14.209 14.209 0 0 1 2.728-2.105zm14.464 24.128L18.65 23.48a8.549 8.549 0 0 0 4.832-4.83l4.082 4.08c-.58.97-1.27 1.892-2.105 2.73a14.197 14.197 0 0 1-2.728 2.103z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function BubbleLoading(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="2" r="0" fill="currentColor">
        <animate
          attributeName="r"
          begin="0"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(45 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.125s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(90 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.25s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(135 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.375s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(180 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.5s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(225 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.625s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(270 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.75s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
      <circle
        cx="12"
        cy="2"
        r="0"
        fill="currentColor"
        transform="rotate(315 12 12)"
      >
        <animate
          attributeName="r"
          begin="0.875s"
          calcMode="spline"
          dur="1s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        ></animate>
      </circle>
    </svg>
  );
}
