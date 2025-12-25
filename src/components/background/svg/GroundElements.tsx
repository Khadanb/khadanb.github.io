import { GiModernCity, GiWaveCrest } from 'react-icons/gi';
import { BsBuilding, BsBuildingsFill } from 'react-icons/bs';
import { FaMountain } from 'react-icons/fa';

export function GroundElements() {
  return (
    <div className="absolute inset-0">
      {/* Distant mountain range */}
      <div className="absolute bottom-[35%] left-0 right-0 flex justify-around items-end opacity-30">
        <FaMountain className="text-slate-600" size={80} />
        <FaMountain className="text-slate-600" size={100} />
        <FaMountain className="text-slate-600" size={70} />
        <FaMountain className="text-slate-600" size={90} />
        <FaMountain className="text-slate-600" size={75} />
      </div>

      {/* Closer mountain range */}
      <div className="absolute bottom-[25%] left-0 right-0 flex justify-around items-end opacity-40">
        <FaMountain className="text-slate-700" size={90} />
        <FaMountain className="text-slate-700" size={120} />
        <FaMountain className="text-slate-700" size={85} />
        <FaMountain className="text-slate-700" size={110} />
        <FaMountain className="text-slate-700" size={95} />
        <FaMountain className="text-slate-700" size={80} />
      </div>

      {/* City skyline */}
      <div className="absolute bottom-[8%] left-0 right-0 flex justify-center items-end gap-1 opacity-50">
        <BsBuilding className="text-slate-800" size={40} />
        <BsBuildingsFill className="text-slate-800" size={60} />
        <BsBuilding className="text-slate-800" size={50} />
        <GiModernCity className="text-slate-800" size={80} />
        <BsBuildingsFill className="text-slate-800" size={55} />
        <BsBuilding className="text-slate-800" size={45} />
        <BsBuildingsFill className="text-slate-800" size={65} />
        <BsBuilding className="text-slate-800" size={35} />
      </div>

      {/* Water/ocean at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-gradient-to-t from-blue-400/30 to-transparent" />

      {/* Waves */}
      <div className="absolute bottom-[2%] left-0 right-0 flex justify-around opacity-20">
        <GiWaveCrest className="text-blue-500" size={40} />
        <GiWaveCrest className="text-blue-500" size={35} />
        <GiWaveCrest className="text-blue-500" size={45} />
        <GiWaveCrest className="text-blue-500" size={38} />
        <GiWaveCrest className="text-blue-500" size={42} />
      </div>
    </div>
  );
}
