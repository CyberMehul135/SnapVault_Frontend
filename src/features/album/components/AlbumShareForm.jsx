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
import { shareAlbum } from "@/features/album/album.service";
import { setShareAlbumOpen } from "@/features/album/albumSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

export function AlbumShareForm() {
  // Redux
  const dispatch = useDispatch();
  const { isShareAlbumFormOpen, sharedUsers, albumName, albumId } = useSelector(
    (state) => state.album,
  );

  // local-state
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  // Tanstack
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ albumId, emails }) => shareAlbum(albumId, emails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      dispatch(setShareAlbumOpen({ isOpen: false }));
      toast.success("Album shared successfully.", {
        position: "bottom-right",
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message, { position: "top-right" });
    },
  });

  const handleShareAlbumFormSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate({ albumId, emails: [email] });
  };

  return (
    <Dialog
      open={isShareAlbumFormOpen}
      onOpenChange={(value) => {
        dispatch(setShareAlbumOpen({ isOpen: value }));
        if (!value) {
          setEmail("");
          setErrors({});
        }
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleShareAlbumFormSubmit}>
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl">Share "{albumName}"</DialogTitle>
          </DialogHeader>

          <FieldGroup className="mb-5">
            <Field className="gap-1">
              <Label htmlFor="email" className="text-sm mb-1.5">
                Invite by email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="friend@example.com"
                className="text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs ml-1">{errors.email}</p>
              )}
            </Field>

            {sharedUsers && sharedUsers.length > 0 && (
              <div>
                <h4 className="text-sm mb-2">
                  Shared With &nbsp;( {sharedUsers.length} )
                </h4>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full">
                  {sharedUsers.map((user) => (
                    <div
                      key={user}
                      className="flex items-center gap-3 px-2 py-2 bg-background border rounded-xl"
                    >
                      <div className="text-sm text-white bg-blue-500 size-8 p-2 rounded-full flex justify-center items-center">
                        {user?.slice(0, 1)?.toUpperCase()}
                      </div>
                      <div className="text-sm">{user}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="primary" className="rounded-lg">
              {mutation.isPending ? "Sharing..." : "Share Album"}
              {mutation.isPending && <Spinner className="w-4 h-4" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
