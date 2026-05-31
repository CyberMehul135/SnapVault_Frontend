import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardOptions from "./CardOptions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setDeleteDialoughOpen,
  setShareAlbumOpen,
} from "@/features/album/albumSlice";

export default function AlbumCard({ album, cardOptions = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card
      className="group mx-auto w-full max-w-sm rounded-2xl overflow-hidden gap-0 pb-0 pt-0 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
      onClick={() => navigate(`/albums/${album._id}`)}
    >
      <div className="relative h-44 max-sm:h-28 w-full overflow-hidden">
        <img
          src={album.coverImage}
          alt="Event cover"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        {cardOptions && (
          <CardOptions
            onShareClick={(e) => {
              e.stopPropagation();
              dispatch(
                setShareAlbumOpen({
                  isOpen: true,
                  sharedUsers: album.sharedUsers,
                  albumName: album.name,
                  albumId: album._id,
                }),
              );
            }}
            onDeleteClick={(e) => {
              e.stopPropagation();
              dispatch(setDeleteDialoughOpen({ isOpen: true, data: album }));
            }}
          />
        )}

        <div className="absolute bottom-2 right-3 text-[13px] text-foreground bg-background/50 px-2 rounded-2xl">
          {album.imageCount} <span className="text-xs">photos</span>
        </div>
        <div className="absolute inset-0 z-10 bg-black/10 pointer-events-none" />
      </div>

      <CardHeader className="py-3 px-2.5 gap-0">
        <CardTitle className="text-sm font-medium">{album.name}</CardTitle>
        <CardDescription className="text-xs truncate">
          {album.description}.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
