interface TaleTextProps {
  text: string;
  highlighted: string;
  isPlaying: boolean;
}

const TaleText = ({ text, highlighted, isPlaying }: TaleTextProps) => {
  if (!isPlaying) {
    return text.split('\\n').map((line, index) => (
      <div key={index} className="mb-4 whitespace-pre-line">
        {line.trim()}
      </div>
    ));
  }

  const highlightedLines = highlighted.split('\\n');
  const fullLines = text.split('\\n');
  
  return fullLines.map((line, index) => {
    const highlightedPart = highlightedLines[index] || '';
    const remainingPart = line.substring(highlightedPart.length);
    
    return (
      <div key={index} className="mb-4 whitespace-pre-line">
        <span className="text-[#8B5CF6] transition-colors duration-300 animate-glow">
          {highlightedPart}
        </span>
        <span>
          {remainingPart}
        </span>
      </div>
    );
  });
};

export default TaleText;