import React from 'react';

interface ConstellationSVGProps {
  name: string;
}

const ConstellationSVG: React.FC<ConstellationSVGProps> = ({ name }) => {
  const getConstellationPath = (constellationName: string): string => {
    switch (constellationName) {
      case 'Ursa Major':
        return 'M10 10 L30 15 L50 20 L70 25 L90 30 M50 20 L55 40 L60 60';
      case 'Orion':
        return 'M10 50 L30 10 L50 5 L70 10 L90 50 M50 5 L50 95 M10 50 L90 50';
      case 'Cassiopeia':
        return 'M10 50 L30 10 L50 50 L70 10 L90 50';
      case 'Leo':
        return 'M10 10 L30 50 L50 30 L70 50 L90 10 M50 30 L50 90';
      case 'Scorpius':
        return 'M10 10 L30 30 L50 35 L70 30 L90 10 M50 35 L40 60 L50 85 L60 95';
      case 'Cygnus':
        return 'M50 10 L50 90 M10 30 L90 70';
      case 'Taurus':
        return 'M30 30 L50 10 L70 30 M50 10 L50 90';
      case 'Gemini':
        return 'M20 10 L20 90 M80 10 L80 90 M20 50 L80 50';
      case 'Canis Major':
        return 'M10 10 L50 50 L90 10 M50 50 L50 90';
      case 'Aquarius':
        return 'M10 50 C30 30, 70 70, 90 50 M50 10 L50 90';
      default:
        return '';
    }
  };

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="bg-gray-700 rounded">
      <path
        d={getConstellationPath(name)}
        fill="none"
        stroke="#FFD700"
        strokeWidth="2"
      />
      {getConstellationPath(name).split('M').slice(1).map((subPath, index) => {
        const [x, y] = subPath.split('L')[0].split(' ');
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="3"
            fill="#FFD700"
          />
        );
      })}
    </svg>
  );
};

export default ConstellationSVG;