interface PartDetailsProps {
  name: string;
  imageUrl: string;
  partNumber: string;
}

export const PartDetails = ({ name, imageUrl, partNumber }: PartDetailsProps) => {
  return (
    <div className="my-4 flex gap-4 lg:pr-4 xl:my-8">
      <img src={imageUrl} width={50} height={50} />
      <div className="text-sm font-medium">
        <p className="w-48 overflow-hidden text-ellipsis whitespace-nowrap lg:w-60 xl:w-72">{name}</p>
        <span className="block text-orange-400">{partNumber}</span>
      </div>
    </div>
  );
};
