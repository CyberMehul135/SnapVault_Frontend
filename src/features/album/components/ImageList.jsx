import {
  deleteAlbumImage,
  likeAlbumImage,
} from "@/features/image/image.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Trash2 } from "lucide-react";
import EmptyUi from "../../../components/common/EmptyUi";
import { useDispatch } from "react-redux";
import { setCreateImageFormOpen } from "@/features/image/imageSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ImageList({ data, loading, err, albumId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Tanstack
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: ({ albumId, imageId }) => likeAlbumImage(albumId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ albumId, imageId }) => deleteAlbumImage(albumId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast("Image deleted successfully.", {
        position: "bottom-right",
      });
    },
  });

  const handleLikeImage = (e, imageId) => {
    e.stopPropagation();
    likeMutation.mutate({ albumId, imageId });
  };

  const handleDeleteImage = (e, imageId) => {
    e.stopPropagation();
    deleteMutation.mutate({ albumId, imageId });
  };

  if (loading) return <p>Loading...</p>;
  if (err) {
    console.log(err.response);
    return <p>Error... {err?.response?.data?.message || err.message}</p>;
  }
  if (data?.success) {
    return (
      <>
        {data.data?.images && data.data?.images?.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {data.data.images?.map((image) => (
              <div
                key={image._id}
                className="group relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
                onClick={() =>
                  navigate(`/albums/${albumId}/images/${image._id}`, {
                    state: { images: data.data.images },
                  })
                }
              >
                <img
                  src={image.imageUrl}
                  alt={image.name}
                  className="w-full rounded-xl hover:scale-105 transition duration-300"
                />
                <Star
                  className={`absolute bottom-2 left-3 hidden max-md:block group-hover:block box-content p-1.25 rounded-xl bg-gray-800 ${
                    image.isFavourite
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-white fill-none"
                  }`}
                  size={13}
                  onClick={(e) => handleLikeImage(e, image._id)}
                />
                <Trash2
                  className="absolute top-2 right-3 hidden max-md:block group-hover:block bg-accent/80 box-content p-1.5 rounded-2xl hover:bg-chart-5/80"
                  size={14}
                  onClick={(e) => handleDeleteImage(e, image._id)}
                />
                {image.isFavourite && (
                  <Star
                    className={`absolute top-2 left-3 box-content ${
                      image.isFavourite
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-white fill-none"
                    }`}
                    size={14}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyUi
            className="mt-20"
            onBtnClick={() => dispatch(setCreateImageFormOpen())}
          />
        )}
      </>
    );
  }
}
