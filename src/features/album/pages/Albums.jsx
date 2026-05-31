import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "@/features/album/album.service";
import Header from "@/components/common/Header";
import AlbumList from "../components/AlbumList";
import { AlbumForm } from "../components/AlbumForm";
import { useDispatch } from "react-redux";
import { setCreateAlbumOpen } from "@/features/album/albumSlice";
import { AlbumShareForm } from "../components/AlbumShareForm";
import { DeleteDialough } from "@/features/album/components/DeleteDialough";

export default function Albums() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
    staleTime: 10000,
  });

  const dispatch = useDispatch();

  return (
    <>
      <Header
        title="Albums"
        description="albums"
        descriptionValue={data?.data?.albums?.length}
        label="Create Album"
        icon={Plus}
        onBtnClick={() => dispatch(setCreateAlbumOpen())}
      />

      <AlbumList data={data} loading={isLoading} err={error} />
      <AlbumForm />
      <AlbumShareForm />
      <DeleteDialough />
    </>
  );
}
