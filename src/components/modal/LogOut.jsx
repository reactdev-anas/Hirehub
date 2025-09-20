import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LogOut = ({ open, setOpen, setShowUserProfile }) => {
  const handleConfirmLogout = () => {
    sessionStorage.removeItem("loggedInDetail");
    setOpen(false);
    setShowUserProfile(false);
    toast.success('Log out Successfully!')
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-xl'>Log out</DialogTitle>
          <DialogDescription className='text-xl mt-2 text-center'>
            Are you sure you want to log out from your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button  onClick={handleConfirmLogout}>
            Yes, Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogOut;
