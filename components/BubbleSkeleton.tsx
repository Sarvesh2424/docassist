function BubbleSkeleton() {
  return (
    <div className={`w-full animate-pulse flex `}>
      <div className={`bg-yellow-500 text-black w-1/3 rounded-lg p-4`}>
        Generating response...
      </div>
    </div>
  );
}

export default BubbleSkeleton;
