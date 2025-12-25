import { GiSatelliteCommunication } from 'react-icons/gi';
import { FaSatellite } from 'react-icons/fa';
import { TbSatellite } from 'react-icons/tb';
import { MdSatelliteAlt } from 'react-icons/md';

export function MEOElements() {
  return (
    <div className="absolute inset-0">
      {/* GPS Satellites */}
      <GiSatelliteCommunication
        className="absolute top-[15%] left-[20%] text-gray-300/50 rotate-12"
        size={44}
      />
      <TbSatellite
        className="absolute top-[35%] right-[15%] text-gray-300/40 -rotate-20"
        size={36}
      />
      <MdSatelliteAlt
        className="absolute top-[55%] left-[55%] text-gray-300/45 rotate-45"
        size={40}
      />
      <GiSatelliteCommunication
        className="absolute top-[70%] right-[40%] text-gray-300/35 -rotate-30"
        size={32}
      />

      {/* Scattered small satellites */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gray-400/30 rounded-sm"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function LEOElements() {
  return (
    <div className="absolute inset-0">
      {/* ISS */}
      <FaSatellite
        className="absolute top-[25%] left-[35%] text-gray-200/60"
        size={72}
      />

      {/* Starlink train 1 */}
      <div className="absolute top-[45%] left-[10%] flex gap-4 rotate-[-15deg]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-white/50 rounded-full"
            style={{ opacity: 0.3 + i * 0.08 }}
          />
        ))}
      </div>

      {/* Starlink train 2 */}
      <div className="absolute top-[65%] right-[20%] flex gap-3 rotate-[25deg]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 bg-white/40 rounded-full"
          />
        ))}
      </div>

      {/* More satellites */}
      <TbSatellite
        className="absolute top-[55%] right-[45%] text-gray-200/40 rotate-90"
        size={28}
      />
      <MdSatelliteAlt
        className="absolute top-[75%] left-[25%] text-gray-200/35"
        size={24}
      />
    </div>
  );
}
