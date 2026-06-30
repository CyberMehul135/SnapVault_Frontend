import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  addAlbumImageTag,
  editAlbumImagePerson,
  removeAlbumImageTag,
} from "@/features/image/image.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ImageDetails({ currentImage, data }) {
  const { albumId, imageId } = useParams();

  const [openPersonInput, setOpenPersonInput] = useState(false);
  const [tag, setTag] = useState("");
  const [openTagInput, setOpenTagInput] = useState(false);
  const [person, setPerson] = useState("");

  useEffect(() => {
    if (currentImage?.person) {
      setPerson(currentImage.person);
    }
  }, [currentImage]);

  const convertBytes = (bytes) => {
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;

    const mb = kb / 1024;
    if (kb > 1024 && kb < 1048576) return `${mb.toFixed(0)} MB`;

    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  };

  const queryClient = useQueryClient();
  const addTagMutation = useMutation({
    mutationFn: ({ albumId, imageId, tag }) =>
      addAlbumImageTag(albumId, imageId, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Tag added successfully.", { position: "bottom-right" });
      setTag("");
    },
  });

  const removeTagMutation = useMutation({
    mutationFn: ({ albumId, imageId, tag }) =>
      removeAlbumImageTag(albumId, imageId, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.error("Tag removed successfully.", { position: "bottom-right" });
    },
  });

  const editPersonMutation = useMutation({
    mutationFn: ({ albumId, imageId, person }) =>
      editAlbumImagePerson(albumId, imageId, person),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      setOpenPersonInput(false);
      toast.success("Person edited successfully.", {
        position: "bottom-right",
      });
    },
  });

  const handleAddTag = () => {
    if (!tag) return;

    addTagMutation.mutate({ albumId, imageId, tag });
  };

  const handleRemoveTag = (tag) => {
    removeTagMutation.mutate({ albumId, imageId, tag });
    console.log("delete tag");
  };

  const handleAddPerson = () => {
    editPersonMutation.mutate({ albumId, imageId, person });
  };

  return (
    <>
      <Card className="h-full flex flex-col py-3 px-3">
        <CardContent className="flex flex-col h-full p-4">
          <p className="text-lg font-semibold mb-3">
            {currentImage?.name?.split(".")[0]}
          </p>
          <div className="flex">
            <div className="w-1/2">
              <h4 className="text-sm text-muted-foreground mb-0.5">
                Upload date
              </h4>
              <p className="text-sm">
                {currentImage?.createdAt?.split("T")[0]}
              </p>
            </div>

            <div className="w-1/2">
              <h4 className="text-sm text-muted-foreground mb-0.5">
                File size
              </h4>
              <p className="text-sm">{convertBytes(currentImage?.size)}</p>
            </div>
          </div>

          <div className="mt-3">
            <h4 className="text-sm text-muted-foreground mb-0.5">Album</h4>
            <p className="text-sm">{data?.data?.name}</p>
          </div>

          {/* Person Name */}
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm text-muted-foreground mb-0.5">
                Person Name
              </h4>
              {openPersonInput ? (
                <X size={15} onClick={() => setOpenPersonInput(false)} />
              ) : (
                <Edit size={15} onClick={() => setOpenPersonInput(true)} />
              )}
            </div>

            <div>
              {openPersonInput ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter person name..."
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddPerson()}
                  >
                    Done
                  </Button>
                  <Button size="sm" onClick={() => setOpenPersonInput(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <p className="text-sm">
                  {currentImage?.person === undefined ||
                  currentImage?.person === ""
                    ? "-"
                    : currentImage?.person}
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-3">
            <div className="flex justify-between">
              <h4 className="text-sm text-muted-foreground mb-2">Tags</h4>
              <Button
                variant="secondary"
                size="xs"
                className="rounded-md"
                onClick={() => setOpenTagInput(!openTagInput)}
              >
                {openTagInput ? "Done" : "Add"}
              </Button>
            </div>
            <div className="text-sm flex gap-3 flex-wrap">
              {currentImage?.tags?.map((tag, i) => (
                <Badge
                  className="group flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 pointer-events-auto!"
                  key={i}
                >
                  #{tag}
                  <X
                    className="opacity-0 group-hover:opacity-100 cursor-pointer ml-1 pointer-events-auto!"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(tag);
                    }}
                  />
                </Badge>
              ))}
            </div>
            {openTagInput && (
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Add tag..."
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
                />
                <Button
                  variant="primary"
                  className="rounded-md"
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
