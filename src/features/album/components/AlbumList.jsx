import AlbumCard from "./AlbumCard";
import { AlbumCardLoading } from "./AlbumCardLoading";

export default function AlbumList({ data, loading, err, cardOptions }) {
  if (loading) return <AlbumCardLoading />;
  if (err) return <p>Error {err.message}</p>;
  if (data?.success) {
    return (
      <div className="grid gap-3 grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 ">
        {data.data.albums.length > 0
          ? data.data.albums.map((album) => (
              <AlbumCard
                album={album}
                key={album._id}
                cardOptions={cardOptions}
              />
            ))
          : "No Album found"}
      </div>
    );
  }
}
