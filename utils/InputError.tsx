interface Props {
  errorMessage: string;
}

export default function InputError({ errorMessage }: Props) {
  return (
    <p className="text-[12px] md:text-[10px] text-red-600  font-medium">
      {errorMessage}
    </p>
  );
}
