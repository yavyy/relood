export default function Loader({ size = 40 }) {
  return (
    <div
      className="animate-spin rounded-full border-4 border-t-black dark:border-t-white"
      style={{ width: size, height: size }}
    />
  );
}