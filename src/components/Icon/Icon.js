import { IoMenu, IoLocate } from "react-icons/io5";

export default function Icon({type}) {
  return type === 'menu' ? <IoMenu className={`icon-c ${type}`}/> : <IoLocate className={`icon-c ${type}`}/>;
}