import { WiDayCloudyHigh, WiCloud, WiCloudy } from 'react-icons/wi';
import { GiAirBalloon, GiCommercialAirplane } from 'react-icons/gi';
import { MdFlight } from 'react-icons/md';

export function UpperAtmosphereElements() {
  return (
    <div className="absolute inset-0">
      {/* Earth's horizon curve */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden">
        <div
          className="absolute bottom-[-50%] left-[-10%] right-[-10%] h-[150%] rounded-[50%] bg-gradient-to-t from-cyan-500/20 to-transparent"
        />
      </div>

      {/* Weather balloons */}
      <GiAirBalloon
        className="absolute top-[20%] left-[15%] text-white/40"
        size={32}
      />
      <GiAirBalloon
        className="absolute top-[35%] right-[25%] text-white/30"
        size={24}
      />
      <GiAirBalloon
        className="absolute top-[50%] left-[60%] text-white/35"
        size={28}
      />

      {/* Thin atmosphere glow line */}
      <div className="absolute top-[5%] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
    </div>
  );
}

export function MidAtmosphereElements() {
  return (
    <div className="absolute inset-0">
      {/* Large clouds */}
      <WiCloud
        className="absolute top-[10%] left-[5%] text-white/60"
        size={120}
      />
      <WiCloudy
        className="absolute top-[20%] right-[10%] text-white/50"
        size={100}
      />
      <WiCloud
        className="absolute top-[40%] left-[30%] text-white/55"
        size={90}
      />
      <WiDayCloudyHigh
        className="absolute top-[55%] right-[25%] text-white/45"
        size={110}
      />
      <WiCloud
        className="absolute top-[70%] left-[50%] text-white/50"
        size={80}
      />

      {/* Airplanes */}
      <GiCommercialAirplane
        className="absolute top-[25%] left-[20%] text-gray-600/40 rotate-45"
        size={28}
      />
      <MdFlight
        className="absolute top-[50%] right-[15%] text-gray-600/30 rotate-[-30deg]"
        size={24}
      />
      <GiCommercialAirplane
        className="absolute top-[75%] left-[70%] text-gray-600/25 rotate-[60deg]"
        size={20}
      />
    </div>
  );
}
