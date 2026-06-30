import { Spinner } from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAlbum } from "@/features/album/album.service";
import { setCreateAlbumOpen } from "@/features/album/albumSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

export function AlbumForm() {
  const dispatch = useDispatch();
  // global-state
  const { isCreateAlbumFormOpen } = useSelector((state) => state.album);

  // local-state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors.length > 0) {
      setErrors({});
    }
  }, [errors]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (albumData) => createAlbum(albumData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      dispatch(setCreateAlbumOpen());
      toast("Album created successfully.", {
        position: "bottom-right",
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message, { position: "top-right" });
    },
  });

  const handleAlbumFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = validationAlbumForm();
    if (!isValid) return;

    const albumData = new FormData();
    albumData.append("name", name);
    albumData.append("description", description);
    albumData.append("coverImage", coverImage);

    mutation.mutate(albumData);
  };

  const validationAlbumForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Album name is required";
    }

    if (!description) {
      newErrors.description = "Description is required";
    }

    if (!coverImage) {
      newErrors.coverImage = "Cover image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <Dialog
      open={isCreateAlbumFormOpen}
      onOpenChange={(value) => {
        dispatch(setCreateAlbumOpen(value));
        if (!value) {
          setName("");
          setDescription("");
          setCoverImage(null);
          setPreview(null);
          setErrors({});
        }
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleAlbumFormSubmit}>
          <DialogHeader className="mb-6">
            <DialogTitle>Create Album</DialogTitle>
          </DialogHeader>

          <FieldGroup className="mb-5">
            <Field className="gap-1">
              <Label className="text-[13px]">Cover Image</Label>
              <label className="flex items-center justify-center border-2 border-dashed hover:border-blue-500 rounded-xl h-40 cursor-pointer overflow-hidden">
                <Input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setCoverImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
                {!preview && <span>Click to upload cover</span>}
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </label>
              {errors.coverImage && (
                <p className="text-red-500 text-[12px]">{errors.coverImage}</p>
              )}
            </Field>

            <Field className="gap-1">
              <Label htmlFor="name" className="text-[13px]">
                Album Name*
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g Summer Trip 2024"
                className="text-[12px]!"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-[12px]">{errors.name}</p>
              )}
            </Field>

            <Field className="gap-1">
              <Label htmlFor="description" className="text-[13px]">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="What's this album about?"
                className="text-[12px]!"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-[12px]">{errors.description}</p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="primary" className="rounded-lg">
              {mutation.isPending ? "Creating..." : "Create Album"}
              {mutation.isPending && <Spinner className="w-4 h-4" />}{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
