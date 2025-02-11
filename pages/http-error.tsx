import Link from "next/link";

export function HttpError() {
  return (
    <div className="flex justify-center items-center">
      <Link
        className="text-9xl text-center text-red-700 hover:underline"
        href={"http://nodeview.xyz"}
        target="_blank"
      >
        Use HTTP to access the site
      </Link>
    </div>
  );
}
