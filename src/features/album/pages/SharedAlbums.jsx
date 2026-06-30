import Header from "@/components/common/Header";
import { useQuery } from "@tanstack/react-query";
import { getSharedAlbums } from "../album.service";
import AlbumList from "../components/AlbumList";

export default function SharedAlbums() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sharedAlbums"],
    queryFn: getSharedAlbums,
    staleTime: 10000,
  });

  return (
    <>
      <Header
        title="Shared Albums"
        description="Shared albums"
        descriptionValue={data?.data?.albums?.length}
      />
      <AlbumList
        data={data}
        loading={isLoading}
        err={error}
        cardOptions={false}
      />
    </>
  );
}
