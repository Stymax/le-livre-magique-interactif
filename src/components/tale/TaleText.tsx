interface TaleTextProps {
  text: string;
  highlighted: string;
  isPlaying: boolean;
}

const TaleText = ({ text, highlighted, isPlaying }: TaleTextProps) => {
  const splitText = (text: string) => {
    // First replace <br> with \n, then split on \n
    return text.replace(/<br>/g, '\n').split('\\n');
  };

  if (!isPlaying) {
    return splitText(text).map((line, index) => (
      <div key={index} className="mb-4 whitespace-pre-line">
        {line.trim()}
      </div>
    ));
  }

  const highlightedLines = splitText(highlighted);
  const fullLines = splitText(text);
  
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