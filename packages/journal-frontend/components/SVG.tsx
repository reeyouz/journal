import { NextPage } from "next";

interface IconProps {
  dimension: string;
}
export const SubmitIcon: NextPage<IconProps> = (props) => {
  return (
    <svg
      width={props.dimension}
      height={props.dimension}
      viewBox="0 0 256 256"
      fill="var(--blue)"
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M231.626,128a16.015,16.015,0,0,1-8.18262,13.96094L54.53027,236.55273a15.87654,15.87654,0,0,1-18.14648-1.74023,15.87132,15.87132,0,0,1-4.74024-17.60156L60.64746,136H136a8,8,0,0,0,0-16H60.64746L31.64355,38.78906A16.00042,16.00042,0,0,1,54.5293,19.44727l168.915,94.59179A16.01613,16.01613,0,0,1,231.626,128Z" />
    </svg>
  );
};

export const SuccessIcon: NextPage<IconProps> = (props) => {
  return (
    <svg
      width={props.dimension}
      height={props.dimension}
      viewBox="0 0 16 16"
      fill="var(--green)"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" id="icon-bound" fill="none" />
      <path d="M0,9.014L1.414,7.6L5.004,11.189L14.593,1.6L16.007,3.014L5.003,14.017L0,9.014Z" />
    </svg>
  );
};

export const ErrorIcon: NextPage<IconProps> = (props) => {
  return (
    <svg
      width={props.dimension}
      height={props.dimension}
      fill="var(--red)"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="iconify iconify--emojione-monotone"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M36.989 42.439H27.01L23 2h18z"></path>
      <ellipse cx="31.999" cy="54.354" rx="7.663" ry="7.646"></ellipse>
    </svg>
  );
};

export const LoadingIcon: NextPage<IconProps> = (props) => {
  return (
    <div
      className="spinner"
      style={{ height: props.dimension, width: props.dimension }}
    ></div>
  );
};

export const ProtectedIcon: NextPage<IconProps> = (props) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.dimension}
      height={props.dimension}
      fill="var(--blue)"
      viewBox="0 0 470 470"
    >
      <path
        d="M162.5,139.546V102.5c0-39.977,32.523-72.5,72.5-72.5s72.5,32.523,72.5,72.5v37.046c0.164,0.069,0.329,0.132,0.493,0.201
		c10.347,4.376,20.196,9.637,29.507,15.724V102.5C337.5,45.981,291.519,0,235,0S132.5,45.981,132.5,102.5v52.97
		c9.311-6.086,19.161-11.347,29.507-15.724C162.171,139.678,162.336,139.615,162.5,139.546z"
      />
      <path
        d="M235,155c-86.985,0-157.5,70.515-157.5,157.5S148.015,470,235,470s157.5-70.515,157.5-157.5S321.985,155,235,155z
		 M250,320.558v53.557h-30v-53.557c-11.824-5.618-20-17.666-20-31.627c0-19.33,15.67-35,35-35s35,15.67,35,35
		C270,302.892,261.824,314.941,250,320.558z"
      />
    </svg>
  );
};
