interface TaleImageProps {
  image: string | undefined;
  title: string;
  index: number;
  onError: (index: number) => void;
}

const TaleImage = ({ image, title, index, onError }: TaleImageProps) => {
  if (!image) return null;

  return (
    <div className="max-w-[80%] h-full flex items-center">
      <img
        src={image.startsWith('/') ? image : `/${image}`}
        alt={`Illustration ${index + 1} de ${title}`}
        className="rounded-xl max-h-[90%] w-auto object-contain mx-auto"
        onError={() => onError(index)}
      />
    </div>
  );
};

export default TaleImage;