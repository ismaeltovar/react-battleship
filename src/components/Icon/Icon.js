import { IoMenu, IoLocate, IoWarning, IoHelp, IoRepeat } from "react-icons/io5";

export default function Icon({type}) {
  if (type === 'menu')
    return <IoMenu className={`icon-c ${type}`}/>;
  else if (type === 'locate')
    return <IoLocate className={`icon-c ${type}`}/>;
  else if (type === 'help')
    return <IoHelp className={`icon-c ${type}`}/>;
  else if (type === 'repeat')
    return <IoRepeat className={`icon-c ${type}`}/>;
  else 
    return <IoWarning className={`icon-c ${type}`}/>;
}