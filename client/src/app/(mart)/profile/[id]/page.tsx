"use client";
import RippleButton from "@/components/RippleButton";
import { useAddAddressMutation, useDeleteAddressByIdMutation, useFetchAddressByUserIdQuery, useUpdateAddressByIdMutation } from "@/global/features/addresses/addressApi";
import { useGetUserByIdQuery } from "@/global/features/user/userApi";
import { Clipboard, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Address {
  _id?: string;
  user: string;
  type: string;
  street: string;
  postalCode: number;
  country: string;
  phoneNumber: number;
  state: string;
  city: string;
}

const Profile = () => {
  const { id: userId } = useParams();
  const [addAddress, setAddAddress] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [copied, setCopied] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });
  const { refetch, data: addressData } = useFetchAddressByUserIdQuery(userId, { skip: !userId });

  const [addAddressMutation] = useAddAddressMutation();
  const [updateAddressMutation] = useUpdateAddressByIdMutation();
  const [deleteAddressMutation] = useDeleteAddressByIdMutation();

  useEffect(() => {
    if (Array.isArray(addressData)) {
      setAddresses(addressData);
    } else {
      setAddresses([]); // Ensures it's never undefined
    }
  }, [addressData]);

  const handleAddAddress = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAddress: Address = {
      user: user._id,
      type: formData.get("type") as string,
      street: formData.get("street") as string,
      postalCode: Number(formData.get("postalCode")),
      country: formData.get("country") as string,
      phoneNumber: Number(formData.get("phoneNumber")),
      state: formData.get("state") as string,
      city: formData.get("city") as string,
    };
    try {
      const { data } = await addAddressMutation(newAddress).unwrap();
      refetch();
      setAddresses((prev) => [...prev, data]);
      setAddAddress(false);
      toast.success("Added address");
    } catch (err) {
      console.error("Error adding address:", err);
      toast.error("Error adding address");
    }
  };


  const handleUpdateAddress = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editAddress) return;
    const formData = new FormData(event.currentTarget);
    const updatedAddress: Address = {
      ...editAddress,
      type: formData.get("type") as string,
      street: formData.get("street") as string,
      postalCode: Number(formData.get("postalCode")),
      country: formData.get("country") as string,
      phoneNumber: Number(formData.get("phoneNumber")),
      state: formData.get("state") as string,
      city: formData.get("city") as string,
    };
    try {
      await updateAddressMutation({ id: editAddress._id, ...updatedAddress }).unwrap();
      refetch();

      setAddresses((prev) => prev.map((addr) => (addr._id === editAddress._id ? updatedAddress : addr)));
      setEditAddress(null);
      toast.success("Updating address");
    } catch (err) {
      console.error("Error updating address:", err);
      toast.error("Error updating address");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddressMutation(id).unwrap();
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      toast.success("deleted address successfully ");
    } catch (err) {
      console.error("Error deleting address:", err);
      toast.error("Error deleting address");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.email || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!userId) return <div className="text-center text-red-500">Please log in to view your profile.</div>;
  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="mt-5 text-center text-red-500">Failed to load profile.</div>;
  console.log(addressData, "saass");

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 p-6 pt-20">
        <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
          <div className="bg-background flex flex-col items-center rounded-xl p-6 text-black">
            <Image src={user?.avatar || "/assets/svg/vercel.svg"} alt="Profile" className="rounded-full border-white" height={150} width={150} />
            <p className="mt-3 text-xl font-semibold">{user?.name}</p>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-sm">{user?.email}</p>
              <button onClick={handleCopy} className="hover:text-gray-300">
                <Clipboard className="h-5 w-5" />
              </button>
              {copied && <span className="text-xs text-green-300">Copied!</span>}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800">Manage Addresses</h2>
              <RippleButton>
                <button onClick={() => setAddAddress(true)} className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                  + Add Address
                </button>
              </RippleButton>
            </div>
            {addAddress && (
              <form onSubmit={handleAddAddress} className="mt-4 w-full space-y-3 rounded-md border p-4">
                <input name="type" placeholder="Type (Home, Business)" className="w-full rounded border p-2" required />
                <input name="street" placeholder="Street" className="w-full rounded border p-2" required />
                <input name="postalCode" placeholder="Postal Code" type="number" className="w-full rounded border p-2" required />
                <input name="country" placeholder="Country" className="w-full rounded border p-2" required />
                <input name="phoneNumber" placeholder="Phone Number" type="number" className="w-full rounded border p-2" required />
                <input name="state" placeholder="State" className="w-full rounded border p-2" required />
                <input name="city" placeholder="City" className="w-full rounded border p-2" required />
                <div className="flex justify-end gap-2">
                  <RippleButton>
                    <button type="submit" className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                      Add
                    </button>
                  </RippleButton>
                  <RippleButton>
                    <button type="button" onClick={() => setAddAddress(false)} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                      Cancel
                    </button>
                  </RippleButton>
                </div>
              </form>
            )}

            {editAddress && (
              <form onSubmit={handleUpdateAddress} className="mt-4 w-full space-y-3 rounded-md border p-4">
                <input name="type" defaultValue={editAddress.type} className="w-full rounded border p-2" required />
                <input name="street" defaultValue={editAddress.street} className="w-full rounded border p-2" required />
                <input name="postalCode" defaultValue={editAddress.postalCode} type="number" className="w-full rounded border p-2" required />
                <input name="country" defaultValue={editAddress.country} className="w-full rounded border p-2" required />
                <input name="phoneNumber" defaultValue={editAddress.phoneNumber} type="number" className="w-full rounded border p-2" required />
                <input name="state" defaultValue={editAddress.state} className="w-full rounded border p-2" required />
                <input name="city" defaultValue={editAddress.city} className="w-full rounded border p-2" required />
                <div className="flex justify-end gap-2">
                  <RippleButton>
                    <button type="submit" className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                      Update
                    </button>
                  </RippleButton>
                  <RippleButton>
                    <button type="button" onClick={() => setEditAddress(null)} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                      Cancel
                    </button>
                  </RippleButton>
                </div>
              </form>
            )}
          </div>
          {addresses.length > 0 ? (
            <div className="flex flex-row gap-10">
              <div className="mt-4 space-y-4">
                {addresses?.map((addr) =>
                  addr ? (
                    <div key={addr._id} className="flex justify-between rounded-lg bg-gray-50 p-4 shadow-md">
                      <div>
                        <p className="font-semibold">{addr.type || "Unknown"}</p>
                        <p className="text-sm text-gray-600">
                          {addr.street}, {addr.city}, {addr.state}, {addr.country}
                        </p>
                        <p className="text-sm text-gray-500">
                          Postal: {addr.postalCode} | Phone: {addr.phoneNumber}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditAddress(addr)} className="flex size-10 items-center justify-center gap-2 rounded-full bg-yellow-500 text-white transition hover:bg-yellow-600">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => addr?._id && handleDeleteAddress(addr._id)} className="flex size-10 items-center justify-center gap-2 rounded-full bg-red-500 text-white transition hover:bg-red-600">
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-center text-gray-500">No addresses found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
